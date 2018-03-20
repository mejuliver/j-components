
/* 
    J - C O M P O N E N T S  H E L P E R S
--------------------------------------------------------------------    

*/

if ('undefined' == typeof window.jQuery) {
    return;
}


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
*/
function get_page(link = false,dependencies = false,container = false,spinner = false,data = false){

    $.ajax({
        url : app_url + '/ajax-page',
        type : 'get',
        context: this,
        dataType : 'html',
        beforeSend: function(){j_spinner("on");},
        complete: function(){j_spinner("off");},
        success : function(data) {
            $(container).html(data);
            _runner(dependencies);
        }
    });
}
//create a notification. To use, j_notification("[specift the content]", "[specify if autohide]", "[specify if yes or no]")
function j_notification(data, auto_hide, hide){
    if(auto_hide !== "yes"){
        if($("#j-notification-dialog").length){
            $("#j-notification-dialog").html(data);
            $("#j-notification-dialog").show();
        }else{
            $("body").append('<div class="animated slideInRight shadow-z-1" id="j-notification-dialog">' + data + '</div>'); 
            $("#j-notification-dialog").show();
        }
        if(hide === "yes"){
            $("#j-notification-dialog").delay(3000).fadeOut(500);
        }
    }else{
        if($("#j-notification-dialog").length){
            $("#j-notification-dialog").html(data);
            $("#j-notification-dialog").show();
            // $("body").append('<div class="animated slideInRight shadow-z-1" id="j-notification-dialog" style="display:table;top:'+$("#j-notification-dialog:first-child").offset().top+30+'px">' + data + '</div>'); 
        }else{
            $("body").append('<div class="animated slideInRight shadow-z-1" id="j-notification-dialog">' + data + '</div>'); 
            $("#j-notification-dialog").show();
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