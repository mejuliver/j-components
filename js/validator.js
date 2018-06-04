if ('undefined' != typeof window.jQuery) {

    $.fn.validator = function ( options ) {

        return this.each(function(){

            $(this).wrap('<div class="j-component" data-type="validator"></div>')
            $(this).find('.reject').on("keypress keydown keyup",function(){return false;});


            //email validation
            $(this).find('[data-type*="email"]').on('focusout',function(){
                var validateEmail = function(email){
                    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    return regex.test(email);
                }

                if(!validateEmail($(this).val())){
                    $(this).next('.error[data-type*="email"]').fadeIn();
                    $(this).closest('.ui').find('.error[data-type*="email"]').fadeIn();
                    $(this).addClass('with-error');
                }else{
                    $(this).removeClass('with-error');
                    $(this).next('.error[data-type*="email"]').hide();
                   $(this).closest('.ui').find('.error[data-type*="email"]').hide();
                }

            });

                //allow only numbers
                $(this).find('[data-type*="numbersonly"]').on('keypress keydown', function (e) {
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
                    $(this).next('.error[data-type*="numbersonly"]').fadeIn();
                    $(this).closest('.ui').find('.error[data-type*="numbersonly"]').fadeIn();
                    $(this).addClass('with-error');
                    return false;
                }else{
                    $(this).removeClass('with-error');
                    $(this).next('.error[data-type*="numbersonly"]').hide();
                }

            });

            // required
           $(this).find('[data-type*="required"]').on('focusout',function (e) {
                if($(this).val() === ''){
                    $(this).next('.error[data-type*="required"]').fadeIn();
                   $(this).closest('.ui').find('.error[data-type*="required"]').fadeIn();
                    $(this).addClass('with-error');
                }else{
                    $(this).removeClass('with-error');
                    $(this).next('.error[data-type*="required"]').hide();
                    $(this).closest('.ui').find('.error[data-type*="required"]').hide();
                }
           });

        });
    	
        return this;
    }
}