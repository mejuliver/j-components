
if ('undefined' != typeof window.jQuery) {
    $.fn.limittext = function ( options ) {

        var settings = $.extend({
            limit : 50,
            crop : 10
            }, options );

        this.each(function(){
	       if(settings.crop !== 0){
	        var txt= $(this).text();
	        if(txt.length > settings.limit){
	            $(this).text(txt.substring(0,settings.crop) + '.....');
	        }
	        }else{
	            $(this).text($(this).text().substring(0,settings.crop) + '.....');
	        } 
	    });

	    return this;

    }
}
