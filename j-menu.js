
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
    $(document).on("click", '.j-component[data-type="menu"] .menu-holder > li > a', function(e) {
        // variables
        var dis = $(this),
            parent_el = dis.closest('.j-component'),
            run_before = dis.attr("data-run-before"),
            run_after = parent_el.attr("data-run-after");
            
        dis.closest('.menu-holder').find('.active').removeClass('active');

        if (typeof dis.attr('href') === typeof undefined || dis.attr('href') !== '#' || dis.attr('href') === ''){
            e.preventDefault();
        }

        // run this function before component invoke the hide tab event
        if (typeof run_before !== typeof undefined && run_before !== false && run_before !== "") {
            var classList = run_before.split(/\s+/);
            $.each(classList, function(index, item) {
                window[item]();
            });
        }
        if (dis.next('ul').length && !dis.next('ul').hasClass('hover')) {

            var dp = dis.next();

            if (!parent_el.find('li > ul:visible').hasClass('custom')) {
                parent_el.find('li > ul:visible').fadeOut(400);
            }

            if (!dp.hasClass('custom')) {
                dp.fadeIn(400);
            }
            
        }

        //if tabs
        if (parent_el.hasClass('tab') && !dis.next('ul').length) {
            // ------- hide tab
            // component does not consist of class custom then invoke the default tab event
            if (!parent_el.find('.tab-container .tab.active').hasClass('custom')) {
               parent_el.find('.tab-container .tab.active').hide();

            }
            // remove the active class
            parent_el.find('.tab-container .tab.active').removeClass('active');

            // ------- show tab
            // component does not consist of class custom then invoke the default tab event
            if (!parent_el.find('.tab-container .tab[data-tab="'+dis.attr('data-tab')+'"]').hasClass('custom')) {
                parent_el.find('.tab-container .tab[data-tab="'+dis.attr('data-tab')+'"]').fadeIn(400);
            }
            
            parent_el.find('.tab-container .tab[data-tab="'+dis.attr('data-tab')+'"]').addClass('active');


        }
        
        dis.closest('li').addClass('active');

        if (typeof run_after !== typeof undefined && run_after !== false && run_after !== "") {
            var classList = run_before.split(/\s+/);
            $.each(classList, function(index, item) {
                window[item]();
            });
        }

    });

    //event click j menu listener
    $(document).on("mousedown touchstart", function(e) {
        var dp = $('.j-component[data-type="menu"] .menu-holder li > ul:visible');
        if (!dp.is(e.target) && dp.has(e.target).length === 0) {
            if (!$('.j-component[data-type="menu"] .menu-holder li > ul:visible').hasClass('custom')) {
                $('.j-component[data-type="menu"] .menu-holder li > ul:visible').fadeOut(400);
            }

            var run_before = $('.j-component[data-type="menu"] .menu-holder li.active a').attr('data-run-before')

            // run this function before component invoke the hide tab event
            if (typeof run_before !== typeof undefined && run_before !== false && run_before !== "") {
                var classList = run_before.split(/\s+/);
                $.each(classList, function(index, item) {
                    window[item]();
                });
            }

            $('.j-component[data-type="menu"] .menu-holder li.active').removeClass('active');
        }
    });
});
