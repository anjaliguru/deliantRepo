
function sendContact() {
	
    var email= $("#userEmail").val();
	 var mobile= $("#telephone").val();
	console.log("email "+email);
	console.log("telephone "+mobile);
if(email=='' && mobile==''){
	return;
}else{
	var mobileregex=/^(6|7|8|9)\d{9}$/;
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(!regex.test(email)){	  
	return;
  } if(!mobileregex.test(mobile)){
  return;
  }
} 
  /* var isvalid = $('#defaultForm1').bootstrapValidator('validate');

	var shallReturn = false;
	for(i=0;i<isvalid[0].length;i++){
	if(!isvalid[0][i].validity.valid){
	console.log(isvalid[0][i].name +' is not valid');
	shallReturn =true;
	
	}
	}
	if(shallReturn){
		console.log('data is valid' +isvalid);
		return;
	}*/
	 // console.log('isvalid  '+isvalid);
	// if(!isvalid){
		// console.log('not valid');
	// return false;
	// }else{
		// console.log('valid');
	// } 
	// disable send button

		$('#notifyModal').modal('show');
		jQuery.ajax({
		url: "sendEmail.php",
	
		data:'requestMessage=Name:'+$("#userName").val()+'<br>'+'<br>Email:'+$("#userEmail").val()+'<br>'+'<br>mobile no:'+$("#telephone").val()+'<br>'+'<br>Subject:'+$("#subject").val()+'<br>'+'<br>Message:'+$("#message").val()+'<br>' +'&subject='+'Notification for Contact Form'+'&destination='+'pixl.akshay@gmail.com',
		type: "POST",
			success:function(data){
				console.log(data);
		//alert(data);
			$( '#defaultForm1' ).each(function(){
				resetForm($('#defaultForm1'));
				
});
		document.getElementById('ajax-loader').style.display='none';
		document.getElementById('booking_success').style.display='block'; 
		},
		error:function (data){
			console.log(data);
			$( '#defaultForm1' ).each(function(){
				
				
});			
		document.getElementById('ajax-loader').style.display='none';
		document.getElementById('booking_success').style.display='block';
		}
		});
	


}
