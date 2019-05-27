<?php
   // $mailto = $_POST['mail_to'];
 //   $mailSub = $_POST['mail_sub'];
  //  $mailMsg = $_POST['mail_msg'];
  /*  require 'PHPMailer-master/PHPMailerAutoload.php';
  

<picture>
						<source
							srcset="https://res.cloudinary.com/deliant/image/upload/v1552484424/passenger3.webp"
							type="image/webp">
						<img
							src="https://res.cloudinary.com/deliant/image/upload/v1552484424/passenger3.jpg"
							alt="Profession services" style="width: 100%;" /> </picture>

						

if(isset($_POST)) {
	  $msg = $_POST['requestMessage'];
	  
	   $subject = $_POST['subject'];
	   $destination = $_POST['destination'];
    if( $msg == ''){
        echo "Error In Sending Message";
    }
    else{
    	//$msg = 'Name: '.$contact_name.'<br>';
    //	$msg= $contact_email.'<br>';
     //   $msg.= 'Phone: '.$contact_phone.'<br>';
    	//$msg.= 'Message:' .$contact_message;
      $mail = new PHPMailer();
   $mail ->IsSmtp();
   $mail ->SMTPDebug = 0;
   $mail ->SMTPAuth = true;
  $mail ->SMTPSecure = 'tsl';
   $mail ->Host = "smtp.gmail.com";
   $mail ->Port = 587; // or 587
   $mail ->IsHTML(true);
   $mail ->Username = "pixl.akshay@gmail.com";
   $mail ->Password = "(akshay)";
   $mail ->SetFrom("pixl.akshay@gmail.com");
   $mail ->Subject =$subject;
   $mail ->Body = $msg;
   $mail ->AddAddress($destination );

   if(!$mail->Send())
   {
       echo "Mail Not Sent";
   }
   else
   {
       echo "*Thank For Contact We Will Contact You Soon!";
   }
        
    }
} */


 include 'phpmail-library/phpmail-library/library.php'; 
 include "phpmail-library/phpmail-library/class.phpmailer.php";

function sendMailSimple($destination,$subject,$mailbody) {  
        $headers = "From: Haulage<Haulage>\r\n";
        $headers .= "Organization: ".SITE_NAME."\r\n";
         $headers .= "X-Priority: 3\r\n";
        $headers .= "X-Mailer: PHP". phpversion() ."\r\n";
        $headers .= "MIME-Version: 1.0\r\n";            
        $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";               
         $send = mail($destination, $subject, $mailbody, $headers);
         if($send) {
            return true;
         } else {
             return false;
         }
    }

if(isset($_POST)) {
	$msg = $_POST['requestMessage'];
  print_r($_POST); die;
    $subject = $_POST['subject'];
	$destination = $_POST['destination'];

     if( $msg == ''||$subject==''||$destination=='' ){
        return;
     }
     else{
    	
		$send = sendMailSimple($destination, $subject, $msg);
        $send = sendMailSimple('haulageit@gmail.com', $subject, $msg);
        $send = sendMailSimple('mr.akshaykumawat@gmail.com', $subject, $msg);
        if($send){
             echo " <br>  mail sent";
        }
        else{
             echo "mail not sent";
         }
     }
 }
?>