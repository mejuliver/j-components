
/* 
    J - C O M P O N E N T S
--------------------------------------------------------------------    

*/

if ('undefined' == typeof window.jQuery) {
    return;
}

/* 
    L I M I T  T E X T
    ----------------------------------------------------
    limit the text from the target element, to use limitText("[element class or ID]", [minimum text], [maximum text])
*/
function limitText(el, limit, crop){
    $(el).each(function(){
       if(crop !== 0){
        var txt= $(this).text();
        if(txt.length > limit){
            $(this).text(txt.substring(0,crop) + '.....');
        }
        }else{
            $(this).text($(this).text().substring(0,crop) + '.....');
        } 
    });
}

/* J  S H A D O W
   ----------------------------------------------------
   Create a dropshadow effect to an element, to use, j_shadow(el, shadow_color, shadow_length, shadow_position)
*/
function j_shadow(el, shadow_color, shadow_length, shadow_position){
    //required longshadow js
    $(el).longShadow({
        colorShadow: shadow_color,
        sizeShadow: shadow_length,
        directionShadow: shadow_position
    });
}


/* 
    M O D A L 
    ----------------------------------------------------
    Uses twitter bootstrap modal component, to use, modal( [your modal title], [your modal content], [functions to be run when modal function is invoke, separate by space if multiple ] )

    call : modal( title, contents, footer )
*/

function modal(title, content, dependencies,footer = false){
    modal_open = true;
    // check if modal elements was created, if not then create it
    if( $('#modal-button').length === 0 && $('#modal-container').length === 0 ){
        $(body).append( '<button id="modal-button" data-toggle="modal" data-target="#modal-container" style="display:none;">Launch modal</button><div class="modal fade" id="modal-container" tabindex="-1" role="dialog" aria-labelledby="modal-container-label" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content" style="box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);"> <div class="modal-header"> <h5 class="modal-title" id="modal-container-label"></h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div><div class="modal-body"> </div></div></div></div>');
    }
    //required materialize
    $("#modal-container .modal-title").html(title);
    $("#modal-container .modal-body").html(content);
    if(footer !== false){
        $('#modal-container .modal-body').after('<div class="modal-footer">'+footer+'</div>');
    }
    $("#modal-button").trigger("click");
    _runner(dependencies);
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
/* 
    F U N C T I O N (s)  R U N N E R 
    ----------------------------------------------------
    Run single/multiple functions

    call : _runner(function1 function2 function3)
    note : if multiple, separate with spaces
*/
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
$(document).ready(function(){

    //add animation to the element that has a class of .line-animation
    var this_previous_delay;
    $(".parent .line-animation").each(function(){
        var this_delay;

        if(!$(this).is(":first-child")){
                this_delay = this_previous_delay + 300;
                this_previous_delay = this_delay;
                this_delay = this_delay.toString() + "ms";
        }else{
            this_delay = $(this).index() + 300;
            this_previous_delay = this_delay;
            this_delay = this_delay.toString() + "ms";
        } //end of checking if not first-child
        
        $(this).css('-webkit-transition-delay', this_delay )
           .css('-moz-transition-delay', this_delay)
           .css('-ms-transition-delay', this_delay)
           .css('-o-transition-delay', this_delay)
           .css('transition-delay', this_delay);

    }); //end of looping unto the top_submenu li
    //end of .line-animation

});
    

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