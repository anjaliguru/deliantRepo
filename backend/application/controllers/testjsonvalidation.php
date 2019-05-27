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
	public function index()
	{
		/*use JsonSchema\Validator;
		use JsonSchema\Constraints\Constraint;*/
		 
		$config = json_decode({"blah": "foobar", "foo": "bar"});

		$schema = json_decode({
		  "type": "object",
		  "properties": {
		    				"blah": {
		      					"type": "string"
		    				},
		    				"version": {
		      					"type": "string",
		      					"default": "v1.0.0"
		    				}
		  				}
				});



		$validator = new Validator; 
		$validator->validate($config,$schema, Constraint::CHECK_MODE_APPLY_DEFAULTS);
		 
		if ($validator->isValid()) {
		  echo "JSON validates OK\n";
		} else {
		  echo "JSON validation errors:\n";
		  foreach ($validator->getErrors() as $error) {
		    print_r($error);
		  }
		}
		 
		print "\nResulting config:\n";
		print_r($config);
	}	
}



?>