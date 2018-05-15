if ('undefined' != typeof window.jQuery ) {
    /* 
        J - M E N U
    --------------------------------------------------------------------    
        O P T I O N S
        
        
        S T R U C T U R E ( ':' => data-type )

            .j-component:[data-type*="menu"]
                    .menu-holder
                        anchor tag <a>
                            li
                                a::tab[data-tab=" -- tab id, class -- "]
                                > ul::submenu


    */


    (function($){

        $.fn.j_menu = function ( options ) {

            this.find('.j-component[data-type*="menu"] .menu-holder > li > a').on('click', function(e) {
                // variables
                var $this = $(this),
                    parent_el = $this.closest('.j-component'),
                    parent_tab = $this.closest('.j-component[data-type*="tab"]'),
                    run_before = $this.attr("data-run-before"),
                    run_after = parent_el.attr("data-run-after");
                    
                $this.closest('.menu-holder').find('.active').removeClass('active');
                
                $this.closest('li').addClass('active');

                if (typeof $this.attr('href') === typeof undefined || $this.attr('href') !== '#' || $this.attr('href') === ''){
                    e.preventDefault();
                }

                // run this function before component invoke the hide tab event
                if (typeof run_before !== typeof undefined && run_before !== false && run_before !== "") {
                    var classList = run_before.split(/\s+/);
                    $.each(classList, function(index, item) {
                        window[item]();
                    });
                }
                if ( $this.next('ul').length !== 0 && !$this.next('ul').hasClass('hover') ) {
                    var dp = $this.next();
                            
                    if (!parent_el.find('li > ul').is(':visible') && !parent_el.find('li > ul:visible').hasClass('custom')) {
                    
                        if (!dp.hasClass('custom')) {
                          dp.fadeIn(400);
                        }
                    }else{
                        parent_el.find('li > ul:visible').fadeOut(400);
                    }        
                } 


                //if tabs
                if (parent_tab.length !== 0 && typeof $this.attr('data-tab') !== typeof undefined && $this.attr('data-tab') !== '' && $this.attr('data-tab') !== 'false' ) {
                    // ------- hide tab
                    // component does not consist of class custom then invoke the default tab event
                    if ( parent_el.find('.tab-container .tab.active').attr('data-tab') !== $this.attr('data-tab') && !parent_el.find('.tab-container .tab.active').hasClass('custom')) {
                       parent_el.find('.tab-container .tab.active').hide();

                    }
                    // remove the active class
                    parent_el.find('.tab-container .tab.active').removeClass('active');

                    // ------- show tab
                    // component does not consist of class custom then invoke the default tab event
                    if ( parent_el.find('.tab-container .tab.active').attr('data-tab') !== $this.attr('data-tab') && !parent_el.find('.tab-container .tab[data-tab="'+$this.attr('data-tab')+'"]').hasClass('custom')) {
                        parent_el.find('.tab-container .tab[data-tab="'+$this.attr('data-tab')+'"]').fadeIn(400);
                    }
                    
                    parent_el.find('.tab-container .tab[data-tab="'+$this.attr('data-tab')+'"]').addClass('active');


                }
                

                if (typeof run_after !== typeof undefined && run_after !== false && run_after !== "") {
                    var classList = run_before.split(/\s+/);
                    $.each(classList, function(index, item) {
                        window[item]();
                    });
                }

            });

            // on click on submenu
            this.find('.j-component[data-type*="menu"] .menu-holder > li > ul li a').on('click', function(e) {
                if( !$(this).hasClass('.reject') ){
                    $(this).closest('ul').prev('a').trigger('click');
                }
            });

            // on click on submenu
            this.find('.j-component[data-type*="menu-hover"] .menu-holder > li > a').on('mouseOver', function(e) {
                $(this).trigger('click');
            },function(){
                $(this).trigger('click');
            });

            //event click j menu listener
            $(document).on("mousedown touchstart", function(e) {
                var dp = $('.j-component[data-type*="menu"] .menu-holder li > ul:visible');
                if (!dp.is(e.target) && dp.has(e.target).length === 0) {
                    if (!$('.j-component[data-type*="menu"] .menu-holder li > ul:visible').hasClass('custom')) {
                        $('.j-component[data-type*="menu"] .menu-holder li > ul:visible').fadeOut(400);
                    }

                    var run_before = $('.j-component[data-type*="menu"] .menu-holder li.active a').attr('data-run-before')

                    // run this function before component invoke the hide tab event
                    if (typeof run_before !== typeof undefined && run_before !== false && run_before !== "") {
                        var classList = run_before.split(/\s+/);
                        $.each(classList, function(index, item) {
                            window[item]();
                        });
                    }

                    $('.j-component[data-type*="menu"] .menu-holder li.active').removeClass('active');
                }
            });

            return this;
        }
    })(jQuery);
}else{

    console.log('jQuery is required');

}
