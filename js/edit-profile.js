function animatedhideelements(){
	new DrawFillSVG({elementId: "helicopter"});
	new DrawFillSVG({elementId: "hot-air-balloon"});
	new DrawFillSVG({elementId: "copy-edit-profile"});
	new DrawFillSVG({elementId: "balloon"});
	new DrawFillSVG({elementId: "camera"});
	new DrawFillSVG({elementId: "car"});
	new DrawFillSVG({elementId: "trolley"});
}
jQuery('#updateP').click(function(){
  //console.log('hola, soy un click');

  if(jQuery('#pinguino').valid()){
    //console.log('valido');
    //console.log('hola, es válido');
    var nombre=jQuery('#name').val(),
    apellido=jQuery('#apellido').val(),
    email=jQuery('#email').val(),
    provincia=jQuery('#provincia').val(),
    ciudad=jQuery('#ciudad').val(),
    lepas=jQuery('#lepas').val(),
    lepasc=jQuery('#lepasc').val(),
    aceptar=jQuery('#slideThree').val(),
    idR=jQuery('#idRs').val(),
    urlR='eventos.php';

    jQuery.ajax({
            url: urlR,
            dataType:'json' ,
            type: 'POST',
            data:{
              nombre:nombre,
              apellido:apellido,
              email:email,
              provincia:provincia,
              ciudad:ciudad,
              lepas:lepas,
              lepasc:lepasc,
              aceptar:aceptar,
              idR:idR,
              vrtCrt:'actualizaP'
            },
            success: function (data){
              console.log(data);
            }, 
            error: function(result) {
                      console.log(result,'error');
              }
            });
            return false;
  }
});