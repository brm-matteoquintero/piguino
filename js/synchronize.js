var actionglob=0;actionslength=null,mobile = false,device="",complete=0,toframe=0,contmove=0,interval=1,direction="",text=null,textdesktop=null,textmobile=null,from=null,to=null,folder=null,basename=null,ext=null,direction=null,playmode=null,sprite=null,actions=[],numAction=0,datacurrent=null,actionname=null,interactions=0,flagactionglob=1;

// device detection
var mobile=false;

if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) mobile = true;

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

	$('#next-canvas').click(function(){

		$("#message-canvas").hide();
		$("#bgbox").remove();
		$(".action-helpers").show();
		$("#step-"+getaction()).removeClass("deactivated").addClass("active");

	});

	$('#no-synchronize,#synchronize a').click(function(){
		nosynchronize();
	});

	$('#info').click(function(){
	  $("#copy-up-synchronize, #copy-steps-synchronize, #info").hide();
	  $("#plans").show();
	});

	$('#plans-close').click(function(){
		if (!mobile) { $("#copy-steps-synchronize").show();}
	  $("#info").show();
	  $("#copy-up-synchronize").show();
	  $("#plans").hide();
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
	var type=(mobile) ? "over":"canvas";
	showmessage("¿Cómo puedo disfrutar de la receta?","Solo debes completar 3 retos y podrás compartir la receta con tus amigos.  <br> ¡Mucha Suerte!",null,6000,type);
	
	for (var i = 0; i < actionslength; i++) {
		$("#steps-action.action-helpers").append("<div class='step deactivated' id='step-"+i+"' data-n='0'> <span> 0/"+getinteractions()+" </span></div>");
	} 
}
// Muestra alerta con mensaje
function showmessage(title,message,callback,time,type){

	switch(type){
		case "canvas":
			$("#message-canvas strong").html(title);
			$("#message-canvas p").html(message);
		break;
		case "over":

			$("#content-message").show();
			$("#content-message span").append("<strong>"+title+"</strong>");
			$("#content-message span").append("<p>"+message+"</p>");

			setTimeout(function(){ 
				$("#content-message").hide();
				$("#content-message span").html("");
				if (callback!=null || callback!=undefined) {
					callback(); 
				}
			},time)

		break;
	}

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
		 	 if(  interation  == getinteractions() ) { stepaction.addClass("unlock"); stepaction.removeClass("active"); nextcanvas(); }
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
	$.getJSON( "js/actions.json", function( data ) {
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

function animatedsteps(){


	for (var i = 0; i < actionslength; i++) {

		var stepaction = $("#step-"+i);
		stepaction.addClass("animated bounce slow");

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
		var type=(mobile) ? "over":"canvas";
		showmessage("¡Perfecto has completado el reto #"+(numAction+1)+"!","Solo te faltan "+(actionslength-(numAction+1))+" retos para disfrutar de la receta",function() {
			numAction++;
			$("#box-action canvas").remove();
			createcanvas(); 
		},3500,type)
	
	}	
}

// Finalización de una receta 
function unlock(){
	showmessage("Felicitaciónes has desbloqueado la receta","ahora puedes compartir la receta con tus amigos",function(){ window.location="video";},4000,"over");
}	
