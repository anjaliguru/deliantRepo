<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class common_methods extends CI_Model {
	public function __construct()
	{
    	header('Access-Control-Allow-Origin: *');
    	header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

    	parent::__construct();
	}
	function get_otp_master(){
		$query = "SELECT * FROM otp_master";
		$result = $this->db->query($query);
		return $result->row();
	}
	function generate_otp($otp_length ,$otp_type){
		$otp = ""; 
        if($otp_type == 'number'){
            $i = 0; //counter
            while($i < $otp_length){
                //generate a random number between 0 and 9.
                $otp .= mt_rand(0, 9);
                $i++;
            }
        }elseif ($otp_type == 'varchar') {
            $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
            
            for ($i = 0; $i < $otp_length; $i++) { 
                $index = rand(0, strlen($characters) - 1); 
                $otp .= $characters[$index]; 
            } 
        }    
        return $otp;
	}

	function insert_otp($data){
		$result = $this->db->insert('otp',$data);
		return $result;
	}

	function otp_send_by_msg91($senderId, $authKey, $mobileno, $message){
	

	    //Prepare you post parameters
	    $postData = array(
	        'authkey' => $authKey,
	        'mobiles' => $mobileno, //Multiple mobiles numbers separated by comma
	        'message' => urlencode($message),
	        'sender' => $senderId
	       // 'route' => $route
	    );

	    //API URL
	    $url="http://api.msg91.com/api/sendhttp.php";

	    // init the resource
	    $ch = curl_init();
	    curl_setopt_array($ch, array(
	        CURLOPT_URL => $url,
	        CURLOPT_RETURNTRANSFER => true,
	        CURLOPT_POST => true,
	        CURLOPT_POSTFIELDS => $postData
	        //,CURLOPT_FOLLOWLOCATION => true
	    ));


	    //Ignore SSL certificate verification
	    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
	    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);


	    //get response
	    $output = curl_exec($ch);

	    //Print error if any
	    if(curl_errno($ch)){
	        //echo 'error:' . curl_error($ch);
	        $result = 'error';
	    }else{
	    	$result  = 'true';
	    }

	    curl_close($ch);

	    if($result){
	    	return 'TRUE';
	    }else{
	    	return 'FALSE';
	    }
	}

	function get_otp_by_mobileno($mobileno){
		$query = "SELECT * FROM otp where mobile_no = ".$mobileno." AND is_active = 1 ";
		$result = $this->db->query($query);
		return $result->row();
	}
	function update_attempt_count($mobileno){
		$query = "UPDATE otp SET attempt_count = attempt_count + 1 WHERE mobile_no = ".$mobileno." AND is_active = 1";
		$result = $this->db->query($query);
	}
	function update_is_active($mobileno){
		$query = "UPDATE otp SET is_active = 0 WHERE mobile_no = ".$mobileno." AND is_active = 1";
		$result = $this->db->query($query);	
	}

	function updatedData($table, $updateArray, $where){
		$this->db->trans_start();
		$this->db->update($table, $updateArray, $where);
		$this->db->trans_complete();
	}
	function insertData($table, $insertArray){
		$this->db->trans_start();
		$result = $this->db->insert($table,$insertArray);
		$this->db->trans_complete();
		return $result;
	}
	function get_active_otp_by_count_check($tran_id,$mobileno, $count_type, $count_limit){
		$query = "SELECT * FROM `otp` WHERE 1 ##WHERE##";
		$where = " AND `tran_id` = '$tran_id' AND `mobile_no` = '$mobileno' AND is_active = 1 ";
		
		if($count_type == 'submit'){
			$where .= " AND `attempt_count` < $count_limit ";
		}elseif($count_type == 'resend'){
			$where .= " AND `resend_count` < $count_limit ";
		}elseif($count_type == 'regenerate'){
			$where .= " AND `regenerate_count` < $count_limit ";
		}
		$query = str_replace('##WHERE##', $where, $query);
		$this->db->trans_start();
		$result = $this->db->query($query);	
		$result =  $result->row();
		$this->db->trans_complete();
		return $result;
	}
	function get_expire_time($exp_in_mints){
		$exp_in_mints = '+'.$exp_in_mints.' minutes';
		return date('Y-m-d H:i:s',strtotime($exp_in_mints,strtotime(date("Y-m-d H:i:s"))));
	}
	
	//UPDATE `otp` SET `is_active`=0 WHERE `exp_time` < NOW();
	function testModel(){
		echo "testModel called";
	}
	public function checkOtp($mobileno, $tran_id, $count_type, $count_limit){
		$query = "SELECT * fROM `otp` WHERE `mobile_no` = '$mobileno' AND `tran_id` = '$tran_id' AND is_active = 1 AND `exp_time` > NOW()  ##COUNT##";
		$count = " AND ($count_type+1) < $count_limit";
		$query = str_replace('##COUNT##', $count, $query);
		$this->db->trans_start();
		$result = $this->db->query($query);	
		$result =  $result->row();
		$this->db->trans_complete();
		return $result;
	}
}
