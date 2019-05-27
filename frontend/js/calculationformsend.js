
function sendcalCulationForm() {

     var name= $("#name").val();
	 var mobile= $("#phone").val();
	  var drop= $("#drop").val();
	   var pickup= $("#pickup").val();
	console.log("name "+name);
	console.log("telephone "+mobile);
if(name=='' && mobile==''){
	return;
}
		$('#notifyModal').modal('show');
		jQuery.ajax({
		url: "calculation-form.php",
		//data:'userName='+$("#userName").val()+'&userEmail='+$("#userEmail").val() +'&telephone='+$("#telephone").val()+'&subject='+$("#subject").val()+'&message='+$("#message").val(), 
		data:'requestName='+$("#name").val()+'<br>'+'&requestPhone='+$("#phone").val()+'<br>'+'&requestPickUp='+pickup+'<br>'+'&requestDrop='+drop+'<br>'+'&requestTime='+$("#bookingtime").val()+'<br>' +'&subject='+'Notification for Booking'+'&destination='+'pixl.akshay@gmail.com',
		type: "POST",
			success:function(data){
		 alert(data);
			$( '#defaultForm' ).each(function(){
				resetForm($('#defaultForm'));
				
});
		document.getElementById('ajax-loader').style.display='none';
		document.getElementById('booking_success').style.display='block'; 
		},
		error:function (){
			$( '#defaultForm' ).each(function(){
				resetForm($('#defaultForm'));
				
});			
		document.getElementById('ajax-loader').style.display='none';
		document.getElementById('booking_success').style.display='block';
		}
		});
	


}
function resetForm($form) {
			
            $('#defaultForm').bootstrapValidator('resetForm', true);

        }
