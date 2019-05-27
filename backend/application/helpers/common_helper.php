<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	
function encode_string($string){
	return hash('sha256', $string);
}
?>