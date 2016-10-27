var actionglob=0;actionslength=null,mobile = false,device="",complete=0,toframe=0,contmove=0,interval=1,direction="",text=null,textdesktop=null,textmobile=null,from=null,to=null,folder=null,basename=null,ext=null,direction=null,playmode=null,sprite=null,actions=[],numAction=0,datacurrent=null,actionname=null,interactions=0,flagactionglob=1;

// device detection

function animatedhideelements(){

	new DrawFillSVG({elementId: "copy-up-synchronize"});
	
	if (mobile) {
		new DrawFillSVG({elementId: "icon-mobile-synchronize-2"});
		new DrawFillSVG({elementId: "icon-desktop-synchronize-2"});
		$("#info").detach().appendTo('article');
		$("#btn-sync").html("sincroniza con tu PC");
		$("#btn-no-sync").html("continuar sin experiencia full screen");
		$('#icon-mobile-synchronize').remove();
		$('#icon-desktop-synchronize').remove();
		device="mobile"; 
	}else{
		new DrawFillSVG({elementId: "icon-mobile-synchronize"});
		new DrawFillSVG({elementId: "icon-desktop-synchronize"});
		$("#btn-sync").html("sincroniza con tu móvil");
		$("#btn-no-sync").html("continuar sin experiencia móvil");
		$('#icon-mobile-synchronize-2').remove();
		$('#icon-desktop-synchronize-2').remove();
		device="desktop";
	}
	
}

$(document).ready(function(){
		
	$("#box-synchronize").css("background-image","url('img/recipes/"+syncCAjax( localStorage.getItem("video") ,'desc')+".png')")
	$("#plans-image").css("background-image","url('img/plans/"+syncCAjax( localStorage.getItem("video") ,'desc')+".jpg')")

	$('#send-code').click(function(){
		setTimeout(function(){
			comparaCodigo();
		},1000)
		
	});

	$('#synchronize').click(function(){
		synchronize();
	});

	$('#no-synchronize,#synchronize a').click(function(){
		nosynchronize();
	});

	$('#info').click(function(){
	  $("#copy-up-synchronize, #copy-steps-synchronize, #info").hide();
	  $("#plans").show();
	});

	$('#plans-close').click(function(){
	  $("#copy-up-synchronize, #copy-steps-synchronize, #info").show();
	  $("# ").hide();
	});


	$('#code-mobile').focus( function() {
	  $("footer").hide();
	});
	
	$('#code-mobile').blur( function() {
	  $("footer").show();
	});

});

// inicializa las acciones de una receta
function initializeactions(idRecipe){

	setrecipe(idRecipe);
		
	actions = getactionjson(idRecipe);
	actionslength=actions.length;
	
	createcanvas();
	
	$("#steps-action.action-helpers").html("");
	showmessage("<strong>¿Cómo puedo disfrutar de la receta?</strong> <p> Solo debes completar 3 retos y podrás compartir la receta con tus amigos.  <br> ¡Mucha Suerte!</p>",null,6000);
	
	for (var i = 0; i < actionslength; i++) {
		$("#steps-action.action-helpers").append("<div class='step' id='step-"+i+"' data-n='0'> <span> 0/"+getinteractions()+" </span></div>");
	} 
}
// Muestra alerta con mensaje
function showmessage(message,callback,time){
	$("#content-message").show();
	$("#content-message span").html(message);
	setTimeout(function(){ 
		$("#content-message").hide();
		$("#content-message span").html("");
		if (callback!=null || callback!=undefined) {
			callback(); 
		}
	},time)
}

// Suma cada interacción de una acción
function nextinteractions(){
	var stepaction = $("#step-"+getaction());
	var stepactionspan = $("#step-"+getaction()+" span");
	var interation=stepaction.data("n")+1;

	if(interation<=getinteractions()){
		
		stepaction.addClass("animated bounce slow");
		stepaction
		.on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
		 function(e){
		 	stepaction.removeClass("animated bounce slow");
		 	 if(  interation  == getinteractions() ) { stepaction.addClass("unlock"); nextcanvas(); }
		    $(this).off(e);
		 });	
		 
		stepaction.data( "n", interation );
		stepactionspan.text( interation+"/"+getinteractions());
	
	}

}

// Trae el json de la configuración de las recetas
function getactionjson(idRecipe){
	var getjson;
	$.ajaxSetup({ async: false });
	$.getJSON( "js/actions.json?444", function( data ) {
		getjson = data[idRecipe].action;
	});
	return getjson;
}

// Crea el área sensible para el móvil
function createmobilearea(){
	$("#code-synchronize").remove();
	$("#info").remove();
	$("#desktop-mobile-area").show();
	$(".sprite").detach().appendTo('#desktop-mobile-area')
}

// Crea los sprite
function createsprite(){
	
	switch(device) {
	    case "mobile-desktop":
			text=textmobile;
			sprite=spritemobiledesktop;
	    break;
	    case "mobile":
			text=textmobile;
			sprite=spritemobile;
	    break;
	    case "desktop":
			text=textdesktop;
			sprite=spritedesktop;
	    break;
	}
	
	$("#action-text").html(text);
	$(".sprite").attr("id",sprite);

}

function loadersynchronize(){
	showmessage("Sincronizando",function(){
		showmessage("Se conecto correctamente",null,3000);
	},4000);
}

function nosynchronize(){

	device=(mobile) ? "mobile" : "desktop"; 
	initializeactions(syncCAjax( localStorage.getItem("video") ,'desc'));
	
}

// Muestra elementos al sincronizar
function synchronize(){
	device="mobile-desktop";
	if (mobile) {
		$("#code-synchronize").show();
		$('#box-synchronize').remove();
	}else{
		$("#synchronize").addClass("active");
		$('#no-synchronize').remove();
		$('#icon-mobile-synchronize').remove();
		
		$('#copy-up-synchronize').remove();
		$('#copy-steps-synchronize').show();
		$('#steps-synchronize').show();
		$('#qr-code').show();
		$('#synchronize a').show()
		$("#icon-synchronize").hide();
		peticionCodigo();
	}
}

// Trae la nueva configuración del canvas al cambiar la acción
function setconfigcanvas(){
	datacurrent = actions[numAction];
	actionname = datacurrent.action;
	textdesktop=datacurrent.text.desktop;
	textmobile=datacurrent.text.mobile;
	spritemobiledesktop=datacurrent.sprite.mobiledesktop;
	spritemobile=datacurrent.sprite.mobile;
	spritedesktop=datacurrent.sprite.desktop;
	from=datacurrent.from;
	to=datacurrent.to;
	folder=datacurrent.folder;
	basename=datacurrent.basename;
	ext=datacurrent.ext;
	direction=datacurrent.direction;
	playmode=datacurrent.playmode;
	interactions=datacurrent.interactions;
}

// Trae el número de insteracciones de la acción (variable global)
function getinteractions(){	return interactions;}

// Trae la acción actual (variable global)
function getaction(){ return numAction;}

// guarda el id de la receta actual (variable global)
function getrecipe(action){return actionglob;}

// guarda el id de la receta actual (variable global)
function setrecipe(action){actionglob=action;}

// guarda el id de la receta actual (variable global)
function getflagaccion(){return flagactionglob;}

// guarda el id de la receta actual (variable global)
function setflagaccion(flag){flagactionglob=flag;}

// Retorna el máximo de imágenes de cada acción
function getnumimframes(){return to;}

// Se define el nombre de la acción en el json y la acción a la que va hacer referencia
function gesturesmobile(){
	switch(actionname) {
		case "swipex": gestureswipe("x"); break;
	    case "swipey": gestureswipe("y"); break;
	    case "rotate": gesturerotate(); break;
		case "tap": gestureHammer("tap","tap"); break;
		case "doubletap": gestureHammer("doubletap","doubletap"); break;
	}
}

// Crea un nuevo canvas de la acción
function createcanvas(){
	setconfigcanvas();
	
	$("#box-synchronize").remove();	
		
	switch(device) {

	    case "mobile-desktop":
			interval=5;
			if (mobile) {
				gesturesmobile();
				$("article").addClass(device); 
				$("#box-action").remove();
				$("#action").show();
			}

			if (!mobile) {
				$(".action-helpers").hide();
				$("#box-action").show();
				Sequencer.init({from:from, to: to, folder:folder, baseName:basename, ext:ext});  
			}
	    break;

	    case "mobile":
	    	$(".action-helpers").hide();
	    	gesturesmobile();
			interval=10;
			$("article").addClass(device); 
			$("#box-action").show(); 
			Sequencer.init({from:from, to: to, folder:folder, baseName:basename, ext:ext});
	    break;

	    case "desktop":
	    	$(".action-helpers").hide();
			interval=1;
			$("#box-action").show(); 
			Sequencer.init({from:from, to: to, folder:folder, baseName:basename, ext:ext, direction:direction, playMode:playmode});
	    break;
	}
	createsprite();
}

// Remueve los eventos Listener de un elemento
function recreateNode(el, withChildren) {
  if (withChildren) {
    el.parentNode.replaceChild(el.cloneNode(true), el);
  } else {
    var newEl = el.cloneNode(false);
    while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
    el.parentNode.replaceChild(newEl, el);
  }
}



// Realiza el movimiento del canvas(Secuencia de imágenes)
function moveframe(percentage,action){
	if (percentage != 0) {
		var framesmove=Math.round((to/interval)*percentage/100);
		if(framesmove > 0 ){
			toframe=(Sequencer.getCurrent() + framesmove);
			direction="right";
		}else if(framesmove < 0){
			toframe=Sequencer.getCurrent() - (framesmove*-1);
			direction="left";
		}
		if (parseInt(framesmove) != 0 ) {
			Sequencer.toFrame(toframe,direction,interval);
		}else{
			setflagaccion(1);
		}
	}
}

// Cambio de canvas
function nextcanvas(){
	// Finaliza receta
	if (!mobile) {terminaAccion();}
	
	if (numAction == (actions.length-1)) {
		unlock();
	}else{
		// Cambio de accion o canvas
		// Suma la acción actual
		showmessage("<strong>¡Perfecto has completado el reto #"+(numAction+1)+"!</strong><p>Solo te faltan "+(actionslength-(numAction+1))+" retos para disfrutar de la receta</p>",function() {
			numAction++;
			$("#box-action canvas").remove();
			createcanvas(); 
		},3500)
	
	}	
}

// Finalización de una receta 
function unlock(){
	showmessage("<strong>Felicitaciónes has desbloqueado la receta</strong><p>ahora puedes compartir la receta con tus amigos</p> ",function(){ window.location="video";},4000);
}	
