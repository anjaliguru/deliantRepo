function passengerNotify() {
	
	var mobile = $("#telephone").val();
	//alert(email);
	// console.log("email "+mobile);
	if( mobile ==' '){
		return;
	}else{
		var mobileregex=/^(6|7|8|9)\d{9}$/;
		
	    if(!mobileregex.test(mobile)){
	  return;
	  }
	} 
//	var isvalid = $('#passenger').bootstrapValidator('validate');
//	//alert(isvalid);
//	var shallReturn = false;
//	for(i=0;i<isvalid[0].length;i++){
//	if(!isvalid[0][i].validity.valid){
//	console.log(isvalid[0][i].name +' is not valid');
//	shallReturn =true;
//	}
//	}
//	if(shallReturn){
//		return;
//	}
	
	
	
		
	


	$('#notifyModal').modal('show');
      		jQuery.ajax({
		url: "sendEmail.php",
		data:'requestMessage='+'Customer Mobile No : '+$("#telephone").val()+'<br>'+'&subject='+'Notification For Haulage Passenger Service'+'&destination='+'pixl.akshay@gmail.com',
		type: "POST",
		success:function(data){
			console.log(data);
			//alert(data);
			$( '#passenger' ).each(function(){
				this.reset();
				$('#passengerModal').hide();
});
		document.getElementById('ajax-loader1').style.display='none';
		document.getElementById('booking_success1').style.display='block'; 
	//	document.getElementById('error').innerHTML="success";
		},
		error:function (data){
			console.log(data);
			$( '#passenger' ).each(function(){
				this.reset();
				
});			
		document.getElementById('ajax-loader1').style.display='none';
		document.getElementById('booking_success1').style.display='block';
		//document.getElementById('error').innerHTML="error";
		}
		});
}
