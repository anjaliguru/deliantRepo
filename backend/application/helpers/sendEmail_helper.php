<?php 
function sendMailSimple($destination,$subject,$mailbody) {  

	$CI =& get_instance();
    $CI->load->library('phpmail-library/phpmailer'); 

    
        $headers = "From: Haulage<Haulage>\r\n";
/*        $headers .= "Organization: ".SITE_NAME."\r\n";
         $headers .= "X-Priority: 3\r\n";
        $headers .= "X-Mailer: PHP". phpversion() ."\r\n";
        $headers .= "MIME-Version: 1.0\r\n";            
        $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";               
*/         $send = mail($destination, $subject, $mailbody, $headers);
         if($send) {
            return true;
         } else {
             return false;
         }
}

/*if(isset($_POST)) {
    $msg = $_POST['requestMessage'];
    $subject = $_POST['subject'];
    $destination = $_POST['destination'];

    if( $msg == ''||$subject==''||$destination=='' ){
        return;
     }
     else{
      
    $send = sendMailSimple($destination, $subject, $msg);
       // $send = sendMailSimple('haulageit@gmail.com', $subject, $msg);
        $send = sendMailSimple('mr.akshaykumawat@gmail.com', $subject, $msg);
        if($send){
             echo " <br>  mail sent";
        }
        else{
             echo "mail not sent";
         }
     }
 }*/
?>