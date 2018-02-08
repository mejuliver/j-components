if ('undefined' == typeof window.jQuery) {
    return;
}
/* 
    A J A X  F O R M
--------------------------------------------------------------------    
    O P T I O N S

    class: ajax-form, 'with-spinner' defines if theres a spinner on submit or not
    action: url
    method: post/get. Default is post
    data-onsuccess: specify the function you want the success response to be pass on
    data-message-place: specify an element tag(s)/class(s)/id(s) where the success message will be put on instead on its default container which is after the opening of the form tag
    data-custom-message: custom message e.g. successfully saved, specify your custom success mesage
    data-success-function: invoke function(s) when XMLHttpRequest request completed. Separate by comma if multiple
    data-fail-function: invoke function(s) when XMLHttpRequest request fail. Separate by comma if multiple
    data-constructor-function: invoke a function(s) before XMLHttpRequest request. Separate by comma if multiple
*/


// Automatically cancel unfinished ajax requests 
// when the user navigates elsewhere.
var xhrPool=[],global_spinner_conf=true,refresh=false,modal_open=false;
$(document).ajaxSend(function(e, jqXHR, options){
    xhrPool.push(jqXHR);
    });
    $(document).ajaxComplete(function(e, jqXHR, options) {
    xhrPool = $.grep(xhrPool, function(x){return x!=jqXHR});
    });
    var abort = function() {
    $.each(xhrPool, function(idx, jqXHR) {
      jqXHR.abort();
    });
    };

    var oldbeforeunload = window.onbeforeunload;
    window.onbeforeunload = function() {
    var r = oldbeforeunload ? oldbeforeunload() : undefined;
    if (r == undefined) {
      // only cancel requests if there is no prompt to stay on the page
      // if there is a prompt, it will likely give the requests enough time to finish
      abort();
    }
    return r;
}

$(function(){

    if(typeof app_token === 'undefined'){
        var app_token = '';
    }else{
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': app_token
            }
        });
    }

    $(document).on("submit", ".j-components .ajax-form", function(e){
        abort();
        dialog_open = true;
        e.preventDefault();

        //declare the major variables
        var dis = $(this),datatype = $(this).attr("data-type"),method = $(this).attr("method"), custom_message = $(this).attr("data-custom-message"), msg = dis.attr("data-message-place"), custom_on_success = $(this).attr("data-onsuccess"),before_send = $(this).attr("data-before-send");
        //check if attr 'constructor-function' exist and not empty
        //check if there is data-before-send, if there is then trigger that function first
        if(typeof before_send !== typeof undefined && before_send !== false && before_send !== "") {
            var classList = before_send.split(/\s+/);
            $.each(classList, function(index, item) {
              window[item]();
            });
        }
        //check if attr 'method' exist and not empty
        if(typeof method === typeof undefined && method === false && method === "") {
            method = "post";
        }
        //check if attr 'custom-message' exist and not empty
        if(typeof custom_message === typeof undefined && custom_message === false && custom_message === "") {
            custom_message = "Successfully saved!";
        }
         //check if attr 'custom-message' exist and not empty
        if(typeof datatype === typeof undefined && datatype === false && datatype === "") {
            datatype = 'html';
        }
        
        if(typeof dis.attr('data-before-send') !== typeof undefined && dis.attr('data-before-send') !== false && dis.attr('data-before-send') !== "") {
            var classList = dis.attr('data-before-send').split(/\s+/);
            $.each(classList, function(index, item) {
              window[item]();
            });
        }
        var formData = new FormData(dis[0]);

        $.ajax({
            url : dis.attr("action"),
            type : method,
            data : formData,
            dataType : datatype,
            cache: false,
            async: true,
            contentType: false,
            processData: false,
            beforeSend: function(){
                if( dis.hasClass('with-spinner') && typeof j_spinner !== 'undefined' && typeof j_spinner === 'function' ){

                    j_spinner("on");
                }
            },
            complete: function(){
                if( dis.hasClass('with-spinner') && typeof j_spinner !== 'undefined' && typeof j_spinner === 'function' ){
                    j_spinner("off");
                }
            },
            success: function(e){
                var success_transaction = false;
                $(".alert").remove();
                //check if attr 'datatype' exist and not empty
                if(typeof custom_on_success !== typeof undefined && custom_on_success !== false && custom_on_success !== "") {
                    if(e.success){
                        if(typeof custom_message !== typeof undefined && custom_message !== false && custom_message !== "" || custom_message === "none") {
                            if(typeof msg !== typeof undefined && msg !== false && msg !== "") {
                                $(msg).html('<div class="font13 alert alert-success" role="alert"><a href="#" data-dismiss="alert" style="color:rgba(0,0,0,0.3);display:block;float:right;"><i class="fa fa-times" aria-hidden="true"></i></a><table cellpadding="0" cellspacing="0" style="padding:0px;margin:0px"><tr><td class="padding-right10px" style="width:25px;vertical-align:top;" valign="top"><i class="fa fa-check-circle" aria-hidden="true"></i></td><td class="font13 text-align-left">'+custom_message+'</td></tr></table></div>');
                            }else{
                                dis.prepend('<div class="font13 alert alert-success" role="alert"><a href="#" data-dismiss="alert" style="color:rgba(0,0,0,0.3);display:block;float:right;"><i class="fa fa-times" aria-hidden="true"></i></a><table cellpadding="0" cellspacing="0" style="padding:0px;margin:0px"><tr><td class="padding-right10px" style="width:25px;vertical-align:top;" valign="top"><i class="fa fa-check-circle" aria-hidden="true"></i></td><td class="font13 text-align-left">'+custom_message+'</td></tr></table></div>');
                            }
                        }
                        success_transaction = true;
                        window[custom_on_success](e);


                    }else{
                        //if(typeof custom_message !== typeof undefined && custom_message !== false && custom_message !== "" || custom_message === "none") {
                        if(typeof msg !== typeof undefined && msg !== false && msg !== "") {
                            $(msg).html('<div class="font13 alert alert-danger" role="alert"><a href="#" data-dismiss="alert" style="color:rgba(0,0,0,0.3);display:block;float:right;"><i class="fa fa-times" aria-hidden="true"></i></a><table cellpadding="0" cellspacing="0" style="padding:0px;margin:0px"><tr><td class="padding-right10px" style="width:25px;vertical-align:top;" valign="top"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></td><td class="font13 text-align-left">'+e.message+'</td></tr></table></div>');
                        }else{
                            dis.prepend('<div class="font13 alert alert-danger" role="alert"><a href="#" data-dismiss="alert" style="color:rgba(0,0,0,0.3);display:block;float:right;"><i class="fa fa-times" aria-hidden="true"></i></a><table cellpadding="0" cellspacing="0" style="padding:0px;margin:0px"><tr><td class="padding-right10px" style="width:25px;vertical-align:top;" valign="top"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></td><td class="font13 text-align-left">'+e.message+'</td></tr></table></div>');
                        }
                        //}
                        success_transaction = false;
                    }
                }else{
                    if(datatype === 'json'){
                        if(e.success){
                            if(typeof custom_message !== typeof undefined && custom_message !== false && custom_message !== "" || custom_message === "none") {
                                if(typeof msg !== typeof undefined && msg !== false && msg !== "") {
                                    $(msg).html('<div class="font13 alert alert-success" role="alert"><a href="#" data-dismiss="alert" style="color:rgba(0,0,0,0.3);display:block;float:right;"><i class="fa fa-times" aria-hidden="true"></i></a><table cellpadding="0" cellspacing="0" style="padding:0px;margin:0px"><tr><td class="padding-right10px" style="width:25px;vertical-align:top;" valign="top"><i class="fa fa-check-circle" aria-hidden="true"></i></td><td class="font13 text-align-left">'+custom_message+'</td></tr></table></div>');
                                }else{
                                    dis.prepend('<div class="font13 alert alert-success" role="alert"><a href="#" data-dismiss="alert" style="color:rgba(0,0,0,0.3);display:block;float:right;"><i class="fa fa-times" aria-hidden="true"></i></a><table cellpadding="0" cellspacing="0" style="padding:0px;margin:0px"><tr><td class="padding-right10px" style="width:25px;vertical-align:top;" valign="top"><i class="fa fa-check-circle" aria-hidden="true"></i></td><td class="font13 text-align-left">'+custom_message+'</td></tr></table></div>');
                                }
                            }
                            success_transaction = true;
                        }else{
                            //if(typeof custom_message !== typeof undefined && custom_message !== false && custom_message !== "" || custom_message === "none") {
                            if(typeof msg !== typeof undefined && msg !== false && msg !== "") {
                                $(msg).html('<div class="font13 alert alert-danger" role="alert"><a href="#" data-dismiss="alert" style="color:rgba(0,0,0,0.3);display:block;float:right;"><i class="fa fa-times" aria-hidden="true"></i></a><table cellpadding="0" cellspacing="0" style="padding:0px;margin:0px"><tr><td class="padding-right10px" style="width:25px;vertical-align:top;" valign="top"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></td><td class="font13 text-align-left">'+e.message+'</td></tr></table></div>');
                            }else{
                                dis.prepend('<div class="font13 alert alert-danger" role="alert"><a href="#" data-dismiss="alert" style="color:rgba(0,0,0,0.3);display:block;float:right;"><i class="fa fa-times" aria-hidden="true"></i></a><table cellpadding="0" cellspacing="0" style="padding:0px;margin:0px"><tr><td class="padding-right10px" style="width:25px;vertical-align:top;" valign="top"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></td><td class="font13 text-align-left">'+e.message+'</td></tr></table></div>');
                            }
                            //}
                            success_transaction = false;
                        }
                    }else{
                        if($.trim(e) === "success"){
                            if(typeof custom_message !== typeof undefined && custom_message !== false && custom_message !== "" || custom_message === "none") {
                                if(typeof msg !== typeof undefined && msg !== false && msg !== "") {
                                    $(msg).html('<div class="font13 alert alert-success" role="alert"><a href="#" data-dismiss="alert" style="color:rgba(0,0,0,0.3);display:block;float:right;"><i class="fa fa-times" aria-hidden="true"></i></a><table cellpadding="0" cellspacing="0" style="padding:0px;margin:0px"><tr><td class="padding-right10px" style="width:25px;vertical-align:top;" valign="top"><i class="fa fa-check-circle" aria-hidden="true"></i></td><td class="font13 text-align-left">'+custom_message+'</td></tr></table></div>');
                                }else{
                                    dis.prepend('<div class="font13 alert alert-success" role="alert"><a href="#" data-dismiss="alert" style="color:rgba(0,0,0,0.3);display:block;float:right;"><i class="fa fa-times" aria-hidden="true"></i></a><table cellpadding="0" cellspacing="0" style="padding:0px;margin:0px"><tr><td class="padding-right10px" style="width:25px;vertical-align:top;" valign="top"><i class="fa fa-check-circle" aria-hidden="true"></i></td><td class="font13 text-align-left">'+custom_message+'</td></tr></table></div>');
                                }
                            }
                            success_transaction = true;
                        }else{
                            //if(typeof custom_message !== typeof undefined && custom_message !== false && custom_message !== "" || custom_message === "none") {
                            if(typeof msg !== typeof undefined && msg !== false && msg !== "") {
                                $(msg).html('<div class="font13 alert alert-danger" role="alert"><a href="#" data-dismiss="alert" style="color:rgba(0,0,0,0.3);display:block;float:right;"><i class="fa fa-times" aria-hidden="true"></i></a><table cellpadding="0" cellspacing="0" style="padding:0px;margin:0px"><tr><td class="padding-right10px" style="width:25px;vertical-align:top;" valign="top"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></td><td class="font13 text-align-left">'+e+'</td></tr></table></div>');
                            }else{
                                dis.prepend('<div class="font13 alert alert-danger" role="alert"><a href="#" data-dismiss="alert" style="color:rgba(0,0,0,0.3);display:block;float:right;"><i class="fa fa-times" aria-hidden="true"></i></a><table cellpadding="0" cellspacing="0" style="padding:0px;margin:0px"><tr><td class="padding-right10px" style="width:25px;vertical-align:top;" valign="top"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></td><td class="font13 text-align-left">'+e+'</td></tr></table></div>');
                            }
                            //}
                            success_transaction = false;
                        }
                    }
                }
                //on success parameter
                if(success_transaction === true){
                    //check if attr 'success-function' exist and not empty
                    var custom_function = dis.attr("data-success-function");
                    if(typeof custom_function !== typeof undefined && custom_function !== false && custom_function !== "") {
                        var classList = custom_function.split(/\s+/);
                        $.each(classList, function(index, item) {
                          window[item]();
                        });
                    }
                }else{

                    //check if attr 'fail-function' exist and not empty
                    var custom_function = dis.attr("data-fail-function");
                    if(typeof custom_function !== typeof undefined && custom_function !== false && custom_function !== "") {
                        var classList = custom_function.split(/\s+/);
                        $.each(classList, function(index, item) {
                          window[item]();
                        });
                    }
                }

            }

        });
        
        
    });
});