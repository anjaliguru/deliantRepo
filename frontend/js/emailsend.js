
function sendContact() {
		
    	 var emailText = document.getElementById("userEmail").value;
		var content = document.getElementById("content1").value;
//	alert('contebnt'+content);
	console.log("email  "+emailText);
	
if(emailText=='' ){
	//alert(content);
	document.getElementById('emailMsg').innerHTML="All Fields Required !";
	return;
}else{
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(!regex.test(emailText)){	
      document.getElementById('emailMsg').innerHTML="Enter valid email id!";
	return;
  }
  else{
	   document.getElementById('emailMsg').innerHTML=" ";
}
  
}
if(content== 'null'){
		document.getElementById('emailMsg').innerHTML=" Please select service !";
	   return false;
	}
	else{
		document.getElementById('emailMsg').innerHTML=" ";
	}
	
	
    var theForm = document.forms["quotationform"];
	var servicetype1 = theForm.elements["content1"];
     window.servicetype1 = servicetype1;
	
	$('#ajax-loader1').show();
	$('#booking_success1').hide();
    $('#notifyModal').modal('show');
    
    var requestMessage = 'UserEmail:'+$("#userEmail").val()+'<br>Service:'+servicetype1.value+'<br>';
	var subject = 'Notification for Request a Quote';
	var destination = 'pixl.akshay@gmail.com';
	
	
    jQuery.ajax({
		//url: "sendEmail.php",
		//data:'requestMessage=UserEmail:'+$("#userEmail").val()+'<br>Service:'+servicetype1.value+'<br>' +'&subject='+'Notification for Request a Quote'+'&destination='+'pixl.akshay@gmail.com',
		url: base_url_api+'api/sendMail/',
        data : {"param":"sendMail", "requestMessage":requestMessage,"subject":subject,"destination":destination},
		type: "POST",
		success:function(data){
			console.log(data);
			$( '#quotationform').each(function(){
				this.reset();
				
});
		setTimeout(function(){
 $('#ajax-loader1').hide();
}, 3000);
setTimeout(function(){
 $('#booking_success1').show();
}, 3000);

		//	$('#booking_success1').show();
			},
		error:function (data){
			console.log(data);
			$( '#quotationform').each(function(){
				this.reset();
				
				
});			
            setTimeout(function(){
 $('#ajax-loader1').hide();
}, 3000);
setTimeout(function(){
 $('#booking_success1').show();
}, 3000);
			}
		});
		
}


