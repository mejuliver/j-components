$(function(){
    //init j-timepicker
    j_timepicker();
    $(document).on("click",".j-timepicker",function(){
        if($(this).val()!==""){
            var time = $(this).val().replace(':',' ').split(' ');
            $(this).closest(".component-factory").find('.j-timepicker-factory select[name="hours"]').val(time[0]).trigger("change");
            $(this).closest(".component-factory").find('.j-timepicker-factory select[name="minutes"]').val(time[1]).trigger("change");
            $(this).closest(".component-factory").find('.j-timepicker-factory select[name="am_pm"]').val(time[2].toLowerCase()).trigger("change");
        }
        $(this).closest(".component-factory").find(".j-components .parent").trigger("click");
    });
    $(document).on("click",".j-timepicker-ok",function(e){
        e.preventDefault();
        $(this).closest(".component-factory").find(".j-timepicker").val($(this).closest(".j-timepicker-factory").find('select[name="hours"]').val()+":"+$(this).closest(".j-timepicker-factory").find('select[name="minutes"]').val()+" "+$(this).closest(".j-timepicker-factory").find('select[name="am_pm"]').val().toUpperCase()).closest(".component-factory").find(".j-menu-dp-container").fadeOut(200);
    });
    $(document).on("click",".j-timepicker-current",function(e){
        e.preventDefault();
        $(this).closest(".component-factory").find(".j-timepicker").val(moment().format('hh')+":"+moment().format("mm")+" "+moment().format('A')).closest(".component-factory").find(".j-menu-dp-container").fadeOut(200);
    });
});

function j_timepicker(){
    if (!window.moment) { 
        return;
    }
    $(".j-timepicker-factory").remove();
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

    var cp = $(this).attr('data-placeholder');
        if(typeof cp !== typeof undefined && cp !== false && cp !== "") {
            $(this).attr('placeholder','Click to select date');
        }else{
            $(this).attr('placeholder',cp);
        }

    $('.j-timepicker').each(function(){
        //unwrap
        if($(this).parent().hasClass('component-factory time-factory')){
            $(this).unwrap();
        }
        //init
        $(this).attr( 'readonly' , false).wrap('<div></div>').parent().addClass("parent component-factory");

        var cp = $(this).attr('data-placeholder');
        if(typeof cp !== typeof undefined && cp !== false && cp !== "") {
            $(this).attr('placeholder','Click to select time');
        }else{
            $(this).attr('placeholder',cp);
        }
        $(this).after('<div class="j-components j-timepicker-factory"><div class="j-menu"><ul class="j-menu-nav list-style-none clear p00 m00">'+
        '<li class="list-style-none clear"><a href="#" class="parent" data-has-submenu="yes" style="display:none;">click</a>'+
            '<ul class="j-menu-dp-container list-style-none display-none bg-white p15 radius-3 shadow-z-1" style="border:1px solid #ededed;margin-top:0px;">'+
                '<li class="list-style-none"><div class="display-table">'+
                    '<div class="display-row"><div class="display-cell pr7"><span class="font10 font500">HOURS:</span><br>'+hours+'</div><div class="display-cell pr7"><span class="font10 font500">MINUTES:</span><br>'+minutes+'</div><div class="display-cell"><span class="font10 font500">AM/PM:</span><br>'+am_pm+'</div></div></div>'+
                    '<div class="display-table mt8"><div class="display-row"><div class="display-cell pr10"><a href="#" class="btn mb0 j-timepicker-current">CURRENT TIME</a></div><div class="display-cell"><a href="#" class="btn mb0 j-timepicker-ok">OK</a></div></div></div>'+
                '</li>'+
            '</ul>'+
        '</li>'+
        '</ul></div></div>');
    });
}