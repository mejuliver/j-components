if ('undefined' != typeof window.jQuery ) {

  (function($){
  	$.fn.jboxslider = function(options){
    	var settings = $.extend({
      	duration : 5000
      },options),

      start_animation = [],
      end_animation = [];
      
      this.addClass('j-box-slider');

      //set the position of the li's
      this.find('li').css('top','-'+$('.j-box-slider').position().top);
      //get all slides start animation and end animation and then store in unto start_animation array
      this.find('li').each(function(i,e){
      	start_animation.push($(this).attr('data-animation-in'));
        	end_animation.push($(this).attr('data-animation-out'));
      });
      
      //mark the first element as active and show it
      this.find('li:first-child').addClass('active animated '+start_animation[this.find('li:first-child').index()]).show();
      //create timeout based unto the given duration options
      var dis = this;
     setInterval(function(){
      	//declare to be used vars
        var ela = dis.find('li.active'),
            elai = ela.index();
        //remove start animation and add end animation to last child element
        ela.removeClass('animated '+start_animation[elai])
          	.addClass('animated '+end_animation[elai]);
        //check if the active element is last child
        if(ela.is(':last-child')){
         	//add start animation to the first child since this is a last chid element
         dis.find('li:first-child')
            .removeClass('animated '+end_animation[dis.find('li:first-child').index()])
         	  .addClass('animated '+start_animation[dis.find('li:first-child').index()]).show();
        //remove the active class and add to the next element
        ela.removeClass('active');
        dis.find('li:first-child').addClass('active');
        }else{
        //load the next element
         ela.next('li')
            .removeClass('animated '+end_animation[ela.next('li').index()])
            .addClass('animated '+start_animation[ela.next().index()]).show();
        //remove the active class and add to the next element
        ela.removeClass('active');
        ela.next('li').addClass('active');
       }

      },settings.duration);
      return this;
    }
  }(jQuery));
  
}else{

    console.log('jQuery is required');

}
