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
	
	
	
		
	
    
	$('#ajax-loader1').show();
	$('#booking_success1').hide();
	$('#notifyModal').modal('show');
	
	var requestMessage = 'Customer Mobile No : '+$("#telephone").val();
	var subject = 'Notification For Haulage Passenger Service';
	var destination = 'pixl.akshay@gmail.com';
	
	
    jQuery.ajax({
		//url: "sendEmail.php",
		//data:'requestMessage='+'Customer Mobile No : '+$("#telephone").val()+'<br>'+'&subject='+'Notification For Haulage Passenger Service'+'&destination='+'pixl.akshay@gmail.com',
		url: base_url_api+'api/sendMail/',
		data : {"param":"sendMail", "requestMessage":requestMessage,"subject":subject,"destination":destination},
		type: "POST",
		success:function(data){
			console.log(data);
			//alert(data);
			$( '#passenger' ).each(function(){
				this.reset();
				$('#passengerModal').hide();
            });
	        setTimeout(function(){
                $('#ajax-loader1').hide();
                $('#booking_success1').show();
            }, 3000);
		},
		error:function (data){
			console.log(data);
			$( '#passenger' ).each(function(){
				this.reset();
		    });			
	        setTimeout(function(){
                $('#ajax-loader1').hide();
                $('#booking_success1').show();
            }, 3000);
        }
	});
}
