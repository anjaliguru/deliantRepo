function sendContact() {
	var isvalid = $('#defaultForm1').bootstrapValidator('validate');
	var shallReturn = false;
	for (i = 0; i < isvalid[0].length; i++) {
		if (!isvalid[0][i].validity.valid) {
			console.log(isvalid[0][i].name + ' is not valid');
			shallReturn = true;
		}
	}
	if (shallReturn) {
		return false;
	}


	$('#ajax-loader').show();
	$('#booking_success').hide();
	$('#notifyModal').modal('show');
	jQuery.ajax({
		url : "sendEmail.php",

		data : 'requestMessage=Name:' + $("#userName").val() + '<br>'
				+ '<br>Email:' + $("#userEmail").val() + '<br>'
				+ '<br>mobile no:' + $("#telephone").val() + '<br>'
				+ '<br>Subject:' + $("#subject").val() + '<br>'
				+ '<br>Message:' + $("#message").val() + '<br>' + '&subject='
				+ 'Notification for Contact Form' + '&destination='
				+ 'pixl.akshay@gmail.com',
		type : "POST",
		success : function(data) {
			console.log(data);
			$('#defaultForm1').each(function() {
				resetForm($('#defaultForm1'));

			});
		setTimeout(function(){
 $('#ajax-loader').hide();
}, 3000);
				setTimeout(function(){
$('#booking_success').show();
}, 3000);
		},
		error : function(data) {
			$('#defaultForm1').each(function() {
				resetForm($('#defaultForm1'));

			});
			setTimeout(function(){
 $('#ajax-loader').hide();
}, 3000);
			setTimeout(function(){
	$('#booking_success').show();
}, 3000);
		}
	});

}
