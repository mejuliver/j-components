if ('undefined' != typeof window.jQuery ) {

	$.fn.boxslider = function(options){
  	var settings = $.extend({
    	duration : 1000
    },options),

    start_animation = [],
    end_animation = [];
    
    this.addClass('box-slider');

    //set the position of the .item (s)
    this.find('.item').css('top','-'+$('.box-slider').position().top);
    //get all slides start animation and end animation and then store in unto start_animation array
    this.find('.item').each(function(i,e){
    	start_animation.push($(this).attr('data-animation-in'));
      end_animation.push($(this).attr('data-animation-out'));
    });
    
    //mark the first element as active and show it
    this.find('.item:first-child').addClass('active animated '+start_animation[this.find('.item:first-child').index()]).show();
    //create timeout based unto the given duration options
    var dis = this;
   setInterval(function(){
    	//declare to be used vars
      var ela = dis.find('.item.active'),
          elai = ela.index();
      //remove start animation and add end animation to last child element
      ela.removeClass('animated '+start_animation[elai])
        	.addClass('animated '+end_animation[elai]);
      //check if the active element is last child
      if(ela.is('.item:last-child')){
       	//add start animation to the first child since this is a last chid element
       dis.find('.item:first-child')
          .removeClass('animated '+end_animation[dis.find('.item:first-child').index()])
       	  .addClass('animated '+start_animation[dis.find('.item:first-child').index()]).show();
      //remove the active class and add to the next element
      ela.removeClass('active');
      dis.find('.item:first-child').addClass('active');
      }else{
      //load the next element
       ela.next('.item')
          .removeClass('animated '+end_animation[ela.next('.item').index()])
          .addClass('animated '+start_animation[ela.next().index()]).show();
      //remove the active class and add to the next element
      ela.removeClass('active');
      ela.next('.item').addClass('active');
     }

    },settings.duration);
    return this;
  }
  
}else{

    console.log('jQuery is required');

}
