<?php 

include 'connection.php';

if(isset($_POST) && !empty($_POST)){
	$formData = $_POST['formData'];
	print_r($formData);
	$sql = "INSERT INTO booking (##NAME##) VALUES (##VALUE##)";
	$name =' ';
	$values = ' ';
	foreach ($formData as $key => $value) {
		$name .= strtolower(str_replace(' ', '_', $key)).',';
		$values .=  "'".$value."' ,";
	}

	$sql = str_replace(array('##NAME##', '##VALUE##'), array(rtrim($name,','), rtrim($values,',')), $sql);
	echo $sql;
	$conn = OpenCon();
	if ($conn->query($sql) === TRUE) {
	   	return true;
	} else {
	    return flase;
	}
}
?>