
$(document).ready(function() {
    // Generate a simple captcha
   
    $('#booking_form').bootstrapValidator({
		
//        live: 'disabled',
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            Name: {
                validators: {
                    notEmpty: {
                        message: 'Please enter name.'
                    },
                    stringLength: {
                        max: 40,
                        message: 'The username must be more than 6 and less than 30 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z_\.]+$/,
                        message: 'The name can only consist alphabets. '
                    }
                }
            },           
			 Phone_No: {
                validators: {
					notEmpty: {
                        message: 'Please enter mobile number.'
                    },
                    
					 regexp: {
		                        //regexp: /^\d{10}$/ ,///^\d+$/, 
                                regexp: /^(6|7|8|9)\d{9}$/, 
		                        message: 'Enter valid mobile number.'
		                    }
                }
            },
			 Booking_Time: {
                validators: {
					notEmpty: {
                        message: 'Please enter booking time.'
                    },
                    
					 regexp: {
		                        //regexp: /^\d{10}$/ ,///^\d+$/, 
                                regexp: /^([1-9]|[0][1-9]|(1)[1-2])(:)(([1-9])|([0-5][0-9]))( |)(AM|PM|am|pm)$/, 
		                        message: 'Enter valid booking time.'
		                    }
                }
            },
			 Booking_Date: {
                validators: {
					notEmpty: {
                        message: 'Please enter booking date.'
                    },
                    
					 regexp: {
		                        //regexp: /^\d{10}$/ ,///^\d+$/, 
                                regexp: /^([1-9]|[0-2][0-9]|(3)[0-1])(-)(([1-9])|((0)[1-9])|((1)[0-2]))(-)(2019)$/, 
		                        message: 'Enter valid booking date.'
		                    }
                }
            }
			
           
           
            
        }
    });
	 $('#submit_booking').click(function() {
		 console.log('submit clicked');
        var resp =$('#booking_form').bootstrapValidator('validate');
		window.resp=resp;
		console.log('resp  '+resp);
    });


 });
 function resetForm($form) {
            $form.bootstrapValidator('resetForm', true);

        }

 
  // for passenger service
 