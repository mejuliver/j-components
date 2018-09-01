
if ('undefined' != typeof window.jQuery ||  window.moment) {

    $.fn.datepicker = function ( options ) {

        var settings = $.extend({
            format : 'MMMM D, YYYY'
            }, options ),
            days_change=false;

// --------------------------------------------------------------------------------------------------
        //days function
        var getDaysArray = function(year, month) {
          // var names = [ 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' ];
          var date = new Date(year, month-1, 1);
          var result = [];
          while (date.getMonth() == month-1) {
            // result.push(date.getDate()+"-"+names[date.getDay()]);
            result.push(date.getDate());
            date.setDate(date.getDate()+1);
          }
          return result;
        }
        
                    
                
        //months
        var list_months = [[1,'Jan'],[2,'Feb'],[3,'Mar'],[4,'Apr'],[5,'May'],[6,'Jun'],[7,'Jul'],[8,'Aug'],[9,'Sep'],[10,'Oct'],[11,'Nov'],[12,'Dec']],months='<select name="months">';
        $.each(list_months,function(index,value){
            if(value[1].toUpperCase()===moment().format('MMM').toUpperCase())
                months+='<option value="'+value[1]+'" data-month="'+value[0]+'" selected>'+value[1]+'</option>';
            else
                months+='<option value="'+value[1]+'" data-month="'+value[0]+'">'+value[1]+'</option>';
        });
        months+='</select>';
        //days
        var days = '<select name="days">';
        $.each(getDaysArray(moment().format("YYYY"),moment().format('M')),function(index,value){
            var dd = "0"+value.toString();
            if(value===parseInt(moment().format('D')))
                days+='<option value="'+dd.slice(-2)+'" selected>'+dd.slice(-2)+'</option>';
            else
                days+='<option value="'+dd.slice(-2)+'">'+dd.slice(-2)+'</option>';
        });
        days+='</select>';

        var $this = this;
        
        return this.each(function(){

            // add readonly property
            $(this).attr( 'readonly' , true).addClass('datepicker').wrap('<div class="j-component" data-type="datepicker"></div>');

            var cp = $(this).attr('placeholder');
            if(typeof cp !== typeof undefined && cp !== false && cp !== "") {
                $(this).attr('placeholder',cp);            
            }else{
                $(this).attr('placeholder','Click to select date');
            }

            if($(this).hasClass('future') && typeof $(this).attr('data-future') !== typeof undefined && $(this).attr('data-future') !== '' && $(this).attr('data-future') !== 'false' ){

                var start_year = new Date().getFullYear(),end_year = new moment().add(parseInt($(this).attr('data-future')), 'year').format('YYYY'),years='<select name="years">';
                for (var i = start_year; i <= parseInt(end_year); i++) {
                    if(i===parseInt(moment().format('YYYY')))
                        years+='<option value="'+i+'" selected>'+i+'</option>';
                    else
                        years+='<option value="'+i+'">'+i+'</option>';
                }

                years+='</select>';
            }else{

                //years
                var start_year = 1930,current_year = new Date().getFullYear(),years='<select name="years">';
                for (var i = start_year; i <= current_year; i++) {
                    if(i===parseInt(moment().format('YYYY')))
                        years+='<option value="'+i+'" selected>'+i+'</option>';
                    else
                        years+='<option value="'+i+'">'+i+'</option>';
                }
                years+='</select>';

            }
            $pos = '';
            if( typeof $(this).attr('data-placement') != typeof undefined && $(this).attr('data-placement') != '' ){
                $pos = ' '+$(this).attr('data-placement');
            }
            $(this).after('<div class="component-sub'+$pos+'"><div class="col-xs-4 mt8 p3">'+months+'</div><div class="col-xs-4 mt8 p3">'+days+'</div><div class="col-xs-4 mt8 p3">'+years+'</div><div class="clear"><div class="col-xs-3 mt8 p3"><button class="current">Today</button></div><div class="col-xs-3 mt8 p3"><button class="select">Select</button></div></div></div>');


            $this.on('click',function(){
                if($(this).val()!==''){
                    var dates = $(this).val().replace(',','').split(' ');
                    $(this).next('.component-sub').find('select[name="months"] option[value="'+dates[0]+'"]').prop("selected",true).closest("select").trigger("change");
                    days_change=dates[1];
                    $(this).next('.component-sub').find('select[name="years"] option[value="'+dates[2]+'"]').prop("selected",true).closest("select").trigger("change");
                }else{
                    days_change=false;
                }
                $(this).next('.component-sub').toggle();
            });

            $this.next('.component-sub').find('.select').on("click",function(e){
                e.preventDefault();
                var ff = typeof $(this).closest('.component-sub').prev('.datepicker').attr('data-format') !== typeof undefined && $(this).closest('.component-sub').prev('.datepicker').attr('data-format') !== false && $(this).closest('.component-sub').prev('.datepicker').attr('data-format') !== "" ? $(this).closest('.component-sub').prev('.datepicker').attr('data-format') : settings.format,
                    dd = $(this).closest('.component-sub').find('select[name="months"]').val()+" "+$(this).closest('.component-sub').find('select[name="days"]').val()+", "+$(this).closest('.component-sub').find('select[name="years"]').val();

                $(this).closest('.component-sub')
                    .prev(".datepicker")
                    .val(moment(dd).format(ff)).next('.component-sub').hide();
            });

            $this.next('.component-sub').find('.current').on("click",function(e){
                e.preventDefault();
                var ff = typeof $(this).closest('.component-sub').prev('.datepicker').attr('data-format') !== typeof undefined && $(this).closest('.component-sub').prev('.datepicker').attr('data-format') !== false && $(this).closest('.component-sub').prev('.datepicker').attr('data-format') !== "" ? $(this).closest('.component-sub').prev('.datepicker').attr('data-format') : settings.format,
                    current_date = moment().format('MMMM')+" "+moment().format("D")+", "+moment().format('YYYY');
                
                $(this).closest('.component-sub')
                    .prev(".datepicker")
                    .val(moment(current_date).format(ff))
                    .next('.component-sub').hide();
            });
            
            $this.next('.component-sub').find('select[name="months"],select[name="years"]').on("click",function(){
                if($(this).val()!==""){
                    var days='';
                    $.each(getDaysArray($(this).closest('.component-sub').find('select[name="years"]').val(),$(this).closest('.component-sub').find('select[name="months"] option:selected').attr("data-month")),function(index,value){
                        var dd = "0"+value.toString();
                        days+='<option value="'+dd.slice(-2)+'">'+dd.slice(-2)+'</option>';
                    });
                    $(this).closest('.component-sub').find('select[name="days"]').html(days);
                    if(days_change!==false){
                        $(this).closest('.component-sub').find('select[name="days"] option[value="'+days_change+'"]').prop("selected",true).closest("select").trigger("change");
                    }else{
                        $(this).closest('.component-sub').find('select[name="days"] option:first-child').prop("selected",true).closest("select").trigger("change");
                    }
                }
            });
        });

        return this;

    }

    $(document).on("mousedown touchstart", function(e) {
        var dp = $('.component-sub:visible');
        if (!dp.is(e.target) && dp.has(e.target).length === 0) {
            $('.component-sub').hide();
        }
    });


}else{

    console.log('jQuery, momentjs, is required');

}

