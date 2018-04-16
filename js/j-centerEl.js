if ('undefined' != typeof window.jQuery ) {

	/* 
	    C E N T E R  E L E M E N T
	    ----------------------------------------------------
	    Center element, to use, $(el).center( [ options ] );
	*/
	$.fn.center = function ( options ) {

		var settings = $.extend({
			direction : 'all',
		    index : false,
		    position : false
		}, options );

		
		return this.each(function() {
			var $this = $(this);
	   	$(this).css({
	   		'position' : settings.position !== false ? settings.position : 'absolute',
	    	'index' : settings.index !== false ? settings.index : 'initial'
	   	});
			if( settings.direction === 'all' ){
				$this.css("top", ( $(window).height() - $this.height() ) / 2  + "px");
				$this.css("left", ( $(window).width() - $this.width() ) / 2 + "px");
			}

			if( settings.direction === 'horizontal' ){
				$this.css("left", ( $(window).width() - $this.width() ) / 2 + "px");
			}

			if( settings.direction === 'vertical' ){
				$this.css("top", ( $(window).height() - $this.height() ) / 2  + "px");
			}

		});
	  
		return this;
	}

}else{

    console.log('jQuery is required');

}
