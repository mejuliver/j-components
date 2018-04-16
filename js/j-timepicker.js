if ('undefined' != typeof window.jQuery || typeof $.fn.j_menu != 'undefined' || window.moment) {

    (function($){

        $.fn.j_timepicker = function ( options ) {

            var settings = $.extend({
                format : 'hh:mm A',
                placeholder : false
                }, options ),

            var hours = '<select class="form-control j-timepicker-hrs" style="width:70px;" name="hours">';
            for(i=1;i<13;i++){
                var hrs = "0"+i.toString();
                hours+='<option value="'+hrs.slice(-2)+'">'+hrs.slice(-2)+'</option>';
            }
            hours+='</select>';
            var minutes = '<select class="form-control" style="width:70px;" name="minutes"><option value="00">00</option>';
            for(i=1;i<60;i++){
                var mins = "0"+i.toString();
                minutes+='<option value="'+mins.slice(-2)+'">'+mins.slice(-2)+'</option>';
            }
            minutes+='</select>';
            var am_pm = '<select class="form-control" style="width:70px;" name="am_pm">';
            am_pm+='<option value="am">AM</option>';
            am_pm+='<option value="pm">PM</option>';
            am_pm+='</select>';


            if( settings.placeholder !== false) {

                this.attr('placeholder', settings.placeholder);
            }else{
                this.attr('placeholder','');
            }

             return this.each(function(){
                //convert the value to a valid time 
                if(this.val() != ''){
                    this.val(moment(this.val(),'hh:mm').format('hh:mm A'));
                }
                //init

                var cp = $(this).attr('data-placeholder');

                this.attr( 'readonly' , false).addClass('j-timepicker');

                if(typeof this.attr('data-placeholder') !== typeof undefined && this.attr('data-placeholder') !== '' && this.attr('data-placeholder') !== 'false' ){
                    this.attr( 'placeholder', this.attr('data-placeholder') )
                }

                var cp = this.attr('data-placeholder');
                if(typeof cp !== typeof undefined && cp !== false && cp !== "") {
                    this.attr('placeholder','Click to select time');
                }else{
                    this.attr('placeholder',cp);
                }
                this.after('<div class="j-component" data-type="menu timepicker"> <ul class="menu-holder"> <li> <a href="#" style="display:none;">Time</a> <ul style="width:300px;;"> <li> <div class="display-table"> <div class="display-row"> <div class="display-cell pr7"> <span class="font10 font500">HOURS:</span> <br>'+hours+'</div><div class="display-cell pr7"> <span class="font10 font500">MINUTES:</span> <br>'+minutes+'</div><div class="display-cell"> <span class="font10 font500">AM/PM:</span> <br>'+am_pm+'</div></div></div><div class="display-table mt8"> <div class="display-row"> <div class="display-cell padding-right10px"> <a href="#" class="j-timepicker-current">CURRENT</a> </div><div class="display-cell"> <a href="#" class="j-timepicker-ok">OK</a> </div></div></div></li></ul> </li></ul></div>');
            });

            this.next('.j-component[data-type*="timepicker"]').on("click",function(){
                if($(this).val()!==""){
                    var time = $(this).val().replace(':',' ').split(' ');
                    $(this).next('.j-component[data-type*="timepicker"]').find('select[name="hours"]').val(time[0]).trigger("change");
                    $(this).next('.j-component[data-type*="timepicker"]').find('select[name="minutes"]').val(time[1]).trigger("change");
                    $(this).next('.j-component[data-type*="timepicker"]').find('select[name="am_pm"]').val(time[2].toLowerCase()).trigger("change");
                }
                $(this).next('.j-component[data-type*="timepicker"]').find(".menu-holder > li > a").trigger('click');
            });
            this.next('.j-component[data-type*="timepicker"]').find('.j-timepicker-ok').on('click',function(e){
                e.preventDefault();
                $(this)
                    .closest('.j-component[data-type*="timepicker"]')
                    .prev(".j-timepicker")
                    .val($(this).closest('.j-component[data-type*="timepicker"]').find('select[name="hours"]').val()+":"+$(this).closest('.j-component[data-type*="timepicker"]').find('select[name="minutes"]').val()+" "+$(this).closest('.j-component[data-type*="timepicker"]').find('select[name="am_pm"]').val().toUpperCase()).next('.j-component[data-type*="timepicker"]').find(".menu-holder > li > a").trigger('click');
            });
            this.next('.j-component[data-type*="timepicker"]').find('.j-timepicker-current').on("click",function(e){
                e.preventDefault();
                $(this).closest('.j-component[data-type*="timepicker"]').prev(".j-timepicker").val(moment().format('hh')+":"+moment().format("mm")+" "+moment().format('A')).next('.j-component[data-type*="timepicker"]').find(".menu-holder > li > a").trigger('click');
            });

        }
    })(jQuery);

}else{

    console.log('jQuery, j menu, momentjs is required');

}