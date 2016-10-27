function animatedhideelements(){
  new DrawFillSVG({elementId: "helicopter"});
  new DrawFillSVG({elementId: "hot-air-balloon"});
  new DrawFillSVG({elementId: "hashtag"});
  new DrawFillSVG({elementId: "balloon"});
  new DrawFillSVG({elementId: "camera"});
  new DrawFillSVG({elementId: "car"});
  new DrawFillSVG({elementId: "trolley"});
  new DrawFillSVG({elementId: "copy-rp-alert"});
}
$(function(){
	setTimeout(function(){ 
		$("#cream-jar").addClass("animated zoomIn");
	}, 2000);
});

jQuery(document).ready(function(){
  /*Cambio de contraseña*/
  jQuery("#changeP").click(function(){
    console.log("Hola");
    var lepas=jQuery("#lepas").val(),
    lepasc=jQuery("#lepasc").val();
    urlR='eventos.php';
                 
    jQuery.ajax({
            url: urlR,
            dataType:'json' ,
            type: 'POST',
            data:{
              lepas:lepas,
              lepasc:lepasc,
              vrtCrt:'changeP'
            },
            success: function (data){
              console.log(data);
              window.location="perfil.php";
            }, 
            error: function(result) {
                      console.log(result,'error');
              }

            });
            return false;

    });
});
