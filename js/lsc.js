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
            
       
        var videoi = jQuery(this).attr('data');
        var data = syncCAjax(videoi,'enc');
        if (window.localStorage !== undefined) {
            var fields = videoi;
            //console.log(fields);
            localStorage.setItem("video", JSON.stringify(data));
            window.location = "preparacion";
        } else {
            console.log("Storage Failed. Try refreshing");
        }
        
        //console.log(videoi);
        }
        return false;
    });
    
});

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
     if(data=='enviarR'){
         window.location='registro';
     }
    }
  });
}