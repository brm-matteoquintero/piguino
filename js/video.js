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
    if (idVideo != undefined && idVideo > 0) {
    	$.ajaxSetup({ async: false });
    	var confirgE=window.btoa("st");
    	var videoStatus = videoEnc+confirgE;
		localStorage.setItem('videost', videoStatus);
		$.getJSON( "js/actions.json", function( data ) { video=data[idVideo].namevideo });
		$("#video")[0].src="_data/videos/"+video;
    }else{
        window.location="/";
    }
    
	// Play video automático
	//$('#video').trigger('play');
	
	document.getElementById('video').addEventListener('ended',finalizaVideo,false);
   
	// Envía al home- Todas las recetas
	$('#go-recipes').click(function(){
		window.location="/";
	});
	
});

 function finalizaVideo(e) {
        // What you want to do after the event
  
	
 }
 
 