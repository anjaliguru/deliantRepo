<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	
function log_error($model, $file, $method, $systemUniqueId, $message){
	$log_message = "$model >> $file >> $method >> $systemUniqueId >> $message";
	log_message('error',$log_message);
}
function log_debug($model, $file, $method, $systemUniqueId, $message){
	$log_message = "$model >> $file >> $method >> $systemUniqueId >> $message";
	log_message('debug',$log_message);
}
function log_info($model, $file, $method, $systemUniqueId, $message){
	$log_message = "$model >> $file >> $method >> $systemUniqueId >> $message";
	log_message('info',$log_message);
}	
/*function getSystemTransectionId(){
	$rand = '';
	$i = 0; //counter
    while($i < 10){
        //generate a random number between 0 and 9.
        $rand .= mt_rand(0, 9);
        $i++;
    }
    return str_replace(':', '', $_SERVER['REMOTE_ADDR']). 'D0' . time() . 'd' . $rand;
}*/
/*function logger($log_type, $log_message){
	$id = getSystemTransectionId();
	log_message('info',' <======= TRANSECTION '.$id.' START ==================>');
	log_message($log_type, $log_message);
	log_message('info',' <======= TRANSECTION '.$id.' END ==================>');
}*/
?>