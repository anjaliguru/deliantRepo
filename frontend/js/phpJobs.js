
function resumeSend() {

     	//var file=document.getElementById("uploaded_file").value;
		 var theForm = document.forms["quotationform"];
		 var formdata= new FormData(theForm);	
		///var servicetype1 = theForm.elements["uploaded_file"];
       // window.servicetype1 = servicetype1;
	//	alert(theForm);
		$.ajax({
		url: "resume-send.php",
		enctype: 'multipart/form-data',
		//data:'userName='+$("#userName").val()+'&userEmail='+$("#userEmail").val() +'&telephone='+$("#telephone").val()+'&subject='+$("#subject").val()+'&message='+$("#message").val(), 
		//data:'requestName='+servicetype1.value+'&subject='+'Notification for Booking'+'&destination='+'pixl.akshay@gmail.com',
		data:formdata,
         processData: false,
         contentType: false,
		type: "POST",
			success:function(data){
		  console.log(data);
			},	
		error:function(data){
	 console.log(data);
			}
		});
	



//
/* $("#uploaded_file").change(function() {
        var file = this.files[0];
        var imagefile = file.type;
        var match= ["jpg"];
        if(!((imagefile==match[0]) )){
            alert('Please select a valid image file (JPEG/JPG/PNG).');
            $("#uploaded_file").val('');
            return false;
        }
    });
*/
}