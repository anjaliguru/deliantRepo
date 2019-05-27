function bookingMail(){
	insertBookingInfo();
	sendWelcomeMessage();
	sendMail();
}

function insertBookingInfo() {
	var fromdata = $('#booking_form').serializeArray();	
	$.ajax({
        url: 'insertBookingInfo.php',
        type: "POST",
        data: {'formData':JSON.stringify(fromdata)},
        dataType: "json",
        success: function(result) {
 	     	console.log(result);
        }
	});
}

function sendWelcomeMessage(){ 
	var mobile_no = $('#mobile_no').val();
	jQuery.ajax({
	        url: base_url_api + 'api/otp',
	        contentType: "application/json;",
	        type: "POST",
	        data:  JSON.stringify({"param":"sendWelcomeMessage","mobileno":$('#phone').val()}) ,
	        dataType: "json",
	        success: function(result) {
	            console.log("welcome message send =============== ",result);
	        }
	    });	
}
function sendMail() {		
	// check for form validity first
	var isvalid = $('#booking_form').bootstrapValidator('validate');
	var shallReturn = false;
	for(i=0;i<isvalid[0].length;i++){
	if(!isvalid[0][i].validity.valid){
	console.log(isvalid[0][i].name +' is not valid');
	shallReturn =true;
	}
	}
	if(shallReturn){
		return;
	}
	
	// disable send button
	var sendButton = $('#submit_booking');
    sendButton.value='Sending…';
    sendButton.disabled=true;
    var theForm = document.forms["booking_form"];
    theForm.style.display='none';
    document.getElementById('ajax-loader').style.display='block';
    
    var subject = "Booking mail";
    
    var message="";
    var theForm = document.forms["booking_form"];
    
    var elements = theForm.elements;
    console.log("elements ====================", elements);
    var price = document.getElementById('totalPrice').innerText;
    for (var i = 0, element; element = elements[i++];) {
    	if(element.name!='submit_booking'&&element.name!='close_modal'&&element.name!=''){
    		
    				message = message +"<b>"+ element.name+" :</b> " + element.value+"<br>";
    		
    	}
        
    }
    message = message +price+"<br>";
	
    console.log("Booking  message "+message );
	jQuery.ajax({
		url: "sendEmail.php",
		data:'requestMessage=<b>Booking details :</b> <br>'+message+'<br>'+'&subject='+'Booking details'+'&destination='+'pixl.akshay@gmail.com', 
		type: "POST",
		success:function(data){
			console.log(data);
			  $('#booking_form' ).each(function(){
					 console.log('inside each function');
				resetForm($('#booking_form'));
				});
	
		      	 $('#booking_form').trigger("reset");
		      	
		      	 // enable the send button
		       	sendButton.disabled=false;
		       	
		       	// restore the modal form and remove loader
		       	var theForm = document.forms["booking_form"];
		        document.getElementById('ajax-loader').style.display='none';
		        document.getElementById('booking_success').style.display='block';
		    },
		error:function (data){
			console.log(data);
	    	 // close the modal
		   	
		   	 $('#booking_form').trigger("reset");
			 $( '#booking_form' ).each(function(){
				resetForm($('#booking_form'));
				});
		    	sendButton.disabled=false;
		    	// restore the modal form and remove loader
		    	var theForm = document.forms["booking_form"];
		        document.getElementById('ajax-loader').style.display='none';
		        document.getElementById('booking_error').style.display='block';
		     }
		});
}



