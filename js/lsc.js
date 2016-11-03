/*Ceaciones*/
jQuery(document).ready(function() {
    //console.log('hola');
    //localStorage.clear();
    $(".mix").on("click", function() {
        /*Comprobación de video*/
         var videost = localStorage.getItem('videost');
        if(videost!== null){
            loadAjax(videost,'rec');
        }else{
            
        var randoR=Array("1","5","8","13","14");
        var videoi = jQuery(this).attr('data');
        //videoi=videoi.replace("thumbnail-","");
        var data = syncCAjax(videoi,'enc');
        if (window.localStorage !== undefined) {
            var fields = videoi;
            //console.log(fields);
            localStorage.setItem("video", JSON.stringify(data));
            if(jQuery.inArray(videoi.replace("thumbnail-",""), randoR)){
                //console.log(videoi);
                //console.log('no está');
                window.location = "video";
            }else{
                //console.log(videoi);
                //console.log('está');
                window.location = "preparacion";
            }
        } else {
            console.log("Storage Failed. Try refreshing");
        }
        
        //console.log(videoi);
        }
        return false;
    });
    
});

function clickReceta(videoi){
        /*Comprobación de video*/
                     console.log(videoi);
        var randoR=Array("1","5","8","13","14");
        var videoi = videoi;
        //videoi=videoi.replace("thumbnail-","");
        var data = syncCAjax(videoi,'enc');
        if (window.localStorage !== undefined) {
            var fields = videoi;
            //console.log(fields);
            localStorage.setItem("video", JSON.stringify(data));
            if(jQuery.inArray(videoi.replace("thumbnail-",""), randoR)){
                //console.log(videoi);
                //console.log('no está');
                window.location = "video";
            }else{
                //console.log(videoi);
                //console.log('está');
                window.location = "preparacion";
            }
        }         
        //console.log(videoi);
      
   
}

function syncCAjax(videoi,vrtCrt) {
    var urlV = 'syncC';
    var result;
    jQuery.ajaxSetup({
        async: false
    });
    jQuery.ajax({
        url: urlV,
        dataType: 'json',
        type: 'POST',
        data: {
            video: videoi,
            vrtCrt: vrtCrt
        },
        success: function(dataResult) {
            //console.log(dataResult,"idAccion");
            result = dataResult;
            localStorage.removeItem("videost");
        },
        error: function(result) {
            console.log(result, 'error');
        }
    });
    return result;
}

function setRecipe(idRecipe,idUser) {
    var urlV = 'setRecipe';
    var result;
    jQuery.ajaxSetup({
        async: false
    });
    jQuery.ajax({
        url: urlV,
        dataType: 'json',
        type: 'POST',
        data: {
            idUsuario: idUser,
            idReceta: idRecipe
        },
        success: function(dataResult) {
            //console.log(dataResult,"idAccion");
            result = dataResult;
        },
        error: function(result) {
            console.log(result, 'error');
        }
    });
    return result;
}

function loadAjax(videost,vrtCrt){
    var urlV = 'syncC';
    var result;
  jQuery.ajax({ 
  url: urlV,
  dataType: 'json',
  type: 'POST',
  data: {
            video: videost,
            vrtCrt: vrtCrt
        },
    success:function(data){
     console.log(data);
     var fr=getCookie("ywd_fr");
     //console.log(fr);
     if(fr==undefined){
        fr='';
     }
     if(data=='enviarR' && fr==''){
         window.location='registro';
     }else{
       $(".mix").on("click", function() {
        var videoi = jQuery(this).attr('data');
        clickReceta(videoi);
        });
     }
    }
  });
}

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
} 