$(function(){
	// *************************************************** J  D A T E P I C K E R ***************************************************
    //init j-datepicker
    j_datepicker();
    var days_change=false;
    $(document).on("click",".j-datepicker",function(){
        if($(this).val()!==""){
            var dates = $(this).val().replace(',','').split(' ');
            $(this).closest(".component-factory").find('.j-datepicker-factory select[name="months"] option[value="'+dates[0]+'"]').prop("selected",true).closest("select").trigger("change");
            days_change=dates[1];
            $(this).closest(".component-factory").find('.j-datepicker-factory select[name="years"] option[value="'+dates[2]+'"]').prop("selected",true).closest("select").trigger("change");
        }else{
            days_change=false;
        }
        $(this).closest(".component-factory").find(".j-components .parent").trigger("click");
    });
    $(document).on("click",".j-datepicker-ok",function(e){
        e.preventDefault();
        var ff = typeof $(this).closest('.component-factory').find('.j-datepicker').attr('data-format') !== typeof undefined && $(this).closest('.component-factory').find('.j-datepicker').attr('data-format') !== false && $(this).closest('.component-factory').find('.j-datepicker').attr('data-format') !== "" ? $(this).closest('.component-factory').find('.j-datepicker').attr('data-format') : 'MMMM DD, YYYY',
            dd = $(this).closest(".j-datepicker-factory").find('select[name="months"]').val()+" "+$(this).closest(".j-datepicker-factory").find('select[name="days"]').val()+", "+$(this).closest(".j-datepicker-factory").find('select[name="years"]').val();

        $(this).closest(".component-factory")
            .find(".j-datepicker")
            .val(moment(dd).format(ff)).closest(".component-factory").find(".j-menu-dp-container").fadeOut(200);
    });
    $(document).on("click",".j-datepicker-current",function(e){
        e.preventDefault();
        var ff = typeof $(this).closest('.component-factory').find('.j-datepicker').attr('data-format') !== typeof undefined && $(this).closest('.component-factory').find('.j-datepicker').attr('data-format') !== false && $(this).closest('.component-factory').find('.j-datepicker').attr('data-format') !== "" ? $(this).closest('.component-factory').find('.j-datepicker').attr('data-format') : 'MMMM DD, YYYY',
            current_date = moment().format('MMMM')+" "+moment().format("D")+", "+moment().format('YYYY');
        
        $(this).closest(".component-factory")
            .find(".j-datepicker")
            .val(moment(current_date).format(ff))
            .closest(".component-factory").find(".j-menu-dp-container").fadeOut(200);
    });
    $(document).on("change",'.j-datepicker-factory select[name="months"],.j-datepicker-factory select[name="years"]',function(){
        if($(this).val()!==""){
            var days='';
            $.each(getDaysArray($(this).closest(".j-datepicker-factory").find('select[name="years"]').val(),$(this).closest(".j-datepicker-factory").find('select[name="months"] option:selected').attr("data-month")),function(index,value){
                var dd = "0"+value.toString();
                days+='<option value="'+dd.slice(-2)+'">'+dd.slice(-2)+'</option>';
            });
            $(this).closest(".j-datepicker-factory").find('select[name="days"]').html(days);
            if(days_change!==false){
                $(this).closest(".j-datepicker-factory").find('select[name="days"] option[value="'+days_change+'"]').prop("selected",true).closest("select").trigger("change");
            }else{
                $(this).closest(".j-datepicker-factory").find('select[name="days"] option:first-child').prop("selected",true).closest("select").trigger("change");
            }
        }
    });
    // *************************************************** E N D  J  D A T E P I C K E R ***************************************************
});

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
function j_datepicker(){
    //j datepicker
    if (!window.moment) { 
        return;
    }
        
    $(".j-datepicker-factory").remove();
            
    //months
    var list_months = [[1,'Jan'],[2,'Feb'],[3,'Mar'],[4,'Apr'],[5,'May'],[6,'Jun'],[7,'Jul'],[8,'Aug'],[9,'Sep'],[10,'Oct'],[11,'Nov'],[12,'Dec']],months='<select class="form-control" style="width:95px;" name="months">';
    $.each(list_months,function(index,value){
        if(value[1].toUpperCase()===moment().format('MMM').toUpperCase())
            months+='<option value="'+value[1]+'" data-month="'+value[0]+'" selected>'+value[1]+'</option>';
        else
            months+='<option value="'+value[1]+'" data-month="'+value[0]+'">'+value[1]+'</option>';
    });
    months+='</select>';
    //days
    var days = '<select class="form-control" style="width:70px;" name="days">';
    $.each(getDaysArray(moment().format("YYYY"),moment().format('M')),function(index,value){
        var dd = "0"+value.toString();
        if(value===parseInt(moment().format('D')))
            days+='<option value="'+dd.slice(-2)+'" selected>'+dd.slice(-2)+'</option>';
        else
            days+='<option value="'+dd.slice(-2)+'">'+dd.slice(-2)+'</option>';
    });
    days+='</select>';
    $(".j-datepicker").each(function(){
         //unwrap
        if($(this).parent().hasClass('component-factory')){
            $(this).unwrap();
        }
        //init
        $(this).attr( 'readonly' , false).wrap('<div></div>').parent().addClass("parent component-factory date-factory");

        var cp = $(this).attr('data-placeholder');
        if(typeof cp !== typeof undefined && cp !== false && cp !== "") {
            $(this).attr('placeholder',cp);            
        }else{
            $(this).attr('placeholder','Click to select date');
        }

        if($(this).hasClass('future') && typeof $(this).attr('data-future') typeof !== undefined && $(this).attr('data-future') !== '' ){

            var start_year = new Date().getFullYear(),end_year = new moment().add(parseInt($(this).attr('data-future')), 'year').format('YYYY'),years='<select class="form-control mb2" style="width:90px;" name="years">';
            for (var i = start_year; i <= parseInt(end_year); i++) {
                if(i===parseInt(moment().format('YYYY')))
                    years+='<option value="'+i+'" selected>'+i+'</option>';
                else
                    years+='<option value="'+i+'">'+i+'</option>';
            }

            years+='</select>';
        }else{

            //years
            var start_year = 1930,current_year = new Date().getFullYear(),years='<select class="form-control" style="width:90px;" name="years">';
            for (var i = start_year; i <= current_year; i++) {
                if(i===parseInt(moment().format('YYYY')))
                    years+='<option value="'+i+'" selected>'+i+'</option>';
                else
                    years+='<option value="'+i+'">'+i+'</option>';
            }
            years+='</select>';

        }

        $(this).after('<div class="j-components j-datepicker-factory"><div class="j-menu"><ul class="j-menu-nav list-style-none clear p00 m00">'+
        '<li class="list-style-none clear"><a href="#" class="parent" style="display:none;" data-has-submenu="yes">click</a>'+
            '<ul class="j-menu-dp-container list-style-none display-none bg-white p15 radius-3 shadow-z-1" style="border:1px solid #ededed;margin-top:0px;">'+
                '<li class="list-style-none"><div class="display-table">'+
                    '<div class="display-row"><div class="display-cell pr7"><span class="font10 font500">MONTH:</span><br>'+months+'</div><div class="display-cell pr7"><span class="font10 font500">DAYS:</span><br>'+days+'</div><div class="display-cell"><span class="font10 font500">YEARS:</span><br>'+years+'</div></div></div>'+
                    '<div class="display-table mt8"><div class="display-row"><div class="display-cell padding-right10px"><a href="#" class="btn mb0 j-datepicker-current">CURRENT DATE</a></div><div class="display-cell"><a href="#" class="btn mb0 j-datepicker-ok">OK</a></div></div></div>'+
                '</li>'+
            '</ul>'+
        '</li>'+
        '</ul></div></div>');

    });
}