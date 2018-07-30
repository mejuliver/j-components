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

        call : get_page(url, before_send, after_send, complete, on_error);

        note : if no 'link' provided then assume uses the current link
        note : if you want too invoke a function after ajax was successful then add function name which to be called later in the 2nd argument of the function
        note : if no container then post some logs on the console
        note : if no spinner supplied then default spinner will be use instead


    */
    function get_page(url,before_send,after_send,onsuccess,on_error){

        $.ajax({
            url : app_url + '/ajax-page',
            type : 'get',
            context: this,
            dataType : 'html',
            beforeSend: function(){
                if(typeof before_send !== typeof undefined && before_send !== false && before_send !== "") {
                    var classList = before_send.split(/\s+/);
                    $.each(classList, function(index, item) {
                        window[item]();   
                    });
                }
            },
            complete: function(){
                if(typeof after_send !== typeof undefined && after_send !== false && after_send !== "") {
                    var classList = after_send.split(/\s+/);
                    $.each(classList, function(index, item) {
                        window[item]();   
                    });
                }
            },
            success : function(e) {
                if(typeof onsuccess !== typeof undefined && onsuccess !== false && onsuccess !== "") {
                    window[onsuccess](e);   
                }
            },
            error: function(type,status,error){
                if(typeof on_error !== typeof undefined && on_error !== false && on_error !== "") {
                   window[on_error](type,status,error);
                }
            }
        });
    }
    /* 
        S L I D E  N O T I F I C A T I O N
        ----------------------------------------------------
        Material slide

        call : notification( contents, auto_hide true|false, mode on|off)

    */
    function toast_notif(e){
        if( $('#toast-notif').length == 0 ){
            $('body').append('<div id="toast-notif"></div>');
        }
        $('#toast-notif').html(e);

        // center taost
        $('#toast-notif').css("left", ( $(window).width() - $('#toast-notif').width() ) / 2 + "px");

        var $timer = setTimeout(function(){
            if( !$('#toast-notif').hasClass('.active')){
                $('#toast-notif').removeClass('active').hide();
            }
            
        }, 5000);

        if( !$('#toast-notif').is(':visible') ){
            $('#toast-notif').show();
        }else{
            $('#toast-notif').addClass('active');
            clearTimeout($timer);
        }
    }   

    $(window).on('load', function(){
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
        //give width to elements that has a class of ".fixed-child" equals to the parent reference element width that has a class of ".fixed-parent"
        $(".fixed-child").each(function(){
            $(this).css({ 'width' : $(this).closest(".fixed-parent").width() + 'px' });
        });
        //give height to the elements that has a class of ".fixed-parent" equals to its first child element height that has a class of ".fixed-child"
        $(".fixed-parent").each(function(){
             $(this).css({ 'height' : $(this).find(".fixed-child:first-child").innerHeight() + 'px' });
        });
        j_equal();
    }


    // R A N D O M  S T R I N G
    function random_str() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 5; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return text;
    }

     function modal(title, content, dependencies,footer){

        // check if already theres a modal wrapper
        if( $('#modal-container').length == 0 ){
            $('body').append( '<button id="modal-button" data-toggle="modal" data-target="#modal-container" style="display:none;">Launch modal</button><div class="modal fade" id="modal-container" tabindex="-1" role="dialog" aria-labelledby="modal-container-label" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content" style="box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);"> <div class="modal-header"> <h5 class="modal-title" id="modal-container-label"></h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div><div class="modal-body"> </div></div></div></div>');
        }
        modal_open = true;
        // check if modal elements was created, if not then create it
        
        //required materialize
        $("#modal-container .modal-title").html(title);
        $("#modal-container .modal-body").html(content);
        if(typeof footer !== typeof undefined && footer !== '' && footer !== false){
            $('#modal-container .modal-body').after('<div class="modal-footer">'+footer+'</div>');
        }
        $("#modal-button").trigger("click");
        if(typeof dependencies !== typeof undefined && dependencies !== '' && dependencies !== false){
            _runner(dependencies);
        }
    }
    // remove all created on show instances when modal is completely hidden
    $('#modal-container').on('hidden.bs.modal',function(e) {
         //required materialize
        $('#modal-container .modal-title').html('');
        $('#modal-container .modal-body').html('');
        $('#modal-container .modal-dialog')
            .removeClass('modal-sm modal-lg')
            .find('.modal-footer').remove();
    });

    function spinner(status,spinner){
       if(status==="on"){
            switch(spinner){
                case 1 :
                    $("body").append('<div style="position:fixed;z-index:9998;background:rgba(255,255,255,0.5);width:100%;height:100vh;top:0px;right:0px;" id="spinner-wrapper"></div><div class=" display-table animated zoomIn" style="position:fixed;z-index:9999;-webkit-animation-duration: 450ms;animation-duration: 450ms;" id="spinner"><div class="spinner1"></div></div>');
                    break;
                case 2 :
                    $("body").append('<div style="position:fixed;z-index:9998;background:rgba(255,255,255,0.5);width:100%;height:100vh;top:0px;right:0px;" id="spinner-wrapper"></div><div class=" display-table animated zoomIn" style="position:fixed;z-index:9999;-webkit-animation-duration: 450ms;animation-duration: 450ms;" id="spinner"><div class="spinner2"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div>');
                    break;
                case 3 :
                    $("body").append('<div style="position:fixed;z-index:9998;background:rgba(255,255,255,0.5);width:100%;height:100vh;top:0px;right:0px;" id="spinner-wrapper"></div><div class=" display-table animated zoomIn" style="position:fixed;z-index:9999;-webkit-animation-duration: 450ms;animation-duration: 450ms;" id="spinner"><div class="spinner3"><div class="cube1"></div><div class="cube2"></div></div></div>');
                    break;
                case 4 :
                    $("body").append('<div style="position:fixed;z-index:9998;background:rgba(255,255,255,0.5);width:100%;height:100vh;top:0px;right:0px;" id="spinner-wrapper"></div><div class=" display-table animated zoomIn" style="position:fixed;z-index:9999;-webkit-animation-duration: 450ms;animation-duration: 450ms;" id="spinner"><div class="spinner4"></div></div>');
                    break;
                case 5 :
                    $("body").append('<div style="position:fixed;z-index:9998;background:rgba(255,255,255,0.5);width:100%;height:100vh;top:0px;right:0px;" id="spinner-wrapper"></div><div class=" display-table animated zoomIn" style="position:fixed;z-index:9999;-webkit-animation-duration: 450ms;animation-duration: 450ms;" id="spinner"><div class="spinner5"><div class="dot1"></div><div class="dot2"></div></div></div>');
                    break;
                case 6 :
                    $("body").append('<div style="position:fixed;z-index:9998;background:rgba(255,255,255,0.5);width:100%;height:100vh;top:0px;right:0px;" id="spinner-wrapper"></div><div class=" display-table animated zoomIn" style="position:fixed;z-index:9999;-webkit-animation-duration: 450ms;animation-duration: 450ms;" id="spinner"><div class="spinner6"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>');
                    break;
                case 7 :
                    $("body").append('<div style="position:fixed;z-index:9998;background:rgba(255,255,255,0.5);width:100%;height:100vh;top:0px;right:0px;" id="spinner-wrapper"></div><div class=" display-table animated zoomIn" style="position:fixed;z-index:9999;-webkit-animation-duration: 450ms;animation-duration: 450ms;" id="spinner"><div class="spinner7"><div class="sk-circle1 sk-child"></div><div class="sk-circle2 sk-child"></div><div class="sk-circle3 sk-child"></div><div class="sk-circle4 sk-child"></div><div class="sk-circle5 sk-child"></div><div class="sk-circle6 sk-child"></div><div class="sk-circle7 sk-child"></div><div class="sk-circle8 sk-child"></div><div class="sk-circle9 sk-child"></div><div class="sk-circle10 sk-child"></div><div class="sk-circle11 sk-child"></div><div class="sk-circle12 sk-child"></div></div></div>');
                    break;
                case 8 :
                    $("body").append('<div style="position:fixed;z-index:9998;background:rgba(255,255,255,0.5);width:100%;height:100vh;top:0px;right:0px;" id="spinner-wrapper"></div><div class=" display-table animated zoomIn" style="position:fixed;z-index:9999;-webkit-animation-duration: 450ms;animation-duration: 450ms;" id="spinner"><div class="spinner8"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div><div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div></div>');
                    break;
                case 9 :
                    $("body").append('<div style="position:fixed;z-index:9998;background:rgba(255,255,255,0.5);width:100%;height:100vh;top:0px;right:0px;" id="spinner-wrapper"></div><div class=" display-table animated zoomIn" style="position:fixed;z-index:9999;-webkit-animation-duration: 450ms;animation-duration: 450ms;" id="spinner"><div class="spinner9"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div></div>');
                    break;
                case 10 :
                    $("body").append('<div style="position:fixed;z-index:9998;background:rgba(255,255,255,0.5);width:100%;height:100vh;top:0px;right:0px;" id="spinner-wrapper"></div><div class=" display-table animated zoomIn" style="position:fixed;z-index:9999;-webkit-animation-duration: 450ms;animation-duration: 450ms;" id="spinner"><div class="spinner10"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div></div>');
                    break;
                default :
                    $("body").append('<div style="position:fixed;z-index:9998;background:rgba(255,255,255,0.5);width:100%;height:100vh;top:0px;right:0px;" id="spinner-wrapper"></div><div class="display-table animated zoomIn" style="position:fixed;z-index:9999;-webkit-animation-duration: 450ms;animation-duration: 450ms;" id="spinner"><div class="spinner11"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div></div>');
            }
            $('#spinner').css({
                "top" : ( $(window).height() - $('#spinner').height() ) / 2  + "px",
                "left" : ( $(window).width() - $('#spinner').width() ) / 2 + "px"
            }).show();
            $('body').addClass('disabled');
       }else{
            $('#spinner').fadeOut(400,function(){
                $('#spinner').remove();
            });
            $('#spinner-wrapper').remove();
            $('body').removeClass('disabled');
       }
    }

    // J - E Q U A L  C O M P O N E N T
    function j_equal(){

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
        $('.box.image-box').each(function(){
            if( typeof $(this).attr('data-overlay') != typeof undefined && $(this).attr('data-overlay') != '' ){
                if( $(this).hasClass('img-gradient') ){
                    $(this).css( 'background', 'linear-gradient('+$(this).attr('data-overlay')+', '+$(this).attr('data-overlay')+' ),url('+$(this).find('img.background-image').attr('src')+')'); 
                }else{
                    $(this).css( 'background', 'url('+$(this).find('img.background-image').attr('src')+')'); 
                }
            }else{
                if( $(this).hasClass('img-gradient') ){
                    $(this).css( 'background', 'linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45) ),url('+$(this).find('img.background-image').attr('src')+')');
                } else {
                    $(this).css( 'background', 'url('+$(this).find('img.background-image').attr('src')+')');
                }
            }

            if( typeof $(this).attr('data-height') !== typeof undefined ){
                $(this).css( 'height', $(this).attr('data-height') );
            }
            if( $(this).hasClass('cover') ){
                $(this).css('background-size','cover');
            }
        });

        $('.box.image-box').hover(function(){
            if( !$(this).hasClass('no-hover') ){
                if( typeof $(this).attr('data-hover-overlay') != typeof undefined && $(this).attr('data-hover-overlay') != '' ){
                    if( $(this).hasClass('img-gradient') ){
                        $(this).css( 'background', 'linear-gradient('+$(this).attr('data-hover-overlay')+', '+$(this).attr('data-hover-overlay')+' ),url('+$(this).find('img.background-image').attr('src')+')');
                    }else{
                        $(this).css( 'background-image', 'url('+$(this).find('img.background-image').attr('src')+')');
                    }
                }else{
                    if( $(this).hasClass('img-gradient') ){
                        $(this).css( 'background', 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) ),url('+$(this).find('img.background-image').attr('src')+')'); 
                    }else{
                        $(this).css( 'background', 'url('+$(this).find('img.background-image').attr('src')+')'); 
                    }
                }
            }
            if( $(this).hasClass('cover') ){
                $(this).css('background-size','cover');
            }
            if( typeof $(this).attr('data-on-hover') != typeof undefined && $(this).attr('data-on-hover') != '' ){
                window[$(this).attr('data-on-hover')]($(this));
            }
        },function(){
           
            if( typeof $(this).attr('data-overlay') != typeof undefined && $(this).attr('data-overlay') != '' ){
                if( $(this).hasClass('img-gradient') ){
                    $(this).css( 'background', 'linear-gradient('+$(this).attr('data-overlay')+', '+$(this).attr('data-overlay')+' ),url('+$(this).find('img.background-image').attr('src')+')'); 
                }else{
                    $(this).css( 'background', 'url('+$(this).find('img.background-image').attr('src')+')'); 
                }
            }else{
                if( $(this).hasClass('img-gradient') ){
                    $(this).css( 'background', 'linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45) ),url('+$(this).find('img.background-image').attr('src')+')');
                } else {
                    $(this).css( 'background', 'url('+$(this).find('img.background-image').attr('src')+')');
                }
            }

            if( typeof $(this).attr('data-height') !== typeof undefined ){
                $(this).css( 'height', $(this).attr('data-height') );
            }
            if( $(this).hasClass('cover') ){
                $(this).css('background-size','cover');
            }
            if( typeof $(this).attr('data-off-hover') != typeof undefined && $(this).attr('data-off-hover') != '' ){
                window[$(this).attr('data-off-hover')]($(this));
            }

        });
    });

    $(window).on('load',function(e){
        $('.box.image-box.auto-height').each(function(){
            $(this).css('height',$(this).find('img.background-image').height()+'px');
        });
    });

    /* ------------------------------------------------------------ */
    /*                 C O N T E N T  L O A D E R                   */
    /* ------------------------------------------------------------ */
    $(function(){
        $('.content-loader').each(function(){
            $(this).css('height',$(this).attr('data-height')+'px');
            $(this).html('<div class="spinner11"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>');
        });

    });

}else{

    console.log('jQuery is required');

}