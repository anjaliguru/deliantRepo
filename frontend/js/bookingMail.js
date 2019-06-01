function bookingMail(){
	insertBookingInfo();
	sendWelcomeMessage();
	sendMail();
}

/*function insertBookingInfo() {
	var fromdata = $('#booking_form').serializeArray();
	
    var helper = ($('#toggle-trigger').prop('checked')) ? "Yes" : "NO" ; 
    var loading = ($('#toggle-trigger').prop('checked') && $('#loading').prop('checked')) ? "Yes" : "No" ;
    var unloading = ($('#toggle-trigger').prop('checked') && $('#unloading').prop('checked')) ? "Yes" : "No" ;
    var no_of_helper = parseInt($("#helper")[0].innerText);
    var estimated_price = ($('#totalPrice').text()).replace("Estimated Price =  ₹", "");
    var fromdata = {
                	    "name":$('#name').val(),
                	    "phone_no":$('#phone').val(),
                	    "pickup_location":$('#pickup').val(),
                	    "drop_location":$('#drop').val(),
                	    "helper":helper,
                	    "loading":loading,
                	    "unloading":unloading,
                	    "no_of_helper":no_of_helper,
                	    "estimated_distance":$('#estimatedDistance').val(),
                	    "estimated_price":estimated_price,
                	    "booking_date":$('#datetimepicker1').val(),
                	    "booking_time":$('#datetimepicker2').val(),
                	    "services":$('#services_type').val(),
                	    "category":$('#goods_type').val()
	                };
	
	$.ajax({
        url: 'insertBookingInfo.php',
        type: "POST",
        data : {'formData':fromdata},
        dataType: "json",
        success: function(result) {
 	     	//console.log(result);
        }
	});
}*/
function insertBookingInfo() {
	var fromdata = $('#booking_form').serializeArray();
    var helper = ($('#toggle-trigger').prop('checked')) ? "Yes" : "NO" ; 
    var loading = ($('#toggle-trigger').prop('checked') && $('#loading').prop('checked')) ? "Yes" : "No" ;
    var unloading = ($('#toggle-trigger').prop('checked') && $('#unloading').prop('checked')) ? "Yes" : "No" ;
    var no_of_helper = parseInt($("#helper")[0].innerText);
    var estimated_price = ($('#totalPrice').text()).replace("Estimated Price =  ₹", "");
    var fromdata = {
                	    "name":$('#name').val(),
                	    "phone_no":$('#phone').val(),
                	    "pickup_location":$('#pickup').val(),
                	    "drop_location":$('#drop').val(),
                	    "helper":helper,
                	    "loading":loading,
                	    "unloading":unloading,
                	    "no_of_helper":no_of_helper,
                	    "estimated_distance":$('#estimatedDistance').val(),
                	    "estimated_price":estimated_price,
                	    "booking_date":$('#datetimepicker1').val(),
                	    "booking_time":$('#datetimepicker2').val(),
                	    "services":$('#services_type').val(),
                	    "category":$('#goods_type').val()
	                };
	
	$.ajax({
        url: base_url_api+'api/booking/',
        type: "POST",
        data : {"param":"booking", 'formData':fromdata},
        dataType: "json",
        success: function(result) {
 	     	//console.log(result);
        }
	});
}
function sendWelcomeMessage(){ 
	//var mobile_no = $('$mobile_no').val();
	jQuery.ajax({
	        url: base_url_api + 'api/otp',
	        contentType: "application/json;",
	        type: "POST",
	        data:  JSON.stringify({"param":"sendWelcomeMessage","mobileno":$('#phone').val(), "name":$("#name").val()}) ,
	        dataType: "json",
	        success: function(result) {
	            //console.log("welcome message send =============== ",result);
	        }
	    });	
}

function sendMail(){
		
	// check for form validity first
	var isvalid = $('#booking_form').bootstrapValidator('validate');
	var shallReturn = false;
	for(i=0;i<isvalid[0].length;i++){
	    if(!isvalid[0][i].validity.valid){
	        //console.log(isvalid[0][i].name +' is not valid');
	        shallReturn=true;
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
    var price = document.getElementById('totalPrice').innerText;
    for (var i = 0, element; element = elements[i++];) {
    	if(element.name!='submit_booking'&&element.name!='close_modal'&&element.name!=''){
    				message = message +"<b>"+ element.name+" :</b> " + element.value+"<br>";
    	}
    }
    message = message +price+"<br>";
	
    //console.log("Booking  message "+message );
	/*jQuery.ajax({
		url: "sendEmail.php",
		data:'requestMessage=<b>Booking details :</b> <br>'+message+'<br>'+'&subject='+'Booking details'+'&destination='+'pixl.akshay@gmail.com', 
		type: "POST",
		success:function(data){
			console.log(data);
	     	$('#booking_form').bootstrapValidator("resetForm", true);
		    // enable the send button
		    sendButton.disabled=false;
		    // restore the modal form and remove loader
		    var theForm = document.forms["booking_form"];
		    setTimeout(function(){
                $('#ajax-loader').hide();
                $('#booking_success').show();
            }, 3000);
	    },
		error:function (data){
		   	$('#booking_form').bootstrapValidator("resetForm", true);
		    sendButton.disabled=false;
		    // restore the modal form and remove loader
		    var theForm = document.forms["booking_form"];
		    setTimeout(function(){
                $('#ajax-loader').hide();
                $('#booking_error').show();
            }, 3000);
	    }
	});*/
	var requestMessage = '<b>Booking details :</b> <br>'+message+'<br>';
	var subject = 'Booking details';
	var destination = 'pixl.akshay@gmail.com';
	
	$.ajax({
        url: base_url_api+'api/sendMail/',
        data : {"param":"sendMail", "requestMessage":requestMessage,"subject":subject,"destination":destination},
        type: "POST",
        //dataType: "json",
        success:function(data){
			console.log(data);
	     	$('#booking_form').bootstrapValidator("resetForm", true);
		    // enable the send button
		    sendButton.disabled=false;
		    // restore the modal form and remove loader
		    var theForm = document.forms["booking_form"];
		    setTimeout(function(){
                $('#ajax-loader').hide();
                $('#booking_success').show();
            }, 3000);
	    },
		error:function (data){
		   	$('#booking_form').bootstrapValidator("resetForm", true);
		    sendButton.disabled=false;
		    // restore the modal form and remove loader
		    var theForm = document.forms["booking_form"];
		    setTimeout(function(){
                $('#ajax-loader').hide();
                $('#booking_error').show();
            }, 3000);
	    }
	});
}



