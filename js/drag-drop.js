if ('undefined' != typeof window.jQuery ||  window.moment) {

    $.fn.drag_drop = function ( options ) {

        var settings = $.extend({
            url : false
            }, options );


        function sendFileToServer(formData,status,upload_url,onsuccess)
        {
            var uploadURL =upload_url; //Upload URL
            var extraData ={}; //Extra Data.
            var jqXHR=$.ajax({
                    xhr: function() {
                    var xhrobj = $.ajaxSettings.xhr();
                    if (xhrobj.upload) {
                            xhrobj.upload.addEventListener('progress', function(event) {
                                var percent = 0;
                                var position = event.loaded || event.position;
                                var total = event.total;
                                if (event.lengthComputable) {
                                    percent = Math.ceil(position / total * 100);
                                }
                                //Set progress
                                status.setProgress(percent);
                            }, false);
                        }
                    return xhrobj;
                },
                url: uploadURL,
                type: "POST",
                contentType:false,
                processData: false,
                cache: false,
                data: formData,
                success: function(data){
                    status.setProgress(100);
                    if(onsuccess){
                        window[onsuccess](data);
                    }else{
                        if(typeof file_upload_success  == 'function'){
                            file_upload_success(data);
                        }else{
                            console.log(data);
                        }
                    }
                }
            }); 

            status.setAbort(jqXHR);
        }

        var rowCount=0;
        function createStatusbar(obj)
        {
             rowCount++;
             var row="odd";
             if(rowCount %2 ==0) row ="even";
             this.statusbar = $("<div class='statusbar"+row+"'></div>");
             this.filename = $("<div class='filename'></div>").appendTo(this.statusbar);
             this.size = $("<div class='filesize'></div>").appendTo(this.statusbar);
             this.progressBar = $("<div class='progressBar'><div></div></div>").appendTo(this.statusbar);
             this.abort = $("<div class='abort'>Abort</div>").appendTo(this.statusbar);
             obj.after(this.statusbar);
            
            this.setFileNameSize = function(name,size)
            {
                var sizeStr="";
                var sizeKB = size/1024;
                if(parseInt(sizeKB) > 1024)
                {
                    var sizeMB = sizeKB/1024;
                    sizeStr = sizeMB.toFixed(2)+" MB";
                }
                else
                {
                    sizeStr = sizeKB.toFixed(2)+" KB";
                }
            
                this.filename.html(name);
                this.size.html(sizeStr);
            }
            this.setProgress = function(progress)
            {       
                var progressBarWidth =progress*this.progressBar.width()/ 100;  
                this.progressBar.find('div').animate({ width: progressBarWidth }, 10).html(progress + "%&nbsp;");
                if(parseInt(progress) >= 100)
                {
                    this.abort.hide();
                }
            }
            this.setAbort = function(jqxhr)
            {
                var sb = this.statusbar;
                this.abort.click(function()
                {
                    jqxhr.abort();
                    sb.hide();
                });
            }
        }

        function handleFileUpload(files,obj)
        {
           for (var i = 0; i < files.length; i++) 
           {
                var fd = new FormData();
                fd.append('file', files[i]);
            
                var status = new createStatusbar(obj); //Using this we can set progress.
                status.setFileNameSize(files[i].name,files[i].size);
                sendFileToServer(fd,status);
           
           }
        }

        var $this = this;

        return this.each(function(){


            var obj = $(this);
            obj.on('dragenter', function(e){
                e.stopPropagation();
                e.preventDefault();

                $(this).css('border', '2px solid #0B85A1');
            });
            obj.on('dragover', function(e){
                 e.stopPropagation();
                 e.preventDefault();
            });
            obj.on('drop', function(e) {
                 $(this).addClass('drop');
                 e.preventDefault();
                 var files = e.originalEvent.dataTransfer.files;

                 //We need to send dropped files to Server
                 if( !settings.url ){
                    handleFileUpload(files,obj,obj.attr('action'));
                 }else {
                     handleFileUpload(files,obj,settings.url);
                 }
            });
        });

        $(document).on('dragenter', function(e){
            $(this).addClass('drag-enter')
            e.stopPropagation();
            e.preventDefault();
        });
        $(document).on('dragover', function(e) {
            $(this).addClass('drag-over')
            e.stopPropagation();
            e.preventDefault();
        });
        $(document).on('drop', function(e) {
            e.stopPropagation();
            e.preventDefault();
        });

        return this;
    }

}else{

    console.log('jQuery is required');

}
