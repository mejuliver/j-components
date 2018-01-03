
/* 
    J - M E N U
--------------------------------------------------------------------    
    O P T I O N S
    
    
    S T R U C T U R E ( ':' => data-type )

        .j-component:menu
                .menu-holder
                    anchor tag <a>
                        -       


*/


$(function(){
	//j menu
    
    $(document).on("click", '.j-component[data-type="menu"] .menu-holder > a', function(e){
        e.preventDefault();

        var dis = $(this),
            parent =  dis.closest('.j-component'),
            class_hide = false,
            class_show = false;
        //remove class and add class active
        dis.closest('.menu-holder').find('.active').removeclass('active');
        dis.closest('li').addClass('active');
        //if tabs
        if(dis.hasClass('tabs')){
            if( !class_hide && typeof $( dis.attr("href") ).attr('data-hide') !== typeof undefined && $( dis.attr("href") ).attr('data-hide') !== '' ){
                window[$.trim( $( dis.attr("href") ).attr('data-hide') ).replace(' ','')](e);
                class_hide = true;
            }

            if( !class_show && typeof $( dis.attr("href") ).attr('data-show') !== typeof undefined && $( dis.attr("href") ).attr('data-hide') !== '' ){
                window[$.trim( $( dis.attr("href") ).attr('data-show') ).replace(' ','')]();
                class_show = true;
            }
            
            dis.closest('.j-component').find('.tab-contents').hide();
            $(dis.attr("href")).addClass("active").fadeIn(200);

            var run_before = dis.attr("data-run-before");
            if(typeof run_before !== typeof undefined && run_before !== false && run_before !== "") {
                var classList = run_before.split(/\s+/);
                $.each(classList, function(index, item) {
                  window[item]();
                });
            }

            var run_after = parent.attr("data-run-after");
            if(typeof run_after !== typeof undefined && run_after !== false && run_after !== "") {
                var classList = run_before.split(/\s+/);
                $.each(classList, function(index, item) {
                  window[item]();
                });
            }
            checkwidth();

        
            return;
        }

        if( typeof $( dis.attr("href") ).attr('data-hide') !== typeof undefined && $( dis.attr("href") ).attr('data-hide') !== '' ){
            window[$.trim( $( dis.attr("href") ).attr('data-hide') ).replace(' ','')]();
        }else{

            if(parent.hasClass('fadeOut')){
                parent.find('.submenu').fadeOut(500);
            }
            if(parent.hasClass('fadeOutQuick')){
                parent.find('.submenu').fadeOut(200);
            }
            if(parent.hasClass('s')){
                parent.find('.submenu').fadeOut(500);
            }

            
        }


        //if there's a submenu
        if(dis.attr("data-has-submenu") === "yes"){
            if(dis.next(".j-menu-dp-container").is(":visible")){
                dis.next(".j-menu-dp-container").fadeOut(200);

                //run data-on-close function on close event of dropdown menu
                var on_close = dis.attr("data-on-close");
                if(typeof on_close !== typeof undefined && on_close !== false && on_close !== "") {
                    var classList = on_close.split(/\s+/);
                    $.each(classList, function(index, item) {
                      window[item]();
                    });
                }
                
            }else{
                dis.next(".j-menu-dp-container").css({ 'display': 'table','min-width' : dis.closest("li").width() + 'px' }).fadeIn(200);
                if(dis.next(".j-menu-dp-container").offset().left+(dis.next(".j-menu-dp-container").width()*1) > $(window).width()){
                    dis.next(".j-menu-dp-container").css({ 'margin-left' : "-110px" });
                }

                //run data-on-close function on close event of dropdown menu
                var on_open = dis.attr("data-on-open");
                if(typeof on_open !== typeof undefined && on_open !== false && on_open !== "") {
                    var classList = on_open.split(/\s+/);
                    $.each(classList, function(index, item) {
                      window[item]();
                    });
                }
            }
            if(dis.next(".j-menu-dp-container").height() >= 400){
                dis.next(".j-menu-dp-container").css({ 'height' : '300px' });
            }
        }else{
            if(!dis.hasClass("dont-hide")){
                $(".top-submenu").hide();
                $($(this).attr("data-has-submenu")).show().find("li").show();
            }
        } // end of else if sub-menu is not equal to yes
        if(dis.attr("data-navigate") !== "yes"){
            e.preventDefault();
        }
    });
    //menu mouseover
    $(document).on("mouseover", ".j-components .j-menu .j-menu-nav a", function(e){
        var dis = $(this);
        if(dis.attr("data-allow-hover") === "yes"){
        dis.closest(".j-menu-nav").find(".parent").removeClass("j-active-state");
        dis.addClass("j-active-state");
        }
    }).on("mouseleave", ".j-menu .j-menu-nav a", function(){
        var dis = $(this);
        dis.removeClass("j-active-state");
        dis.closest(".j-menu-nav").find(".j-active").addClass("j-active-state");
    });

    //when click on the menu's dropdown
    $(document).on("click", ".j-menu-dp-container li a", function(e){
            var dis = $(this);
            if(dis.closest(".j-menu-dp-container").attr("data-allow-menureplace") === "yes"){
              dis.closest(".j-menu-dp-container").prev(".parent").find(".j-text").text(dis.text());
            }
            if(dis.closest(".j-menu-dp-container").attr("data-allow-menuhide") === "yes" ){
                if(!dis.next().hasClass("j-menu-dp-container")){
                    dis.closest(".j-menu-dp-container").fadeOut(200); 
                }
            }
            if(dis.closest(".j-menu-dp-container").attr("data-submenu-allowactive") === "yes" ){
                 dis.closest(".j-menu-nav").find(".parent").removeClass("j-active j-active-state");
                 dis.closest(".j-menu-dp-container").prev(".parent").addClass("j-active j-active-state");
            }
    });
    //event click j menu listener
    $(document).on("mousedown touchstart",function (e) {    
        var calendar = $(".dtp-content"),j_dp = $(".j-menu-dp-container");
        if (!j_dp.is(e.target) && calendar.has(e.target).length === 0 && j_dp.has(e.target).length === 0) {
            j_dp.stop(true).fadeOut(200);
            //run data-on-close function on close event of dropdown menu
            var on_close = $(".j-menu-dp-container:visible").prev('a[data-has-submenu="yes"]').attr("data-on-close");
            if(typeof on_close !== typeof undefined && on_close !== false && on_close !== "") {
                var classList = on_close.split(/\s+/);
                $.each(classList, function(index, item) {
                  window[item]();
                });
            }
        }
    });
});

$(window).resize(function(){
    $(".j-menu-dp-container").hide();
});