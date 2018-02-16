if ('undefined' == typeof window.jQuery) {
    return;
}


(function($){

    $.fn.j_datepicker = function ( options ) {

    	$(document).on("keypress keydown keyup",".reject",function(){return false;});


        //email validation
        $(document).on( 'focusout','.j-component[data-type*="validator"] input[data-type*="email"]',function(){
            var validateEmail = function(email){
                var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                return regex.test(email);
            }

            if(!validateEmail($(this).val())){
                $('this').next('.error[data-type*="email"]').fadeIn();
                $(this).addClass('with-error');
                $(this).focus();
            }else{
                $(this).removeClass('with-error');
                $('this').next('.error[data-type*="email"]').hide();
            }

        });

        //allow only numbers
       $(document).on('.j-component[data-type*="validator"] input[data-type*="numbersonly"]', function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                 // Allow: Ctrl+A
                (e.keyCode == 65 && e.ctrlKey === true) || 
                 // Allow: home, end, left, right, down, up
                (e.keyCode >= 35 && e.keyCode <= 40)) {
                     // let it happen, don't do anything
                     return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                $('this').next('.error[data-type*="numbersonly"]').fadeIn();
                $(this).addClass('with-error');
                $(this).focus();
            }else{
                $(this).removeClass('with-error');
                $('this').next('.error[data-type*="numbersonly"]').hide();
            }

        });

       // required
       $(document).on('.j-component[data-type*="validator"] input[data-type*="required"]', function (e) {

            if($(this).val() === ''){
                $('this').next('.error[data-type*="required"]').fadeIn();
                $(this).addClass('with-error');
                $(this).focus();
            }else{
                $(this).removeClass('with-error');
                $('this').next('.error[data-type*="required"]').hide();
            }
       });
    }

})(jQuery);