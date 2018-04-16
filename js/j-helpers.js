if ('undefined' != typeof window.jQuery ) {
    /* 
        J - C O M P O N E N T S  H E L P E R S
    --------------------------------------------------------------------    

    */

    //run those functions specified from the called functions argument. To use, get_dependencies(function1 function2 function3 function4)
    function _runner(dependencies){
        //check if attr 'success-function' exist and not empty
        if(typeof dependencies !== typeof undefined && dependencies !== false && dependencies !== "") {
            var classList = dependencies.split(/\s+/);
            $.each(classList, function(index, item) {
                if( typeof item !== typeof undefined && typeof item === 'function'){
                    window[item]();
                }
            });
        }

    }
    /* 
        A J A X  P U L L
        ----------------------------------------------------
        Pull contents asynchronously

        call : get_page(link, dependencies, container, spinner);

        note : if no 'link' provided then assume uses the current link
        note : if you want too invoke a function after ajax was successful then add function name which to be called later in the 2nd argument of the function
        note : if no container then post some logs on the console
        note : if no spinner supplied then default spinner will be use instead


    */
    function get_page(link = false,dependencies = false,container = false,spinner = false){

        $.ajax({
            url : app_url + '/ajax-page',
            type : 'get',
            context: this,
            dataType : 'html',
            beforeSend: function(){
                if(!spinner){
                    j_spinner("on");
                }else{
                    j_spinner("on",spinner);
                }
            },
            complete: function(){j_spinner("off");},
            success : function(e) {
                if(!container){
                    console.log(e);
                }else{
                    $(container).html(e);
                }
                _runner(dependencies);
            }
        });
    }
    /* 
        S L I D E  N O T I F I C A T I O N
        ----------------------------------------------------
        Material slide

        call : j_notification( contents, auto_hide true|false, mode on|off)

    */
    function j_notification(data = false, auto_hide = false, mode){
        if(!auto_hide){
            if($("#j-notification-dialog").length){
                
                if(mode === 'on'){
                    $("#j-notification-dialog").html( !data ? 'Hello there' : data );
                    $("#j-notification-dialog").show();
                }

            }else{
                if(mode === 'on'){
                    $("body").append('<div class="animated slideInRight shadow-z-1" id="j-notification-dialog">' + data + '</div>'); 
                    $("#j-notification-dialog").show();
                }
            }
            if(mode === "off"){
                $("#j-notification-dialog").delay(3000).fadeOut(500);
            }
        }else{
            if($("#j-notification-dialog").length){
                if(mode === 'on'){
                    $("#j-notification-dialog").html(data);
                    $("#j-notification-dialog").show();
                }
            }else{
                if(mode === 'on'){
                    $("body").append('<div class="animated slideInRight shadow-z-1" id="j-notification-dialog">' + data + '</div>'); 
                    $("#j-notification-dialog").show();
                }
            }
            $("#j-notification-dialog").delay(5000).fadeOut(500);
        }
    }   

    $(window).load(function(){
        $("body").fadeIn(200);
        //run the checkwidth function
        checkwidth();
        //on window resize
    });
    $(window).resize(function(){
        //run the checkwidth function
        checkwidth();
    });

    function checkwidth(){
        //$(".overflow_x:visible table").hide();
        //give a full height to those element that has a class of "full height"
        $(".full-height").css({ 'height' : $(window).height() + 'px' });
        //give width to elements that has a class of ".fixed-child" equals to the parent reference element width that has a class of ".fixed-parent"
        $(".fixed-child").each(function(){
            $(this).css({ 'width' : $(this).closest(".fixed-parent").width() + 'px' });
        });
        //give height to the elements that has a class of ".fixed-parent" equals to its first child element height that has a class of ".fixed-child"
        $(".fixed-parent").each(function(){
             $(this).css({ 'height' : $(this).find(".fixed-child:first-child").innerHeight() + 'px' });
        });
        m_size();
    }



    // R A N D O M  S T R I N G
    function random_str() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }


    // J - E Q U A L  C O M P O N E N T
    function m_size(){

        $('.j-equal').css( 'height' , 'auto' );
        
        if($(window).width()>=992){
            $('.j-equal-container').each(function(){
                var dis = $(this),
                    elementHeights = false,
                    maxHeight = false;
                // Get an array of all element heights
                elementHeights = dis.find('.j-equal').map(function() {
                    return $(this).outerHeight();
                }).get();
                // Math.max takes a variable number of arguments
                // `apply` is equivalent to passing each height as an argument
                maxHeight = Math.max.apply(null, elementHeights);
                // Set each height to the max height
                dis.find('.j-equal').css('height',maxHeight);


                // j equal 2
                // Get an array of all element heights
                elementHeights = dis.find('.j-equal2').map(function() {
                    return $(this).outerHeight();
                }).get();
                // Math.max takes a variable number of arguments
                // `apply` is equivalent to passing each height as an argument
                maxHeight = Math.max.apply(null, elementHeights);
                // Set each height to the max height
                dis.find('.j-equal2').css('height',maxHeight);

                // j equal 3
                // Get an array of all element heights
                elementHeights = dis.find('.j-equal3').map(function() {
                    return $(this).outerHeight();
                }).get();
                // Math.max takes a variable number of arguments
                // `apply` is equivalent to passing each height as an argument
                maxHeight = Math.max.apply(null, elementHeights);
                // Set each height to the max height
                dis.find('.j-equal3').css('height',maxHeight);

                // j equal 4
                // Get an array of all element heights
                elementHeights = dis.find('.j-equal4').map(function() {
                    return $(this).outerHeight();
                }).get();
                // Math.max takes a variable number of arguments
                // `apply` is equivalent to passing each height as an argument
                maxHeight = Math.max.apply(null, elementHeights);
                // Set each height to the max height
                dis.find('.j-equal4').css('height',maxHeight);

                // Get an array of all element heights
                elementHeights = dis.find('.j-equal5').map(function() {
                    return $(this).outerHeight();
                }).get();
                // Math.max takes a variable number of arguments
                // `apply` is equivalent to passing each height as an argument
                maxHeight = Math.max.apply(null, elementHeights);
                // Set each height to the max height
                dis.find('.j-equal5').css('height',maxHeight);

                // Get an array of all element heights
                elementHeights = dis.find('.j-equal6').map(function() {
                    return $(this).outerHeight();
                }).get();
                // Math.max takes a variable number of arguments
                // `apply` is equivalent to passing each height as an argument
                maxHeight = Math.max.apply(null, elementHeights);
                // Set each height to the max height
                dis.find('.j-equal6').css('height',maxHeight);
            });
         }

        
        if($(window).width() >= 768 && $(window).width() <= 991){
            $('.j-equal-container.sm').each(function(){
                var dis = $(this),
                    elementHeights = false,
                    maxHeight = false;
                // Get an array of all element heights
                elementHeights = dis.find('.j-equal').map(function() {
                    return $(this).outerHeight();
                }).get();
                // Math.max takes a variable number of arguments
                // `apply` is equivalent to passing each height as an argument
                maxHeight = Math.max.apply(null, elementHeights);
                // Set each height to the max height
                dis.find('.j-equal').css('height',maxHeight);


                // j equal 2
                // Get an array of all element heights
                elementHeights = dis.find('.j-equal2').map(function() {
                    return $(this).outerHeight();
                }).get();
                // Math.max takes a variable number of arguments
                // `apply` is equivalent to passing each height as an argument
                maxHeight = Math.max.apply(null, elementHeights);
                // Set each height to the max height
                dis.find('.j-equal2').css('height',maxHeight);

                // j equal 3
                // Get an array of all element heights
                elementHeights = dis.find('.j-equal3').map(function() {
                    return $(this).outerHeight();
                }).get();
                // Math.max takes a variable number of arguments
                // `apply` is equivalent to passing each height as an argument
                maxHeight = Math.max.apply(null, elementHeights);
                // Set each height to the max height
                dis.find('.j-equal3').css('height',maxHeight);

                // j equal 4
                // Get an array of all element heights
                elementHeights = dis.find('.j-equal4').map(function() {
                    return $(this).outerHeight();
                }).get();
                // Math.max takes a variable number of arguments
                // `apply` is equivalent to passing each height as an argument
                maxHeight = Math.max.apply(null, elementHeights);
                // Set each height to the max height
                dis.find('.j-equal4').css('height',maxHeight);

                // Get an array of all element heights
                elementHeights = dis.find('.j-equal5').map(function() {
                    return $(this).outerHeight();
                }).get();
                // Math.max takes a variable number of arguments
                // `apply` is equivalent to passing each height as an argument
                maxHeight = Math.max.apply(null, elementHeights);
                // Set each height to the max height
                dis.find('.j-equal5').css('height',maxHeight);

                // Get an array of all element heights
                elementHeights = dis.find('.j-equal6').map(function() {
                    return $(this).outerHeight();
                }).get();
                // Math.max takes a variable number of arguments
                // `apply` is equivalent to passing each height as an argument
                maxHeight = Math.max.apply(null, elementHeights);
                // Set each height to the max height
                dis.find('.j-equal6').css('height',maxHeight);
            });
         }

            if($(window).width() <= 767){
                $('.j-equal-container.xs').each(function(){
                    var dis = $(this),
                    elementHeights = false,
                    maxHeight = false;
                    // Get an array of all element heights
                    elementHeights = dis.find('.j-equal').map(function() {
                        return $(this).outerHeight();
                    }).get();
                    // Math.max takes a variable number of arguments
                    // `apply` is equivalent to passing each height as an argument
                    maxHeight = Math.max.apply(null, elementHeights);
                    // Set each height to the max height
                    dis.find('.j-equal').css('height',maxHeight);


                    // j equal 2
                    // Get an array of all element heights
                    elementHeights = dis.find('.j-equal2').map(function() {
                        return $(this).outerHeight();
                    }).get();
                    // Math.max takes a variable number of arguments
                    // `apply` is equivalent to passing each height as an argument
                    maxHeight = Math.max.apply(null, elementHeights);
                    // Set each height to the max height
                    dis.find('.j-equal2').css('height',maxHeight);

                    // j equal 3
                    // Get an array of all element heights
                    elementHeights = dis.find('.j-equal3').map(function() {
                        return $(this).outerHeight();
                    }).get();
                    // Math.max takes a variable number of arguments
                    // `apply` is equivalent to passing each height as an argument
                    maxHeight = Math.max.apply(null, elementHeights);
                    // Set each height to the max height
                    dis.find('.j-equal3').css('height',maxHeight);

                    // j equal 4
                    // Get an array of all element heights
                    elementHeights = dis.find('.j-equal4').map(function() {
                        return $(this).outerHeight();
                    }).get();
                    // Math.max takes a variable number of arguments
                    // `apply` is equivalent to passing each height as an argument
                    maxHeight = Math.max.apply(null, elementHeights);
                    // Set each height to the max height
                    dis.find('.j-equal4').css('height',maxHeight);

                    // Get an array of all element heights
                    elementHeights = dis.find('.j-equal5').map(function() {
                        return $(this).outerHeight();
                    }).get();
                    // Math.max takes a variable number of arguments
                    // `apply` is equivalent to passing each height as an argument
                    maxHeight = Math.max.apply(null, elementHeights);
                    // Set each height to the max height
                    dis.find('.j-equal5').css('height',maxHeight);

                    // Get an array of all element heights
                    elementHeights = dis.find('.j-equal6').map(function() {
                        return $(this).outerHeight();
                    }).get();
                    // Math.max takes a variable number of arguments
                    // `apply` is equivalent to passing each height as an argument
                    maxHeight = Math.max.apply(null, elementHeights);
                    // Set each height to the max height
                    dis.find('.j-equal6').css('height',maxHeight);
                });
             }

        switch_contents();
    }

    // S W I T C H E D  C O N T E N T S  C O M P O N E N T
    function switch_contents(){
        if($(window).width() >= 768 && $(window).width() <= 991){
            $('.switch-contents-xs').each(function(){
                $(this).find('.switch[data-order="first"]').insertBefore($(this).find('.switch[data-order="second"]'));
            });
            $('.switch-contents-sm').each(function(){
                $(this).find('.switch[data-order="first"]').insertAfter($(this).find('.switch[data-order="second"]'));
            });
        }
        if($(window).width() <= 767){
            $('.switch-contents-sm').each(function(){
                $(this).find('.switch[data-order="first"]').insertBefore($(this).find('.switch[data-order="second"]'));
            });
            $('.switch-contents-xs').each(function(){
                $(this).find('.switch[data-order="first"]').insertAfter($(this).find('.switch[data-order="second"]'));
            });
        }
        if($(window).width() >= 992){
            $('.switch-contents-sm,.switch-contents-xs').each(function(){
                $(this).find('.switch[data-order="first"]').insertBefore($(this).find('.switch[data-order="second"]'));
            });
        }
    }

    // B O X  S L I D E R
    $(function(){
        $('.box-slider .slide .item').each(function(){
            $(this).css('background-image','url('+$(this).find('img').attr('src')+')');
        });
        $('.box.image-box').each(function(){
            $(this).css( 'background', ' linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45) ),url('+$(this).find('img.background-image').attr('src')+')');
        });

        $('.box.image-box').hover(function(){
            $(this).css( 'background', ' linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) ),url('+$(this).find('img.background-image').attr('src')+')'); 
        },function(){
            $(this).css( 'background', ' linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45) ),url('+$(this).find('img.background-image').attr('src')+')');
        });
    });

    /* ------------------------------------------------------------ */
    /*                 C O N T E N T  L O A D E R                   */
    /* ------------------------------------------------------------ */
    $(function(){
        $('.content-loader').each(function(){
            $(this).css('height',$(this).attr('data-height')+'px');
            $(this).html('<div class="spinner3"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>');
        });

    });

}else{

    console.log('jQuery is required');

}