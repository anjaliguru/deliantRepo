
$(document).ready(function() {
    // Generate a simple captcha
   
    $('#defaultForm1').bootstrapValidator({
//        live: 'disabled',
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            userName: {
                validators: {
                    notEmpty: {
                        message: 'Please enter name.'
                    },
                    stringLength: {
                        max: 40,
                        message: 'The name must be more than 6 and less than 30 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z ]+$/,
                        message: 'The name can only consist of alphabetical.'
                    }
                }
            },
           
           
            userEmail: {
                validators: {
                    notEmpty: {
                        message: 'Please enter email id.'
                    },
                   
                     regexp: {
                        regexp:  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: 'Enter valid email id.'
                    }
                }
            },
             telephone: {
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
            subject: {
                validators: {
                    notEmpty: {
                        message: 'Please enter subject.'
                    }
                    
                    }
            },
            message: {
                validators: {
                    notEmpty: {
                        message: 'Please enter message.'
                    }
                    
                    }
            }
           
           
            
        }
    });



 });
 function resetForm($form) {
            $form.bootstrapValidator('resetForm', true);

        }

  // for passenger service
 