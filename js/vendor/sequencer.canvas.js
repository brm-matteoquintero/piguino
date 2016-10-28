// Sequencer - A fast(?) fullscreen image-sequence player.
// (c) 2012-13
// See README.txt or visit github (link below) for details
//
// Author:
//      Andreas Gysin
//      ertdfgcvb.com
//      @andreasgysin
//
// Project page:
//      http://ertdfgcvb.com/sequencer
//      http://github.com/ertdfgcvb/Sequencer


// images are passed around per array indexes (id) this may change
var Sequencer = (function () {
		var current = -1;
		var images = [];
		var playInterval;
		var playDir = 1;
		var lastLoaded = -1;
		var contFrameInterval=0;
		var stopFrameInterval;
		var nInteraction=0;
		var frameInterval;

		// configuration defaults
		var config = {
				folder              : "",           // folder containing the image sequence
				baseName            : "",           // a basename of the files, for example "DSC00"
				from                : 1,            // first image of the sequence, will be combined with the basename
				to                  : 10,           // last image of the sequence
				leadingZeroes       : 0,
				ext                 : "jpg",        // file extention, case sensitive
				step                : 1,            // increment: to load only even images use 2, etc
				bgColor             : "#FFFFFF",    // page background color
				scaleMode           : "cover",      // as in CSS3, can be: auto, cover, contain
				direction           : "y",          // mouse direction, can be x, -x, y, -y, applies only if playMode == "mouse"
				playMode            : "",      			// can be: mouse, loop, pong or none (in this case a nextImage() call has to be made somewhere
				playInterval        : 20,           // interval in milliseconds beteen each frame, applies only if playMode != "mouse"
				progressDiam        : "90",        // progress diameter
				progressFontFamily  : "stick",
				progressFontSize    : "26px",
				progressBgColor     : "#e53027",
				progressFgColor     : "#FFFFFF",
				progressMode        : "circle",     // can be: circle, bar, none
				progressHeight      : "5px",        // if progressMode == "bar"
				progressShowImages  : true,         // display images while loaded
				simultaneousLoads   : 4            // how many images to load simultaneously, browser limit is 4?
		};

		function init(customConfig){
				// config override
				for(prop in customConfig){
						config[prop] = customConfig[prop];
				}
				images=[];
				configureBody();
				Preloader.init(config, images, onImageLoaded, onPreloadComplete);

				window.addEventListener( 'resize', onWindowResize, false );
		}

		function onImageLoaded(e){
				if (e.id > lastLoaded && config.progressShowImages){ // to not have a back and forward hickup… but some images will be skipped
						showImage(e.id);
						lastLoaded = e.id;
				}
				showImage(0);
		}

		function onPreloadComplete(e){
				setPlayMode(config.playMode);
				play();
		}

		function setPlayMode(mode){
				stop();
				config.playMode = mode;
		}

		function setCurrent(frame){
			current=frame;
		}
		
		function play(){
				stop();
				if (config.playMode === 'mouse'){
						var disVideo = document.getElementById("box-action");
						disVideo.addEventListener('mousemove', onMouseMove, false);
						disVideo.ontouchmove = function(e){
								onMouseMove(e.touches[0]);
								return false;
						}
				} else if (config.playMode === 'loop' || config.playMode === 'pong') {
						playInterval = setInterval(nextImage, config.playInterval);
				}
		}

		function stop(){
				document.removeEventListener('mousemove', onMouseMove);
				if (playInterval) {
						clearInterval(playInterval);
						playInterval = null;
				}
		}

		function nextImage(interval){
			var nextId= (current >= images.length-1) ? 0 : ++current; //loop
			showImage(nextId+interval); 
		}

		function previousImage(interval){
			var previousId = (current <= 0) ? images.length-1 : --current; //loop
			showImage(previousId-interval);
		}


		function toFrame(to,direction,interval){

				stopFrameInterval=(current <= to ) ? (to-current) : (current-to);

				frameInterval = setInterval(function(){ 
					
					contFrameInterval++;

					switch(direction){
						case "right": nextImage(interval); break;
						case "left": previousImage(interval); break;
					}
					
					// si el número de interacciones es igual al total de interacciones, reinicia las variables
					if (nInteraction>=getinteractions()) {
						nInteraction=0;
						clearInterval(frameInterval);
						contFrameInterval=0;
						setflagaccion(1);
						setStatusActionMobile(1);
					}
					
					// stop hasta el tope del movimiento
					if (contFrameInterval == stopFrameInterval) {
						setflagaccion(1);
						setStatusActionMobile(1);
						clearInterval(frameInterval);
						contFrameInterval=0;
					}
					
					// Suma el número de interacciones
					if (current>=getnumimframes()) {nInteraction++;nextinteractions();}

				}, 100);

		}

		function clearIntervalFrames(){
			clearInterval(frameInterval);
		}


		function getCurrent(){
			return current;
		}
		
		
		function onMouseMove(e){
			onActionMouseMove(e,config,images,current);
		}

		function onWindowResize(){
				canvas.height = document.getElementById("box-action").offsetHeight;
				canvas.width = document.getElementById("box-action").offsetWidth;
				showImage(current);
		}

		function configureBody(){
				canvas = document.createElement('canvas');
				canvas.height = document.getElementById("box-action").offsetHeight;
				canvas.width = document.getElementById("box-action").offsetWidth;
				canvas.style.display = "block";
				context = canvas.getContext('2d');
				document.getElementById("box-action").appendChild(canvas);
		}

		function showImage(id){
				if (id >= 0 && id < images.length){
						var img = images[id];
						var ca = canvas.width / canvas.height;
						var ia = img.width / img.height;
						var iw, ih;

						if (config.scaleMode == "cover") {
								if (ca > ia) {
										iw = canvas.width;
										ih = iw / ia;
								} else {
										ih = canvas.height;
										iw = ih * ia;
								}
						} else if (config.scaleMode == "contain") {
								if (ca < ia) {
										iw = canvas.width;
										ih = iw / ia;
								} else {
										ih = canvas.height;
										iw = ih * ia;
								}
						} else if (config.scaleMode == "auto") {
								iw = img.width;
								ih = img.height;
						}

						var ox = canvas.width/2 - iw/2;
						var oy = canvas.height/2 - ih/2;
						context.drawImage(img, 0, 0, img.width, img.height, Math.round(ox), Math.round(oy), Math.round(iw), Math.round(ih));
						current = id;
				}
		}

		return {
				init : init,
				nextImage : nextImage,
				previousImage : previousImage,
				setPlayMode : setPlayMode,
				play : play,
				showImage : showImage,
				toFrame : toFrame,
				getCurrent : getCurrent,
				setCurrent : setCurrent,
				clearIntervalFrames:clearIntervalFrames,
				stop : stop
		};
})();

var Preloader = (function(){
		var progress=null;
		var bgbox=null;
		var queue=null;
		var images=null;
		var loaded = 0;
		var onImageLoadedCallback, onPreloadCompleteCallback; //needs a better way. Override?


		function init(config, arrayToPopulate, onImageLoaded, onPreloadComplete){
				Preloader.resetVarPreloader();
				images = arrayToPopulate; //the array that will be populated with the loaded images
				onImageLoadedCallback = onImageLoaded; //event functions… crappy way.
				onPreloadCompleteCallback = onPreloadComplete;

				var tot = Math.floor((config.to - config.from + 1) / config.step);
				queue = new Array(tot);
				//images = new Array(tot);

				buildProgress(config);

				for (var i=0; i<tot; i++){
						var num = config.from + i * config.step;
						if (config.leadingZeroes > 0) num = (1e15+num+"").slice(-config.leadingZeroes);
						if(num <10){
							num="00"+num
						}else if(num >=10 && num<=99){
							num="0"+num
						}
						var src = config.folder + "/" + config.baseName + num + "." + config.ext;
						queue[i] = {src : src, id : i}; //two distinct arrays just to keep a "clean" image list instead of a custom loaderObject list, maybe this approach is overcomplicated
						images[i] = new Image();
				}

				setTimeout(function(){ //give it a bit of breath… safari needs to need that.
						var num = Math.max(1, config.simultaneousLoads);
						for (var i=0; i<num; i++){
								loadNext();
						};
				}, 300);
		}

		function resetVarPreloader(){
			progress=null;
			bgbox=null;
			queue=null;
			images=null;
			loaded = 0;
			onImageLoadedCallback, onPreloadCompleteCallback; //needs a better way. Override?
		}

		function onPreloadComplete(e){
				//console.log(e.length + " images loaded.");
				if (typeof onPreloadCompleteCallback === 'function') onPreloadCompleteCallback(e); //needs absolutely a better way
		}

		function onImageLoaded(e){
				//console.log("loaded image [" + e.id + "]");
				if (typeof onImageLoadedCallback === 'function') onImageLoadedCallback(e); //needs absolutely a better way
		}

		function loadNext(){
				if (queue.length > 0){
						var o = queue.shift();
						images[o.id].src = o.src;
						//images[o.id].id = o.id; // UGLY HACK!
						images[o.id].onload = function(){
								var id = images.indexOf(this); //not the fastest way to get an id. should be stored in a property somewhere. loaderObject?
								onImageLoaded({img:this, id:id});
								if (progress) progress.update(loaded);
								loaded++;
								if (loaded == images.length ){
										removeProgress();
										onPreloadComplete({images:images, length:images.length});
								} else {
										loadNext();
								}
						}
				}
		}

		function buildProgress(config){

				bgbox = document.createElement('div');
				bgbox.style.width = "101%";
				bgbox.style.height = "101%";
				bgbox.style.backgroundColor = "#fff";
				bgbox.style.position = "absolute";
				bgbox.style.top = "-1px";
				bgbox.style.left = "-1px";
				bgbox.id = "bgbox";
				bgbox.style.zIndex = 40;
				document.getElementById("box-action").appendChild(bgbox);

				if (config.progressMode == "circle"){
						progress = document.createElement('div');
						span = document.createElement('span');
						progress.id = "progress";
						progress.style.width = config.progressDiam + "px";
						progress.style.height = config.progressDiam + "px";
						progress.style.lineHeight = config.progressDiam + "px";
						progress.style.textAlign = "center";
						progress.style.color = config.progressFgColor;
						progress.style.backgroundColor = config.progressBgColor;
						progress.style.borderRadius = config.progressDiam / 2 + "px";
						progress.style.position = "absolute";
						progress.style.right = "5px";
						progress.style.top = "5px";
						progress.style.marginTop = - config.progressDiam / 2 + "px";
						progress.style.marginLeft = - config.progressDiam / 2 + "px";
						progress.style.fontFamily = config.progressFontFamily;
						progress.style.fontSize = config.progressFontSize;
						progress.style.zIndex = 1000;
						progress.innerHTML = "loading";
						progress.update = function(num){
								var t = Math.floor((config.to - config.from + 1) / config.step);
								var p = Math.round(num / (config.to - config.from) * 100);
								progress.innerHTML = p+"%";
						}
						document.getElementById("bgbox").appendChild(progress);
						document.getElementById("bgbox").appendChild(span);
						
				} else if (config.progressMode == "bar") {
						progress = document.createElement('div');
						progress.id = "progress";
						progress.style.width = "0%";
						progress.style.height = config.progressHeight + "px";
						progress.style.backgroundColor = config.progressBgColor;
						progress.style.position = "fixed";
						progress.style.left = "0";
						progress.style.height = config.progressHeight;
						progress.style.bottom = "0";
						progress.style.zIndex = 42;
						progress.update = function(num){
								var p = Math.round(num / (config.to - config.from) * 100);
								progress.style.width = p + "%";
						}
						document.body.appendChild(progress);
				}
		}

		function removeProgress(){
				if (progress) {
						progress = null;
				}
		}

		return {
				init : init,
				images : images,
				resetVarPreloader: resetVarPreloader
		};
})();
