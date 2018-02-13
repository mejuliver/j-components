if ('undefined' == typeof window.jQuery) {
    return;
}


(function($){

    $.fn.j_validator = function ( options ) {

    	$(document).on("keypress keydown keyup",".reject",function(){return false;});


    }


    //email validation
    $('.j-validator[data-type="email"]').focusout(function(){
        var validateEmail = function(email){
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        }

        if(!validateEmail($(this).val())){
            $('this').next('.error.email').fadeIn();
            $(this).focus();
        }

    });

    $('.j-validator[data-type="required"]').focusout(function(){

    });


    //allow only numbers
    $(document).on("keydown", ".numbersonly", function (e) {
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
            e.preventDefault();
        }
    });


})(jQuery);