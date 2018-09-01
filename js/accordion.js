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
    
    $.fn.accordion = function ( options ) {

        var settings = $.extend({
            collapse_all : false
        }, options );


        var $this_global = this;

        this.each(function(e){
            var $this = $(this);

            $this.find('.accordion .content').hide();
            if( $this.find('.accordion.active').length > 0 ){
                $this.find('.accordion.active .content').show();
            }else{
                $this.find('.accordion:first-child').addClass('active').find('.content').show();
            }
            $this.find('.accordion .title').click(function(){
                var $parent = $(this).closest('.accordion');
                var $content = $(this).next('.content');
                if( settings.collapse_all ){
                    if( $content.is(':visible') ){
                        $(this).next('.content').slideUp(500);
                    }else{
                        $(this).next('.content').slideDown(500);
                    }

                }else{
                    $this.find('.accordion.active .content').slideUp(400);
                    if( $content.is(':visible') ){
                        $(this).next('.content').slideUp(500);
                    }else{
                        $(this).next('.content').slideDown(500);
                    }
                }
                $this.find('.accordion.active').removeClass('active');
                $parent.addClass('active');

            });
        });
    }
}
