
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
		//alert(servicetype1.value);
$('#notifyModal').modal('show');
      		jQuery.ajax({
		url: "sendEmail.php",
		
		data:'requestMessage=UserEmail:'+$("#userEmail").val()+'<br>Service:'+servicetype1.value+'<br>' +'&subject='+'Notification for Request a Quote'+'&destination='+'pixl.akshay@gmail.com',
		type: "POST",
		success:function(data){
			console.log(data);
			$( '#quotationform').each(function(){
				this.reset();
				
});
		document.getElementById('ajax-loader1').style.display='none';
		document.getElementById('booking_success1').style.display='block'; 
		// document.getElementById('emailMsg').innerHTML="donez ";
		},
		error:function (data){
			console.log(data);
			$( '#quotationform').each(function(){
				this.reset();
				
				
});			
		document.getElementById('ajax-loader1').style.display='none';
		document.getElementById('booking_success1').style.display='block';
		 //document.getElementById('emailMsg').innerHTML="error ";
		}
		});
		
}
// function checkEmail(){
// var emailText = document.getElementById("userEmail");
//var form_content = document.getElementById("content").value;
///alert(form_content);
// var email = emailText.value;
// if(email==''  ){
	//emailText.style.borderColor = "green";
	// document.getElementById('emailMsg').innerHTML="*All fields required !";
	// return false ;
// }else{
	// var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  // if(!regex.test(email)){	  
		// document.getElementById('emailMsg').innerHTML="Enter correct email id !";
	// return;
  // }else{
	  // document.getElementById('emailMsg').innerHTML=" ";
// }
// }

// }

