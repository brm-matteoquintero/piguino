/* Acciones */

/* Mobile*/

// Realiza la acción de swipe para el eje X y Y
function gestureswipe(eje){
	recreateNode(document.getElementById('gesture-content'), true);
	var box1 = document.getElementById('gesture-content')
	var start = 0
	var end = 0
	var longMovi = 0
	// Inicia el evento swipe
	box1.addEventListener('touchstart', function(e){
		if (getflagaccion()==1) {
			var touchobj = e.changedTouches[0] // reference first touch point (ie: first finger)
			if (eje=="x") {start = parseInt(touchobj.clientX);}
			if (eje=="y") {start = parseInt(touchobj.clientY);}
			e.preventDefault();
		}
	}, false)
	// Finaliza el evento swipe
	box1.addEventListener('touchend', function(e){
		console.log(getflagaccion(),"getflagaccion()");
		if (getflagaccion()==1) {
			setflagaccion(0);
			var touchobj = e.changedTouches[0] // reference first touch point for this event
			if (eje=="x") {end = parseInt(touchobj.clientX);}
			if (eje=="y") {end = parseInt(touchobj.clientY);}
			longMovi = end-start;
			var tamano = (eje == "x" ) ? box1.offsetWidth: box1.offsetHeight;
			var porcentage=parseInt(longMovi*100/tamano);
			realizaAccion(porcentage);
			e.preventDefault();
		}
	}, false)
}


function gesturerotate(){
	recreateNode(document.getElementById('gesture-content'), true);
	// get a reference to an element
	var stage = document.getElementById('gesture-content');
	
	// create a manager for that element
	var mc = new Hammer.Manager(stage);
	
	// create a recognizer
	var Rotate = new Hammer.Rotate();
	
	var start = 0
	var end = 0
	var rotation = 0
	
	
	// add the recognizer
	mc.add(Rotate);
	
	// subscribe to events
	mc.on('rotate rotateend rotatestart', function(e) {
	    // do something cool
	    switch (e.type) {
	    	case 'rotatestart':
	    		if (getflagaccion()==1) {
	    			start= e.rotation;
	    		}
	    	break;
	    	case 'rotateend':
	    		if (getflagaccion()==1) {
					setflagaccion(0);
		    		end= e.rotation;
		    		rotation = end-start;
		    		var porcentage = ((rotation * 100) / 360);
		    		console.log(porcentage,"porcentage");
		    		realizaAccion(porcentage);
	    		}
	    	break;
	    }
	});
}





function gestureHammer(event,typeEvent){
	recreateNode(document.getElementById('gesture-content'), true);
	// get a reference to an element
	var stage = document.getElementById('gesture-content');
	// create a manager for that element
	var mc = new Hammer(stage);
	// typeEvent : panleft panright panup pandown tap press
	mc.on(typeEvent, function(ev) {
	    // do something cool
	    if (getflagaccion()==1) {
	    	setflagaccion(0);
			switch (event) {
				case 'tap':
		    		realizaAccion("25");
		    		console.log("tap");
		    	break;
		    	case 'doubletap':
		    		realizaAccion("25");
		    		console.log("doubletap");
		    	break;
			}
		}
	});
}

// Web


/* Mouse Move*/
var startMove=0;
var endMove=1;
var countMove=0;
function onActionMouseMove(e,config,images,current){
	var t = images.length;
	var m, w;
	var element = document.getElementById("box-action");
	if (config.direction == "x") {
			w = element.offsetWidth;
			wscreen = window.innerWidth;
			m = e.pageX;
	} else if (config.direction == "-x") {
			w = element.offsetWidth;
			wscreen = window.innerWidth;
			m = w - e.pageX - 1;
	} else if (config.direction == "y") {
			w = element.offsetHeight;
			wscreen = window.innerHeight;
			m = e.pageY;
	} else if (config.direction == "-y") {
			w = element.offsetHeight;
			wscreen = window.innerHeight;
			m = w - e.pageY - 1;
	}

	var id = Math.min(t, Math.max(0, Math.floor(m / w * t)));
	if (id != current){
			Sequencer.showImage(id);
			current = id;
	}
	
	var halfVideo = (w/2);
	var halfScreen = (wscreen/2);
	var maxLetfVideo = (halfScreen - halfVideo + (halfVideo/2));
	var maxRightVideo = (halfScreen + halfVideo - (halfVideo/2));
	// Moviento hasta la izquierda
	if (m <= (maxLetfVideo) && endMove==1) {
		endMove = 0;
		startMove = 1;
	}else if (m >= (maxRightVideo) && startMove==1) {
	// Moviento hasta la derecha
		startMove=0;
		endMove = 1;
		countMove++;
		nextinteractions();
	}else if (countMove==getinteractions()) {
	// Total de movimiento cumplidos - realiza acción
		startMove=0;
		endMove=1;
		countMove=0;
	}
}
