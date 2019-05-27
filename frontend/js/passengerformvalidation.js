/*$(document).ready(function() {
    // Generate a simple captcha
    
    $('#otp-form').bootstrapValidator({
//        live: 'disabled',
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
          
           
        
			 telephone: {
                validators: {
					notEmpty: {
                        message: 'Please enter mobile number.'
                    },
                    
					 regexp: {
		                        //regexp: /^\d{10}$/ ,///^\d+$/, 
                                regexp: /^(6|7|8|9)\d{9}$/, 
		                        message: 'Enter valid mobile number. '
		                    }
                }
            }
			
           
           
            
        }
    });
	 $('#submit_otp').click(function() {
		 console.log('submit clicked');
      var rs = $('#otp-form').bootstrapValidator('validate');
		window.rs=rs;
		console.log('resp  '+rs)
    });


 });

 function resetForm($form) {
            $form.bootstrapValidator('resetForm', true);

        }

 
  // for passenger service
 */