if ('undefined' != typeof window.jQuery ||  window.moment) {

    $.fn.timepicker = function ( options ) {

        var settings = $.extend({
            format : 'hh:mm A',
            placeholder : false
            }, options );

        var hours = '<select name="hours">';
        for(i=1;i<13;i++){
            var hrs = "0"+i.toString();
            hours+='<option value="'+hrs.slice(-2)+'">'+hrs.slice(-2)+'</option>';
        }
        hours+='</select>';
        var minutes = '<select name="minutes"><option value="00">00</option>';
        for(i=1;i<60;i++){
            var mins = "0"+i.toString();
            minutes+='<option value="'+mins.slice(-2)+'">'+mins.slice(-2)+'</option>';
        }
        minutes+='</select>';
        var am_pm = '<select name="am_pm">';
        am_pm+='<option value="am">AM</option>';
        am_pm+='<option value="pm">PM</option>';
        am_pm+='</select>';


        if( settings.placeholder !== false) {

            this.attr('placeholder', settings.placeholder);
        }else{
            this.attr('placeholder','');
        }

        var $this = this;

        return $(this).each(function(){

            //convert the value to a valid time 
            if($(this).val() != ''){
                $(this).val(moment($(this).val(),'hh:mm').format('hh:mm A'));
            }
            // add readonly property
            $(this).attr( 'readonly' , true).addClass('timepicker').wrap('<div class="j-component" data-type="timepicker"></div>');
            //init

            var cp = $(this).attr('data-placeholder');

            $(this).attr( 'readonly' , false).addClass('j-timepicker');

            if(typeof $(this).attr('data-placeholder') !== typeof undefined && $(this).attr('data-placeholder') !== '' && $(this).attr('data-placeholder') !== 'false' ){
                $(this).attr( 'placeholder', $(this).attr('data-placeholder') )
            }

            var cp = $(this).attr('data-placeholder');
            if(typeof cp !== typeof undefined && cp !== false && cp !== "") {
                $(this).attr('placeholder','Click to select time');
            }else{
                $(this).attr('placeholder',cp);
            }
            $(this).after('<div class="sub"><div class="col-xs-4 mt8 p3">'+hours+'</div><div class="col-xs-4 mt8 p3">'+minutes+'</div><div class="col-xs-4 mt8 p3">'+am_pm+'</div><div class="clear"><div class="col-xs-3 mt8 p3"><button class="current">Current</button></div><div class="col-xs-3 mt8 p3"><button class="select">Select</button></div></div></div>');

            $(this).on("click",function(){
                if($(this).val()!==""){
                    var time = $(this).val().replace(':',' ').split(' ');
                    $(this).next('.sub').find('select[name="hours"]').val(time[0]).trigger("change");
                    $(this).next('.sub').find('select[name="minutes"]').val(time[1]).trigger("change");
                    $(this).next('.sub').find('select[name="am_pm"]').val(time[2].toLowerCase()).trigger("change");
                }
                $(this).next('.sub').show();
            });
            $(this).next('.sub').find('.select').on('click',function(e){
                e.preventDefault();
                $(this)
                    .closest('.sub')
                    .prev(".timepicker")
                    .val($(this).closest('.sub').find('select[name="hours"]').val()+":"+$(this).closest('.sub').find('select[name="minutes"]').val()+" "+$(this).closest('.sub').find('select[name="am_pm"]').val().toUpperCase()).next('.sub').hide();
            });
            $(this).next('.sub').find('.current').on("click",function(e){
                e.preventDefault();
                $(this).closest('.sub').prev(".timepicker").val(moment().format('hh')+":"+moment().format("mm")+" "+moment().format('A')).next('.sub').hide();
            });

        });


    }

}else{

    console.log('jQuery, j menu, momentjs is required');

}