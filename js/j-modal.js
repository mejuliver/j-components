
/* 
    M O D A L 
    ----------------------------------------------------
    Uses twitter bootstrap modal component, to use, modal( [your modal title], [your modal content], [functions to be run when modal function is invoke, separate by space if multiple ] )
*/

if ('undefined' == typeof window.jQuery || typeof $().modal != 'function') || typeof $.fn.j_menu == 'undefined' || !window.moment) {
    return;
}
(function($){
    $.fn.j_modal = function () {
        if( $('.modal-screen').length == 0 ){
            $('body').append('<div class="modal-screen"></div>');    
        }
        $('body').append( '<button id="modal-button" data-toggle="modal" data-target="#modal-container" style="display:none;">Launch modal</button><div class="modal fade" id="modal-container" tabindex="-1" role="dialog" aria-labelledby="modal-container-label" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content" style="box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);"> <div class="modal-header"> <h5 class="modal-title" id="modal-container-label"></h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div><div class="modal-body"> </div></div></div></div>');
    }
})(jQuery);


function modal(title, content, dependencies,footer = false){
    if( typeof $.fn.j_modal != 'undefined' ){
        console.log('Ohoo! not too fast cowbody! j_modal is not initialize yet!');
        return;
    }
    modal_open = true;
    // check if modal elements was created, if not then create it
    
    //required materialize
    $("#modal-container .modal-title").html(title);
    $("#modal-container .modal-body").html(content);
    if(footer !== false){
        $('#modal-container .modal-body').after('<div class="modal-footer">'+footer+'</div>');
    }
    $("#modal-button").trigger("click");
    _runner(dependencies);
}
// remove all created on show instances when modal is completely hidden
$('#modal-container').on('hidden.bs.modal',function(e) {
     //required materialize
    $('#modal-container .modal-title').html('');
    $('#modal-container .modal-body').html('');
    $('#modal-container .modal-dialog')
        .removeClass('modal-sm modal-lg')
        .find('.modal-footer').remove();
});