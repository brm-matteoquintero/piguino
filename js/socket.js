


 	function canvasChange(i){
			socket.emit('video-changed-state',{actFrame:i});
	}

	// Initialize the Reveal.js library with the default config options
	// See more here https://github.com/hakimel/reveal.js#configuration

	//var myElement = document.getElementById('dVideo');

// create a simple instance
// by default, it only adds horizontal recognizers
//var mc = new Hammer(myElement);

	// Connect to the socket
	var socket = io.connect();

	// Variable initialization
	var form = jQuery('form.login');


	var key = "", animationTimeout;

	// When the page is loaded it asks you for a key and sends it to the server
	$(document ).ready(function() {

	/*	$('#play-video').click(function(){
			$('#play-video').hide();
			$('#video').show();
		});*/
		$('#video').removeAttr("controls");   
    	socket.emit('load');
    	socket.on('pc',function(data){
    		console.log(data.val);
			socket.emit('login',{username:'user',room:data.val});
    		$('#codeGen').text(data.val);
    		$('#infoText').text('Ingresa el siguiente codigo en tu celular');
    	});
    	socket.on('mobile',function(){
    		$('#form').show();
    	});
	});

	$('#submit').click(function(e){


				e.preventDefault();

		key = $('#celCode').val().trim();

		// If there is a key, send it to the server-side
		// through the socket.io channel with a 'load' event.

		if(key.length) {

			socket.emit('login',{username:'user',room:key});
			$('#form-code').hide();
			$('#sprite,#action-text').show();
			
		}
	})





socket.on('roomcreated',function(data){
	socket.emit('adduser', data);
});

socket.on('access', function(data){

		// Check if we have "granted" access.
		// If we do, we can continue with the presentation.

		if(data.access === "granted") {
			 
			// Unblur everything
			//presentation.removeClass('blurred');
			console.log(data);
			form.hide();

			//console.log(data.platform);

				/*mc.on("pandown panleft panright", function(ev) {
					if(data.platform==="Mobile")
					{
						socket.emit('video-changed-state',{act:$('#video').get(0).paused,timelapse: $('#video').get(0).currentTime});
					}	
				});*/
			
			socket.on('play',function(data){
				animaCanvas(data);
						//$('video').get(0).currentTime=data.timelapse;
						//console.log(data.timelapse);
						//$('#video').trigger(data.act);
					});
					socket.on('pause',function(data){
				
						//$('video').get(0).currentTime=data.timelapse;
						//console.log(data.timelapse);
						$('#video').trigger(data.act);
					});

		}
		else {
		
			secretTextBox.addClass('denied animation');
			
			animationTimeout = setTimeout(function(){
				secretTextBox.removeClass('animation');
			}, 1000);

		}

	});


