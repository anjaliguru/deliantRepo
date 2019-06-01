<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

function getIPAddressInNumbers($number){
	// $no is lenght of string user wants it can not be less then 6 and more then 12
    if($number >= 6 && $number <=12){
        $ip_address = $_SERVER['REMOTE_ADDR'];
        $ip_array = explode(".",$ip_address);
       
        foreach ($ip_array as $key => $value) {
            if(strlen($value) == 1)
                $ip_array[$key] = '00'.$value;
            if(strlen($value) == 2)
                $ip_array[$key] = '0'.$value;
        }
        $number = 12 - $number;
        $ip_address = implode('',$ip_array);
        //echo "ip_address = $ip_address <br>";
        return substr($ip_address, $number);    
    }else{
        return 'number should not be less then 6 and more then 12'; 
    }
}
function getTimestampInseconds(){
	$time_in_sec = round(microtime(true) * 1000);
	if(strlen($time_in_sec) == 13)
	    $time_in_sec = '0'.$time_in_sec;
	return $time_in_sec;
}
function getRandomNumber($length){
    $random_number = '';
	$i = 0; //counter
    while($i < $length){
        //generate a random number between 0 and 9.
        $random_number .= mt_rand(0, 9);
        $i++;
    }
    return $random_number;
}

function getSystemUniqueKey($length){
    // length should not be less then 22;
    
    if($length >= 22){
        $ip_address 	= getIPAddressInNumbers(6);
    	$time 			= getTimestampInseconds();
    	$random_number 	= getRandomNumber($length-22); 
    
    	return $key = $ip_address.'D'.$time. 'd'.$random_number;    
    }else{
        return 'length should not be less then 22';
    }
	
}

function getRandomAlphaCapital($length){
	$characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
    $key = '';        
    for ($i = 0; $i < $length; $i++) { 
        $index = rand(0, strlen($characters) - 1); 
        $key .= $characters[$index]; 
    }	
    return $key;
}
function getRandomAlphaSmall($length){
	$characters = 'abcdefghijklmnopqrstuvwxyz'; 
    $key = '';        
    for ($i = 0; $i < $length; $i++) { 
        $index = rand(0, strlen($characters) - 1); 
        $key .= $characters[$index]; 
    }	
    return $key;
}
function getRandomAlphaCapitalNumeric($length){
	$characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
    $key = '';        
    for ($i = 0; $i < $length; $i++) { 
        $index = rand(0, strlen($characters) - 1); 
        $key .= $characters[$index]; 
    }	
    return $key;
}
function getRandomAlphaSmallNumeric($length){
	$characters = '0123456789abcdefghijklmnopqrstuvwxyz'; 
    $key = '';        
    for ($i = 0; $i < $length; $i++) { 
        $index = rand(0, strlen($characters) - 1); 
        $key .= $characters[$index]; 
    }	
    return $key;
}
function getRandomAlphaCapitalSmall($length){
	$characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
    $key = '';        
    for ($i = 0; $i < $length; $i++) { 
        $index = rand(0, strlen($characters) - 1); 
        $key .= $characters[$index]; 
    }	
    return $key;
}

function getRandomAlphaCapitalSmallNumeric($length){
	$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
    $key = '';        
    for ($i = 0; $i < $length; $i++) { 
        $index = rand(0, strlen($characters) - 1); 
        $key .= $characters[$index]; 
    }	
    return $key;
}

?>