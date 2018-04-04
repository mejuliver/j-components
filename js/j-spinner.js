
/* 
    J - S P I N N E R
--------------------------------------------------------------------    
    O P T I O N S

    status: on/off, default 'off'
    spinner: spinner1 - spinner10

*/
if ('undefined' == typeof window.jQuery) {
    return;
}

function j_spinner(status,spinner){
   if(status==="on"){
        switch(spinner){
            case '1' :
                $("body").append('<div style="position:fixed;z-index:9998;background:rgba(255,255,255,0.5);width:100%;height:100vh;top:0px;right:0px;" id="spinner-wrapper"></div><div class=" display-table animated zoomIn" style="position:fixed;z-index:9999;-webkit-animation-duration: 450ms;animation-duration: 450ms;" id="spinner"><div class="spinner1"></div></div>');
                break;
            case '2' :
                $("body").append('<div style="position:fixed;z-index:9998;background:rgba(255,255,255,0.5);width:100%;height:100vh;top:0px;right:0px;" id="spinner-wrapper"></div><div class=" display-table animated zoomIn" style="position:fixed;z-index:9999;-webkit-animation-duration: 450ms;animation-duration: 450ms;" id="spinner"><div class="spinner2"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div>');
                break;
            case '3' :
                $("body").append('<div style="position:fixed;z-index:9998;background:rgba(255,255,255,0.5);width:100%;height:100vh;top:0px;right:0px;" id="spinner-wrapper"></div><div class=" display-table animated zoomIn" style="position:fixed;z-index:9999;-webkit-animation-duration: 450ms;animation-duration: 450ms;" id="spinner"><div class="spinner4"><div class="cube1"></div><div class="cube2"></div></div></div>');
                break;
            case '4' :
                $("body").append('<div style="position:fixed;z-index:9998;background:rgba(255,255,255,0.5);width:100%;height:100vh;top:0px;right:0px;" id="spinner-wrapper"></div><div class=" display-table animated zoomIn" style="position:fixed;z-index:9999;-webkit-animation-duration: 450ms;animation-duration: 450ms;" id="spinner"><div class="spinner5"></div></div>');
                break;
            case '5' :
                $("body").append('<div style="position:fixed;z-index:9998;background:rgba(255,255,255,0.5);width:100%;height:100vh;top:0px;right:0px;" id="spinner-wrapper"></div><div class=" display-table animated zoomIn" style="position:fixed;z-index:9999;-webkit-animation-duration: 450ms;animation-duration: 450ms;" id="spinner"><div class="spinner6"><div class="dot1"></div><div class="dot2"></div></div></div>');
                break;
            case '6' :
                $("body").append('<div style="position:fixed;z-index:9998;background:rgba(255,255,255,0.5);width:100%;height:100vh;top:0px;right:0px;" id="spinner-wrapper"></div><div class=" display-table animated zoomIn" style="position:fixed;z-index:9999;-webkit-animation-duration: 450ms;animation-duration: 450ms;" id="spinner"><div class="spinner7"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>');
                break;
            case '7' :
                $("body").append('<div style="position:fixed;z-index:9998;background:rgba(255,255,255,0.5);width:100%;height:100vh;top:0px;right:0px;" id="spinner-wrapper"></div><div class=" display-table animated zoomIn" style="position:fixed;z-index:9999;-webkit-animation-duration: 450ms;animation-duration: 450ms;" id="spinner"><div class="spinner8"><div class="sk-circle1 sk-child"></div><div class="sk-circle2 sk-child"></div><div class="sk-circle3 sk-child"></div><div class="sk-circle4 sk-child"></div><div class="sk-circle5 sk-child"></div><div class="sk-circle6 sk-child"></div><div class="sk-circle7 sk-child"></div><div class="sk-circle8 sk-child"></div><div class="sk-circle9 sk-child"></div><div class="sk-circle10 sk-child"></div><div class="sk-circle11 sk-child"></div><div class="sk-circle12 sk-child"></div></div></div>');
                break;
            case '8' :
                $("body").append('<div style="position:fixed;z-index:9998;background:rgba(255,255,255,0.5);width:100%;height:100vh;top:0px;right:0px;" id="spinner-wrapper"></div><div class=" display-table animated zoomIn" style="position:fixed;z-index:9999;-webkit-animation-duration: 450ms;animation-duration: 450ms;" id="spinner"><div class="spinner9"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div><div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div></div>');
                break;
            case '9' :
                $("body").append('<div style="position:fixed;z-index:9998;background:rgba(255,255,255,0.5);width:100%;height:100vh;top:0px;right:0px;" id="spinner-wrapper"></div><div class=" display-table animated zoomIn" style="position:fixed;z-index:9999;-webkit-animation-duration: 450ms;animation-duration: 450ms;" id="spinner"><div class="spinner10"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div></div>');
                break;
            case '10' :
                $("body").append('<div style="position:fixed;z-index:9998;background:rgba(255,255,255,0.5);width:100%;height:100vh;top:0px;right:0px;" id="spinner-wrapper"></div><div class=" display-table animated zoomIn" style="position:fixed;z-index:9999;-webkit-animation-duration: 450ms;animation-duration: 450ms;" id="spinner"><div class="spinner11"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div></div>');
                break;
            default :
                $("body").append('<div style="position:fixed;z-index:9998;background:rgba(255,255,255,0.5);width:100%;height:100vh;top:0px;right:0px;" id="spinner-wrapper"></div><div class=" display-table animated zoomIn" style="position:fixed;z-index:9999;-webkit-animation-duration: 450ms;animation-duration: 450ms;" id="spinner"><div class="spinner3"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div></div>');
        }
        $('#spinner').center().show();
        $('body').addClass('disabled');
   }else{
        $('#spinner').fadeOut(400,function(){
            $('#spinner').center().remove();
        });
        $('#spinner-wrapper').remove();
        $('body').removeClass('disabled');
   }
}