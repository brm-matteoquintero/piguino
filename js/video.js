function animatedhideelements(){
	var left='calc(50% - '+$('#video').width()/2+"px)";
	console.log(left);

    $('#shadows').css('width', $('#video').width());
    $('#shadows').css('left', left);
    $('#shadows').css('height', $('#video').height());
}

$(document).ready(function(){
	$(this).prop("controls", true);
	var videoEnc = localStorage.getItem("video");
    var idVideo = syncCAjax(videoEnc,'desc');
    console.log(idVideo);
    if (idVideo != undefined && idVideo > 0) {
    	$.ajaxSetup({ async: false });
    	var confirgE=window.btoa("st");
    	var videoStatus = videoEnc+confirgE;
    	var usu=getCookie("ywd_usu");
    	if(usu!='' && usu!=undefined && usu!=null){
    		localStorage.setItem('videost', videoStatus);    		
    	}
		$.getJSON( "js/actions.json?56456", function( data ) { video=data[idVideo].namevideo });
		console.log(video);
		$("#video")[0].src="_data/videos/"+video;
		document.getElementById('video').play();
    }else{
        window.location="/planpinguino/";
    }
    
	// Play video automático
	//$('#video').trigger('play');
	
	document.getElementById('video').addEventListener('ended',finalizaVideo,false);
   
	// Envía al home- Todas las recetas
	$('#go-recipes').click(function(){
		//window.location="/planpinguino/";
	});
	
});

 function finalizaVideo(e) {
        // What you want to do after the event
  
	
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