var spinner = '<div class="spinner">' +
'<div class="bounce1"></div>' +
'<div class="bounce2"></div>' +
'<div class="bounce3"></div>' +
'</div>';

var isEmail = function(email){
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

var simpleValidation = function(){
    $('.form-group').removeClass('has-error');
    $('.notifwrapper p').remove();

    var $name   = $('.nameForm');
    var $email  = $('.emailForm');
    var $msg    = $('.messageForm');

    if ($name.find('input').val() == ''){
        $name.addClass('has-error');
        $('.notifwrapper').append('<p style="color:#a94442;"> First Name is required </p>');
        return false;
    }

    if ($email.find('input').val() == '' || !isEmail($email.find('input').val())){
        $email.addClass('has-error');
        $('.notifwrapper').append('<p style="color:#a94442;"> Invalid email address </p>');
        return false;
    }

    if ($msg.find('textarea').val() == ''){
        $msg.addClass('has-error');
        $('.notifwrapper').append('<p style="color:#a94442;"> Message Body is required </p>');
        return false;
    }

    return true;
}

$(document).ready(function(){
    $('#submit').on('click', function(){
        if (simpleValidation() == true){
            $('.notifwrapper').append(spinner);
            $.post('/', $('.submitForm').serialize())
                .done(function(response){
                    $('.spinner').remove();
                    $('.notifwrapper').append('<p style="color:#3c763d;">' + response.msg + '</p>');
                }).fail(function(xhr, textStatus, errorThrown){
                    $('.spinner').remove();
                    $('.notifwrapper').append('<p style="color:#a94442;">' + xhr.responseJSON.msg + '</p>');
                });

            $('.submitForm').trigger('reset');
        } 
    });
});
