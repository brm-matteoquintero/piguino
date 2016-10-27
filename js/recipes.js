function animatedhideelements(){
	
	new DrawFillSVG({elementId: "helicopter"});
  new DrawFillSVG({elementId: "hot-air-balloon"});
  new DrawFillSVG({elementId: "welcome"});
  new DrawFillSVG({elementId: "hashtag"});
  new DrawFillSVG({elementId: "balloon"});
  new DrawFillSVG({elementId: "camera"});
  new DrawFillSVG({elementId: "message"});
  new DrawFillSVG({elementId: "arrow-up"});
  new DrawFillSVG({elementId: "arrow-down"});
  new DrawFillSVG({elementId: "line-up"});
  new DrawFillSVG({elementId: "line-down"});
	
	setTimeout(function(){ 
		$("#cream-jar").addClass("animated zoomIn");
		$("#name").addClass("animated zoomIn");
	}, 2000);
	
}




$(document).ready(function(){
	
	$('#thumbnails').mixItUp(
		{
			controls: {
				luve: true
			},
			load: {
				filter: '.category-1',
			},
			animation: {
				enable: true,
				queue: true,
				queueLimit: 1,
				queueLimit: 1,
				duration: 500,
				effects: 'stagger(200ms) translateX(100%) fade translateY(100%)',
				easing: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
				animateChangeLayout: true,
				animateResizeTargets: true
			}
		}
	);

	$('#arrow-up').attr("data-filter",".category-4");
	$('#arrow-down').attr("data-filter",".category-2");
	$('#arrow-up,#arrow-down').attr("data-current",".category-1");
	
	$( "#arrow-up,#arrow-down" ).on( "click", function() {

		var nextcategory=$(this).attr("data-filter");
		var currentcategory=$(this).attr("data-current");
		
		$('#arrow-up,#arrow-down').hide();
		$('#arrow-up,#arrow-down').attr("data-current",nextcategory);
		
		setTimeout(function(){
			
			switch(nextcategory){
				case ".category-1":
					
					$('#arrow-up').attr("data-filter",".category-4");
					$('#arrow-down').attr("data-filter",".category-2");
					
				break;
				case ".category-2":
					
					$('#arrow-up').attr("data-filter",".category-1");
					$('#arrow-down').attr("data-filter",".category-3");		
					
				break;
				case ".category-3":
					
					$('#arrow-up').attr("data-filter",".category-2");
					$('#arrow-down').attr("data-filter",".category-4");		
					
				break;
				case ".category-4":
				
					$('#arrow-up').attr("data-filter",".category-3");
					$('#arrow-down').attr("data-filter",".category-1");		
					
				break;
			}
		 	
		 	$('#arrow-up,#arrow-down').show();
		
			
		},2000);
	
	});

});