<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Api_request_count extends CI_Controller {

	public function __construct()
	{
    	header('Access-Control-Allow-Origin: *');
    	header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

    	parent::__construct();
    	$this->load->helper('otp_helper');
    	$this->load->model('Common_methods');
	}
	
	public function index()
	{
		$post_data = json_decode(file_get_contents('php://input') );
		$param = $post_data->param;		
		switch ($param) {
 		   	case "page_hit":
        		$this->page_hit($post_data);
        		break;
    		default:
        		echo "Your favorite color is neither red, blue, nor green!";
		}
	}
	public function page_hit($post_data){
		$insertArray['pg_nm'] 		= $post_data->pg_nm;
		$insertArray['hit_time'] 	= $post_data->hit_time;
		$insertArray['ip_address'] 	= $post_data->ip_address;
		//$insertArray['location'] 	= $post_data->location;
		$insertArray['latitude'] 	= $post_data->latitude;
		$insertArray['longitude'] 	= $post_data->longitude;
		$insertArray['accuracy'] 	= $post_data->accuracy;
		$insertArray['county'] 	    = $post_data->county;
		$insertArray['region'] 	    = $post_data->region;
		//print_r($insertArray); die;
		
		$resutl = $this->Common_methods->insertData('page_hit', $insertArray);
		if($resutl){
		    $responce_array = array('status' => '1' , 'message'=>'Data inserted');
			echo json_encode($responce_array);die;
		}else{
		    $responce_array = array('status' => '0' , 'message'=>'error');
			echo json_encode($responce_array);die;
		}
	}

	
	
}
