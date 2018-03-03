if ('undefined' == typeof window.jQuery ) {
    return;
}

/* 
    A J A X  Q U E S 
    ----------------------------------------------------
    All ajax request will be store here, if you wish to abort the currently running ajax request, jusst call ajaxAbort();
*/
$(document).ajaxComplete(function(e, jqXHR, options) {
    xhrPool = $.grep(xhrPool, function(x){return x!=jqXHR});
});
var abort = function() {
    $.each(xhrPool, function(idx, jqXHR) {
      jqXHR.abort()rt();
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

(function($){

    $.fn.j_ajax_form = function ( options ) {



        // token set up
        if( typeof app_token !== typeof undefined && app_token !== '' ){
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': app_token
                }
            });
        }

        this.addClass( 'j-component' ).attr( 'data-type','ajax' );

        
        this.on("submit", function(e){
            abort();
            e.preventDefault();

            // declare the major variables
            var $this = $(this),
                datatype = $this.attr("data-type"),
                method = $this.attr("method"),
                custom_on_success = $this.attr("data-onsuccess"),
                before_send = $this.attr("data-before-send"),
                after_send = $this.attr("data-after-send"),
                spinner = $this.attr('data-spinner');

            // check if attr 'method' exist and not empty
            if(typeof method === typeof undefined || typeof method !== typeof undefined && method === 'false' || typeof method !== typeof undefined && method === "") {
                method = "post";
            }
            // check if attr 'custom-message' exist and not empty
            if(typeof custom_message === typeof undefined || typeof custom_message !== typeof undefined && custom_message === 'false' || typeof custom_message !== typeof undefined && custom_message === "") {
                custom_message = "Successfully saved!";
            }
             // check if attr 'custom-message' exist and not empty
            if(typeof datatype === typeof undefined || typeof datatype !== typeof undefined && datatype === 'false' || typeof datatype !== typeof undefined && datatype === "" || typeof datatype !== typeof undefined && typeof datatype !== typeof undefined && datatype.toLowerCase() !== 'post' || typeof datatype !== typeof undefined && datatype.toLowerCase() !== 'get') {
                datatype = 'html';
            }

            var formData = new FormData($this[0]);

            $.ajax({
                url : $this.attr("action"),
                type : method,
                data : formData,
                dataType : datatype,
                cache: false,
                async: true,
                contentType: false,
                processData: false,
                beforeSend: function(){
                    // check if attr 'constructor-function' exist and not empty
                    // check if there is data-before-send, if there is then trigger that function first
                    if(typeof before_send !== typeof undefined && before_send !== false && before_send !== "") {
                        var classList = before_send.split(/\s+/);
                        $.each(classList, function(index, item) {
                          
                            if( typeof item === 'function'){
                                window[item]();   
                            }else{
                                console.log(item+' <-- is not a function');
                            }

                        });
                    }

                    if( typeof spinner === typeof undefined || typeof spinner !== typeof undefined && spinner === '' || typeof spinner !== typeof undefined && spinner === 'false' ){

                        if( typeof j_spinner === 'function' ){
                            j_spinner("on");
                        }else{
                            console.log( 'j spinner component not found');
                        }
                        
                    }else{
                        if( typeof j_spinner === 'function' ){
                            j_spinner("on",spinner);
                        }else{
                            console.log( 'j spinner component not found');
                        }
                    }
                },
                complete: function(){
                    if( typeof spinner === typeof undefined || typeof spinner !== typeof undefined && spinner === '' || typeof spinner !== typeof undefined && spinner === 'false' ){

                        if( typeof j_spinner === 'function' ){
                            j_spinner("off",spinner);
                        }else{
                            console.log( 'j spinner component not found');
                        }
                    }
                },
                success: function(e){
                
                    if ( typeof custom_on_success !== typeof undefined || typeof custom_on_success !== typeof undefined && custom_on_success !== '' || typeof custom_on_success !== typeof undefined && custom_on_success !== 'false' ){
                        window[custom_on_success](e);
                    }

                    if ( typeof after_send !== typeof undefined || typeof after_send !== typeof undefined && after_send !== '' || typeof after_send !== typeof undefined && after_send !== 'false' ){
                        var classList = after_send.split(/\s+/);
                        $.each( classList, function(index, item) {
                          window[item]();
                        });
                    }

                }

            });
            
            
        });
}
})(jQuery);
