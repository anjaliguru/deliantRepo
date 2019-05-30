function getOtp(){
    // check for form validity first
    var isvalid = $('#booking_form').bootstrapValidator('validate');
    var shallReturn = false;
    for(i=0;i<isvalid[0].length;i++){
        if(!isvalid[0][i].validity.valid){
            //console.log(isvalid[0][i].name +' is not valid');
            shallReturn =true;
        }
    }
    if(shallReturn){
        return;
    }


    $('.modal-display').hide();
    reset_otp_form();
    jQuery.ajax({
        url: base_url_api + 'api/otp',
        contentType: "application/json;",
        type: "POST",
        data:  JSON.stringify({"param":"registration","mobileno":$('#phone').val(),"name":$('#name').val() }) ,
        dataType: "json",
        success: function(result) {
        //  console.log("get otp result =============== ",result);
            $('#ajax-loader').hide(); 
            $('.modal-display').hide();
            //$('#mobile_no').val($('#phone').val());
            $('#otp_form').show(); 
        }
    });   
}

function checkOtp(){
    var rs = $('.otp_form').bootstrapValidator('validate');
    window.rs=rs;
    
    
    var isvalid = $('#otp_form').bootstrapValidator('validate');
    var shallReturn = false;
    for(i=0;i<isvalid[0].length;i++){
        if(!isvalid[0][i].validity.valid){
           // console.log(isvalid[0][i].name +' is not valid');
            shallReturn =true;
        }
    }
    if(shallReturn){
        return;
    }
    
    
    jQuery.ajax({
        url: base_url_api + 'api/otp',
        type: "POST",
        contentType: "application/json;",
        data:  JSON.stringify(  
            {
                "param":"checkOtp",
                "mobileno":$('#mobile_no').val(),
                //"otp":$('#otp').val(),
                "otp":encode_string($('#otp').val()),
                "count_type":"attempt_count"
            }),
        success: function(result) {
            //$('#ajax-loader').hide(); 
            result = JSON.parse(result);
            if(result.status == 1){
                $('.modal-display').hide();
                bookingMail();
            }else{
                $('#otp_error_msg').html(result.message).show();
                $('#otp_error_msg').parent().addClass('has-error');
            }
            
        }
    });
}

$('.modal-close-btn').click(function(){
    $('.modal-display').hide();
});


function resend_otp(){
   /* var isvalid = $('.resend_otp_form').bootstrapValidator('validate');
    var shallReturn = false;
    for(i=0;i<isvalid[0].length;i++){
        if(!isvalid[0][i].validity.valid){
            console.log(isvalid[0][i].name +' is not valid');
            shallReturn =true;
        }
    }
    if(shallReturn){
        return;
    }*/
    //$('#ajax-loader').show();
    reset_otp_form();
    jQuery.ajax({
        url: base_url_api + 'api/otp',
        type: "POST",
        data:  JSON.stringify({"param":"registration","mobileno":$('#mobile_no').val(),"name":$('#name').val()}) ,
        dataType: "json",
        success: function(result) {
            $('#ajax-loader').hide(); 
            //result = JSON.parse(result);  
            if(result.status == 1) 
                alert('OTP has been resend to your Mobile Number');
            else
                alert(result.message);
                
        }
    });   
}


$(document).ready(function() {
    $('#otp_form').bootstrapValidator({
        message: 'This value is not valid',
        excluded: ':disabled',
        /*feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },*/
        fields: {
            mobile_no: {
                validators: {
                    notEmpty: {
                        message: 'Please enter mobile number.'
                    },
                    regexp: {
                                regexp: /^(6|7|8|9)\d{9}$/, 
                                message: 'Enter valid mobile number. '
                            }
                }
            },
            otp: {
                validators: {
                    notEmpty: {
                        message: 'Please enter OTP.'
                    }
                }
            }
        }
    });
    
    $('#otp').on('dp.change dp.show', function (e) {
            // Revalidate the date when user change it
            $('#otp_form').bootstrapValidator('revalidateField', 'otp');
        });
    
    /*$('.resend_otp_form').bootstrapValidator({
        //message: 'This value is not valid',
        excluded: ':disabled',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            mobile_no: {
                validators: {
                    notEmpty: {
                        message: 'Please enter mobile number.'
                    },
                    regexp: {
                                regexp: /^(6|7|8|9)\d{9}$/, 
                                message: 'Enter valid mobile number. '
                            }
                }
            }
        }
    });*/
    
    $('#submit_otp').click(function() {
        var rs = $('#otp_form').bootstrapValidator('validate');
        window.rs=rs;
    });
    /*$('#submit_resend').click(function() {
        //  var rs = $('.resend_otp_form').bootstrapValidator('validate');
        $('.resend_otp_form').valide()
        window.rs=rs;
    });*/
    $('#mobile_no').blur(function(){
        //console.log($('mobile_no').val());
        $('#phone').val($('#mobile_no').val());
    });
    $('#phone').blur(function(){
        $('#mobile_no').val($('#phone').val());
    });
});

function resetForm($form) {
    $form.bootstrapValidator('resetForm', true);
}

function reset_otp_form(){
    
    $mobile_no = $('#mobile_no').val();
    $('#otp_form').bootstrapValidator('resetForm', true);
    $('#phone').val($mobile_no);
    $('#mobile_no').val($mobile_no);
    $('#otp_error_msg').html('');
    /*$('#otp').val('');
    //$('.help-block').hide();
    
    //$('#otp_error_msg').parent().removeClass('has-error');
    $('#mobile_no_error_msg').html('');
    //$('#mobile_no_error_msg').parent().removeClass('has-error');*/

}
function encode_string($srting){
    return SHA256($srting);
}
