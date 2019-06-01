<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Booking extends CI_Controller {

    public function __construct(){
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        parent::__construct();
    }
    
    public function index(){
        //$post_data = json_decode(file_get_contents('php://input') );
        //echo '<pre>';print_r($_POST);die;
        if(isset($_POST) && !empty($_POST)){
            $param = $_POST['param'];       
            switch ($param) {
                case "booking":
                    $this->booking($_POST);
                    break;
                default:
                    echo "Your favorite color is neither red, blue, nor green!";
            }    
        }
        
    }
    public function booking($post_data){
        //echo '<pre>';print_r($post_data);die;
        if(isset($post_data) && !empty($post_data)){
            $formData = $post_data['formData'];
            
            $insertArray = array();
            
            foreach ($formData as $key => $value) {
                $insertArray[$key] = $value;
            }
            $this->common_methods->insertData('booking', $insertArray);        
        }
    }
}
