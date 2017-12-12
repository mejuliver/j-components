
/* 
    J - M E N U
--------------------------------------------------------------------    
    O P T I O N S
    
    
    S T R U C T U R E

        j-components
            .j-menu
                .j-menu-nav
                    anchor tag <a>
                        -> data-allow-active:       


*/


$(function(){
	//j menu
    
    $(document).on("click", ".j-components .j-menu .j-menu-nav a", function(e){
        var dis = $(this);
        //if allowed to set an active state and active indentifier
        if(typeof dis.attr("data-allow-active") !== typeof undefined && dis.attr("data-allow-active") === "yes"){
            if(typeof dis.attr("data-has-submenu") !==  "no" || !dis.attr("data-has-submenu") || dis.attr("data-submenu-allowactive") === "yes"){
                dis.closest(".j-menu-nav").find(".parent").removeClass("j-active j-active-state");
                dis.addClass("j-active j-active-state");
            }
        }
        //if tabs
        if(dis.attr("data-tabs") === "yes"){
            $("#"+dis.closest(".j-menu-nav").attr("data-tabs-container")+" > .j_tabs").removeClass("active-tab").hide();
            $("#"+dis.closest('[data-tabs-container]').attr("data-tabs-container")+" "+dis.attr("href")).addClass("active-tab").fadeIn(200);
            var custom_function = dis.attr("data-monkey-run");
            if(typeof custom_function !== typeof undefined && custom_function !== false && custom_function !== "") {
                var classList = custom_function.split(/\s+/);
                $.each(classList, function(index, item) {
                  window[item]();
                });
            }
            checkwidth();

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