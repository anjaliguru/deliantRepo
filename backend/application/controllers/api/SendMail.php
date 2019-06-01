<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class SendMail extends CI_Controller {

    public function __construct(){
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        parent::__construct();
    }
    
    public function index(){
        //$post_data = json_decode(file_get_contents('php://input') );
        if(isset($_POST) && !empty($_POST)){
            $param = $_POST['param'];       
            switch ($param) {
                case "sendMail":
                    $this->sendMail($_POST);
                    break;
                default:
                    echo "Your favorite color is neither red, blue, nor green!";
            }    
        }
        
    }
    public function sendMail($post_data){
        //print_r($post_data);die;
        $this->load->helper('sendEmail');
        if(isset($post_data) && !empty($post_data)) {
            $msg        = $post_data['requestMessage'];
            $subject    = $post_data['subject'];
            $destination = $post_data['destination'];

            if( $msg == ''|| $subject=='' || $destination=='' ){
                return;
            }else{
                $send = sendMailSimple($destination, $subject, $msg);
                $send = sendMailSimple('mr.akshaykumawat@gmail.com', $subject, $msg);
                return ($send) ? true : false ;
            }
        }
    }
}
