<?php 

include 'connection.php';

if(isset($_POST) && !empty($_POST)){
	$formData = json_decode($_POST['formData']);
	
	$sql = "INSERT INTO booking (##NAME##) VALUES (##VALUE##)";
	$name =' ';
	$values = ' ';
	foreach ($formData as $key => $value) {
		
		$name .= strtolower(str_replace(' ', '_', $value->name)).',';
		$values .=  "'".$value->value."' ,";
		
	}

	//Name,Phone_No,Pickup Location,Drop Location,Helper,Estimated Distance,Booking_Date,Booking_Time
	$sql = str_replace(array('##NAME##', '##VALUE##'), array(rtrim($name,','), rtrim($values,',')), $sql);
	$conn = OpenCon();
	if ($conn->query($sql) === TRUE) {
	   	return true;
	} else {
	    return flase;
	}
}
?>