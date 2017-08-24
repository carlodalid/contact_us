var spinner = '<div class="spinner">' +
'<div class="bounce1"></div>' +
'<div class="bounce2"></div>' +
'<div class="bounce3"></div>' +
'</div>';

$(document).ready(function(){
    $('#submit').on('click', function(){
        $('.notifwrapper').empty();
        $('.notifwrapper').append(spinner);

        $.post('/', $('.submitForm').serialize())
            .done(function(response){
                $('.spinner').remove();
                $('.notifwrapper').append('<p style="color:green;">' + response.msg + '</p>');
            }).fail(function(xhr, textStatus, errorThrown){
                $('.spinner').remove();
                $('.notifwrapper').append('<p style="color:red;">' + xhr.responseJSON.msg + '</p>');
            });

        $('.submitForm').trigger('reset');
    });
});
