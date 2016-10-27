function animatedhideelements(){
  new DrawFillSVG({elementId: "helicopter"});
  new DrawFillSVG({elementId: "hot-air-balloon"});
  new DrawFillSVG({elementId: "copy-rp"});
  new DrawFillSVG({elementId: "balloon"});
  new DrawFillSVG({elementId: "camera"});
  new DrawFillSVG({elementId: "car"});
  new DrawFillSVG({elementId: "trolley"});
}
jQuery(document).ready(function(){

	

  //Validación de campos
  jQuery('#remember').validate({
  
    //por defecto es false
    // debug:true,
  
    //Contenedor y clase donde se pinta el error
    errorElement: "div",
    errorClass: "mensaje",
  
    //Campos a validar
    rules:{
      email: {
        required: true,
        email:true,       
      }
      
    },
  
    //Mensaje de error cuando no cumple la regla
    messages:{
      email: {required: 'Por favor ingrese un e-mail', email:'Ingrese un e-mail con formato v&aacute;lido',},
     },
  
    //ubicación del mensaje de error
  
    errorPlacement: function (error, element) {       
  
        if( element.attr('name') == 'check'){

          error.insertAfter(element.next());

        }else{

          error.insertAfter(element);
        }
      
  
    }
  
  });

  jQuery('#rememberB').click(function(){
  	//console.log('hola');
  	if(jQuery('#remember').valid()){
    //console.log('valido');
    //console.log('hola, es válido');
    var email=jQuery('#email').val(),
    urlR='eventos.php';

    jQuery.ajax({
            url: urlR,
            dataType:'json' ,
            type: 'POST',
            data:{
              email:email,
              vrtCrt:'recuperar'
            },
            success: function (data){
              console.log(data);
              jQuery('.mensaje').append('<p>'+data+'</p>').show('fade');
            }, 
            error: function(result) {
                      console.log(result,'error');
              }

            });
            return false;
  }
  });

});
