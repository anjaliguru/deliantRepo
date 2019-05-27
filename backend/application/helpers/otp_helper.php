<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	
	function get_otp_expire_time($exp_in_mints){
		$exp_in_mints = '+'.$exp_in_mints.' minutes';
		return date('Y-m-d H:i:s',strtotime($exp_in_mints,strtotime(date("Y-m-d H:i:s"))));
	}

	function sendOtp($mobileno){
		$CI = get_instance();
    	$CI->load->model('common_methods');
        $CI->load->helper('common_helper');
        
        $otp_master_data = $CI->common_methods->get_otp_master();

			// Get Ramdon OTP
			$otp_length = $otp_master_data->otp_length;
			$otp_type = $otp_master_data->otp_type;
			$otp = $CI->common_methods->generate_otp($otp_length ,$otp_type);
			

			// Insert OTP information in database
			$otp_array['mobile_no'] = trim($mobileno);
			$otp_array['tran_id']	= $_SESSION['__ci_last_regenerate'];
			$otp_array['exp_time']	= get_otp_expire_time($otp_master_data->exp_time);
			//$otp_array['otp']		= $otp;
            //$otp_array['otp']       = password_hash($otp,PASSWORD_DEFAULT);
            $otp_array['otp']       = encode_string($otp);



			$CI->common_methods->updatedData('otp', array('is_active'=>0), array('mobile_no'=>$mobileno));
			$CI->common_methods->insertData('otp', $otp_array);

			// Call send sms api
			$sender_id	= $otp_master_data->sender_id;
			$authKey	= $otp_master_data->auth_key;
			$mobileno	= $mobileno;
			$message 	= str_replace('##OTP##', $otp, $otp_master_data->otp_template); 

			$CI->common_methods->otp_send_by_msg91($sender_id, $authKey, $mobileno, $message);	

			return $otp;
    }   
    function checkOtp($mobileno, $otp, $count_type,$tran_id){
    	$CI = get_instance();
    	$CI->load->model('common_methods');

    	$otp_master_data = $CI->common_methods->get_otp_master();
    	
    	$count_limit = $otp_master_data->$count_type; // Increas attamp by 1 
    	$otp_data = $CI->common_methods->checkOtp($mobileno, $tran_id,$count_type, $count_limit);
    	
    	if(empty($otp_data)){
    		$responce_array = array('status' => '0' , 'message'=>'OTP Expire');			// OTP expire
    	}else if($otp_data->otp == $otp) {
        //}else if(password_verify($otp, $otp_data->otp)) {    

    		$update_array['is_active'] = 0;
    		$update_array[$count_type] = $otp_data->$count_type +1;

    		// Update data
    		$CI->common_methods->updatedData('otp', $update_array, array('otp_id'=>$otp_data->otp_id));

    		$responce_array  = array('status' => '1' , 'message'=>'The OTP entered is correct.');
    	}else{
    		$update_array[$count_type] = $otp_data->$count_type +1;

    		// Update data
    		$CI->common_methods->updatedData('otp', $update_array, array('otp_id'=>$otp_data->otp_id));

    		$responce_array = array('status' => '0' , 'message'=>'The OTP entered is incorrect.'); // OTP not match
    	}
    	
    	
    	return $responce_array;
    	
    }

?>