<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class otp extends CI_Controller {

	public function __construct()
	{
    	header('Access-Control-Allow-Origin: *');
    	header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

    	parent::__construct();
    	/*$this->load->model('common_methods');
		$this->load->helper('url');
		$this->load->database();
		$this->load->library('session');*/
		//session_start(); 
	}
	public function index()	{
		//echo $_SESSION['__ci_last_regenerate']; die;
		if(isset($_POST['mobile']) && !empty($_POST['mobile'])){
			// Get OTP master
			$otp_master_data = $this->common_methods->get_otp_master();

			// Get Ramdon OTP
			$otp_length = $otp_master_data->otp_length;
			$otp_type = $otp_master_data->otp_type;
			$otp = $this->common_methods->generate_otp($otp_length ,$otp_type);
			

			// Insert OTP information in database
			$otp_array['mobile_no'] = trim($_POST['mobile']);
			$otp_array['tran_id']	= $_SESSION['__ci_last_regenerate'];
			$otp_array['exp_time']	= $this->common_methods->get_expire_time($otp_master_data->exp_time);
			$otp_array['otp']		= password_hash($otp,PASSWORD_DEFAULT);
			
			$result = $this->common_methods->insert_otp($otp_array);

			// Call send sms api
			$sender_id	= $otp_master_data->sender_id;
			$authKey	= $otp_master_data->auth_key;
			$mobileno	= trim($_POST['mobile']);
			$message 	= str_replace('##OTP##', $otp, $otp_master_data->otp_template); 

			$this->common_methods->otp_send_by_msg91($sender_id, $authKey, $mobileno, $message);	
			redirect('otp/get_otp_by_user/'.$mobileno,'refresh');
			//redirect('http://localhost/anjaliguru/CodeIgniter_corefolder/otp/test');
		}

		$this->load->view('registration');
		
	}

	public function get_otp_by_user($mobileno){
		$tran_id = $_SESSION['__ci_last_regenerate'];
		// Get data from database
		$otp_master_data = $this->common_methods->get_otp_master();
		$otp_data = $this->common_methods->get_active_otp_by_count_check($tran_id,$mobileno, 'submit', $otp_master_data->resend_count);
		
		if(isset($_POST) && !empty($_POST)){
			if(empty($otp_data)){
				// otp expire
				$this->session->set_flashdata('error_msg','try Resend'); 
			//}elseif(!empty($otp_data) && $otp_data->otp == $_POST['otp']){
			}elseif(!empty($otp_data) && password_verify($_POST['otp'], $otp_data->otp)){
				// otp matched
				$updated_array['attempt_count'] = $otp_data->attempt_count + 1;
				$updated_array['is_active']		= 0;
				$where = array('otp_id'=>$otp_data->otp_id);
				$this->common_methods->updatedData('otp', $updated_array, $where);
				$redirect = 'http://[::1]/anjaliguru/CodeIgniter_corefolder/otp/login';
			}else{
				// otp not match increas count
				$updated_array['attempt_count'] =$otp_data->attempt_count + 1;		
				$where = array('otp_id'=>$otp_data->otp_id);
				$this->common_methods->updatedData('otp', $updated_array, $where);

				if( ($otp_data->attempt_count + 1) == $otp_master_data->attempt_count ){
					$this->session->set_flashdata('error_msg','try Resend'); 
				}else{
					$this->session->set_flashdata('error_msg','wrong otp'); 	
				}
				
			}
			
			
			if(!empty($redirect)){
				redirect($redirect);
			}
		}
		$this->load->view('get_otp',array('mobileno' => $mobileno, 'otp_data'=>$otp_data));
	}

	public function resendOtp(){
		$mobileno 			= $_POST['mobileno'];
		$tran_id 			= $_SESSION['__ci_last_regenerate'];
		$otp_master_data 	= $this->common_methods->get_otp_master();
		$otp_data 			= $this->common_methods->get_active_otp_by_count_check($tran_id,$mobileno, 'resend', $otp_master_data->resend_count);
		
		if(isset($otp_data) AND !empty($otp_data)){
			
			// Updated resend count
			$updated_array['resend_count'] = $otp_data->resend_count + 1;
			$where = array('otp_id'=>$otp_data->otp_id);
			$this->common_methods->updatedData('otp', $updated_array, $where);
			
			// call sms API
			$senderId 	= $otp_master_data->sender_id;
			$authKey 	= $otp_master_data->auth_key;
			$mobileno 	= $mobileno;
			$message 	= str_replace('##OTP##', $otp_data->otp, $otp_master_data->otp_template) ;

			$result = $this->common_methods->otp_send_by_msg91($senderId, $authKey, $mobileno, $message);

			if(($otp_data->resend_count + 1) == $otp_master_data->resend_count){
				echo trim('FALSE');
			}else{
				echo trim('TRUE');
			}
		}else{
			echo trim('FALSE');
		}
	}
	public function login(){
		echo 'login'; die;
	}
	public function regenerateOtp(){
		$mobileno 			= $_POST['mobileno'];
		$tran_id 			= $_SESSION['__ci_last_regenerate'];
		$otp_master_data 	= $this->common_methods->get_otp_master();
		$otp_data 			= $this->common_methods->get_active_otp_by_count_check($tran_id,$mobileno, 'regenerate', $otp_master_data->regenerate_count);

		if(isset($otp_data) && !empty($otp_data)){

			// Generate new OTP	
			$otp_length 		= $otp_master_data->otp_length;
			$otp_type 			= $otp_master_data->otp_type; 
			$otp = $this->common_methods->generate_otp($otp_length ,$otp_type);
			
			// Update Row
			$updated_array['regenerate_count'] 	= $otp_data->regenerate_count + 1;
			$updated_array['otp']			= $otp;
			if($otp_data->regenerate_count + 1 == $otp_master_data->regenerate_count){
				$updated_array['is_active'] = 0;
			}
			$where = array('otp_id'=>$otp_data->otp_id);
			$this->common_methods->updatedData('otp', $updated_array, $where);

			// call sms API
			$senderId 	= $otp_master_data->sender_id;
			$authKey 	= $otp_master_data->auth_key;
			$mobileno 	= $mobileno;
			$message 	= str_replace('##OTP##', $otp, $otp_master_data->otp_template) ;
			$result = $this->common_methods->otp_send_by_msg91($senderId, $authKey, $mobileno, $message);


			if(($otp_data->regenerate_count + 1) == $otp_master_data->regenerate_count){
				echo 'FALSE';
			}else{
				echo 'TRUE';	
			}
			
		}else{
			
			echo 'FALSE';
		}
	}

	public function test(){
		phpInfo();die;
		echo "GetIPAddressInNumbers(number_of_decimal)";
		// with will return ip address without : sign.
		$this->load->helper('system_unique_key');
		GetIPAddressInNumbers(10);
	}
}
