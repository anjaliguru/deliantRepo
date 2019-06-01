<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class otp extends CI_Controller {

	public function __construct()
	{
    	header('Access-Control-Allow-Origin: *');
    	header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

    	parent::__construct();
    	$this->load->helper('otp_helper');
    	if(!isset($_SESSION)) session_start();
	}
	public function index()
	{
	   // print_r($_SESSION); die;
		$post_data = json_decode(file_get_contents('php://input') );
		//print_r($post_data);die;
		$param = $post_data->param;		
		switch ($param) {
 		   	case "registration":
        		$this->registration($post_data);
        		break;
    		case "checkOtp":
        		$this->checkOtp($post_data);
        		break;
        	case "sendWelcomeMessage":
        		$this->sendWelcomeMessage($post_data);
        		break;	
        	case "test"	:
        		$this->test($post_data);
        		break;	
    		default:
        		echo "Your favorite color is neither red, blue, nor green!";
		}
		
	}
	public function registration($post_data){
		$mobileno   = $post_data->mobileno;
		$name       = ucwords($post_data->name);
		if(!preg_match('/^[0]?[6789]\d{9}$/',$mobileno)) // phone number is valid
    	{
			$responce_array = array('status' => '0' , 'message'=>'phone number is not valid');
			echo json_encode($responce_array);die;

	    }else {
      		$result = sendOtp($mobileno,$name);
      		$responce_array = array('status' => '1' , 'message'=>'OTP is send to your mobile no.');
			echo json_encode($responce_array);
		}
	}
	public function checkOtp($post_data){
		if(!preg_match('/^[0]?[6789]\d{9}$/',$post_data->mobileno)) // phone number is valid
    	{
			$responce_array = array('status' => '0' , 'message'=>'phone number is not valid');
			echo json_encode($responce_array);die;
	    }else {
	    	$mobileno	= $post_data->mobileno;
			$otp 		= $post_data->otp;
			$count_type = $post_data->count_type;
			$tran_id 	= (!empty($_SESSION['__ci_last_regenerate'])) ? $_SESSION['__ci_last_regenerate'] : '';
			$responce_array = checkOtp($mobileno, $otp, $count_type,$tran_id);
			echo json_encode($responce_array);
		}
	}
	public function sendWelcomeMessage($post_data){
		$this->load->model('common_methods');
		
		// Call send sms api
		$sender_id	= 'HAULAG';
		$authKey	= '245126AW8IgiJPJYo5cad8a48';
		$mobileno	= $post_data->mobileno;
		$message 	= "Dear ".ucwords($post_data->name).", We Received Your Booking request. Haulage Executive will contact you shortly. Thank you for choosing Haulage. For any Enquiry, Please contact: 0731-4773333"; 

		$result = $this->common_methods->otp_send_by_msg91($sender_id, $authKey, $mobileno, $message);
		if($result)
			echo json_encode(array('status'=>1, 'message'=>'success'));
		else
			echo json_encode(array('status'=>0, 'message'=>'error'));
	}
	public function test($post_data){

		$system_trans_key = getSystemUniqueKey($this->config->item('system_unique_key_length'));

 		// Insert OTP information in database
        $otp_array['mobile_no'] = '9874563210';
        $otp_array['tran_id']   = '11111111';
        $otp_array['exp_time']  = time();
        $otp_array['otp']       = '1234';
        //$otp_array['system_trans_key'] = $system_trans_key;

        log_info('otp', 'api/otp', 'test', $system_trans_key, 'data insert in otp');

        $this->common_methods->insertData('otp', $otp_array);
        log_info('otp', 'api/otp', 'test', $system_trans_key, $this->db->last_query());
	}


	/*

	'hostname' => 'localhost',
	'username' => 'localhost',
	'password' => 'otp_module',
	'database' => 'otp_module',
	'dbdriver' => 'mysqli',

	BASH mysql -ulocalhost -potp_module -dotp_module -hlocalhost -e "update otp set is_active = 0 where exp_time < now()" || mysql -ulocalhost -potp_module otp_module -hlocalhost -e "INSERT INTO `otp_dump`(`tran_id`, `mobile_no`, `otp`, `is_active`, `attempt_count`, `resend_count`, `regenerate_count`, `exp_time`, `user_id`, `created_by`, `updated_by`, `insert_date`, `updated_date`) SELECT `tran_id`, `mobile_no`, `otp`, `is_active`, `attempt_count`, `resend_count`, `regenerate_count`, `exp_time`, `user_id`, `created_by`, `updated_by`, `insert_date`, `updated_date` from otp where is_active = 0";
	



	1. update otp set is_active = 0 where exp_time < now()


	2. INSERT INTO `otp_dump`(`tran_id`, `mobile_no`, `otp`, `is_active`, `attempt_count`, `resend_count`, `regenerate_count`, `exp_time`, `user_id`, `created_by`, `updated_by`, `insert_date`, `updated_date`) SELECT `tran_id`, `mobile_no`, `otp`, `is_active`, `attempt_count`, `resend_count`, `regenerate_count`, `exp_time`, `user_id`, `created_by`, `updated_by`, `insert_date`, `updated_date` from otp where is_active = 0

	3. DELETE FROM `otp` WHERE is_active = 0



	INSERT INTO `otp_dump`(`tran_id`, `mobile_no`, `otp`, `is_active`, `attempt_count`, `resend_count`, `regenerate_count`, `exp_time`, `user_id`, `created_by`, `updated_by`, `insert_date`, `updated_date`) VALUES ('1','1','1','1','1','1','1','1','1','1','1','1','1')




	mysql --user=[localhost] --password=[otp_module] --database=[otp_module] --hostname=[localhost] --execute="DELETE FROM `otp_dump`"
	*/
	
}
