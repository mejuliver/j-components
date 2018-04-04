
if ('undefined' == typeof window.jQuery) {
    return;
}
(function($){

    $.fn.j_limittext = function ( options ) {

        var settings = $.extend({
            limit : 50,
            crop : 10
            }, options );

        this.each(function(){
	       if(crop !== 0){
	        var txt= $(this).text();
	        if(txt.length > limit){
	            $(this).text(txt.substring(0,crop) + '.....');
	        }
	        }else{
	            $(this).text($(this).text().substring(0,crop) + '.....');
	        } 
	    });

	    return this;

    }
})(jQuery);