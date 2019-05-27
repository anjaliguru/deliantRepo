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
		$insertArray['location'] 	= $post_data->location;
		//print_r($insertArray); die;
		$this->Common_methods->insertData('page_hit', $insertArray);
	}

	
	
}
