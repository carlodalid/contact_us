$(document).ready(function(){
    $('#submit').on('click', function(){
        $('.notifwrapper').removeClass('hidden'); 

        $.post('/', $('.submitForm').serialize())
            .done(function(response){
                $('.notifwrapper').addClass('hidden');
                $('.submitForm').trigger('reset');
            });
    });
});
