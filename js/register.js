function animatedhideelements(){
	new DrawFillSVG({elementId: "helicopter"});
	new DrawFillSVG({elementId: "hot-air-balloon"});
	new DrawFillSVG({elementId: "copy-register"});
	new DrawFillSVG({elementId: "balloon"});
	new DrawFillSVG({elementId: "camera"});
	new DrawFillSVG({elementId: "car"});
	new DrawFillSVG({elementId: "trolley"});
}

jQuery(document).ready(function(){

	//Validar letras con espacios y caracteres especiales//
  jQuery.validator.addMethod("letras", function(value, element){ return this.optional(element) || /^[a-z" "ñÑáéíóúÁÉÍÓÚ,.;]+$/i.test(value); });

 showerrors(jQuery('#pinguino'));

	/*Registro*/

	//Validación de campos
	jQuery('#pinguino').validate({
	
		//Campos a validar
		rules:{
			name: {required: true, letras:true, accept: "[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\s]+"},
			apellido: {required: true, letras:true, accept: "[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\s]+"},
			email: {
				required: true,
				email:true,
				"remote": {
											url: 'eventos.php',
											type: "post",
											async:false,
											data:
											{
													email: function()
													{
															return jQuery('#email').val().toLowerCase();
													},
													vrtCrt:'email'
											}
										}
			},
			//provincia: {required: true,letras:true,},
			ciudad: {required: true,letras:true,},
			lepas:{required: true},
			 lepasc:{required: true,
				equalTo : '#lepas',
			},      
			check: {required: true}
		},
	
		//Mensaje de error cuando no cumple la regla
		messages:{
			name: {required: 'El nombre es requerido', letras:'El campo nombre no debe contener números ni caracteres especiales', accept: "Solo se aceptan letras"},
			apellido: {required: 'El campo es requerido', letras:'El campo apellido no debe contener números ni caracteres especiales' , accept: "Solo se aceptan letras"},
			email: {required: 'Por favor ingrese un e-mail', email:'Ingrese un e-mail con formato v&aacute;lido',remote: jQuery.validator.format("{0} Ya se encuentra registrado.")},
			//provincia: {required: 'Ingrese una provincia'},
			ciudad: {required: 'Ingrese una ciudad'},
			lepas:{required: 'El campo contrase&ntilde;a no debe estar vac&iacute;o'},
			 lepasc:{required: 'El campo contrase&ntilde;a no debe estar vac&iacute;o',
				equalTo : 'La contrase&ntilde;a no coincide',
			},      
			check: {required: 'Debes aceptar los t&eacute;rminos'},
		}
	
	});

jQuery(document).on('change','#lepas',function(){


		jQuery("#lepas").each(function () {
				var validated =  true;
				jQuery('.form-error').html('<p></p>');
				if(this.value.length < 8){
					//console.log('menor');
					$('.form-error').append('<p>La contraseña no debe ser menor a ocho caracteres</p>').show('fade');
						validated = false;
				}else{
					 
				}
				if(!/\d/.test(this.value)){
						//console.log('digito');
					$('.form-error').append('<p>La contraseña debe contener al menos un digito</p>').show('fade');
						validated = false;
				}
				if(!/[a-z]/.test(this.value)){
					//console.log('minuscula');
					$('.form-error').append('<p>La contraseña debe contener al menos una minúscula </p>').show('fade');
						validated = false;          
				}
				if(!/[A-Z]/.test(this.value)){
					//console.log('mayuscula');
					$('.form-error').append('<p>La contraseña debe contener al menos una mayúscula</p>').show('fade');
						validated = false;
				}
				if(!/[`~!@#$%^&*()_°¬|+\-=?;:'",.<>\{\}\[\]\\\/]/gi.test(this.value)){
						//console.log('especiales');
					$('.form-error').append('<p>La contraseña debe contener al menos un caracter especial</p>').show('fade');
						validated = false;
					
				}
				if(validated==false){
					jQuery('#confirmar').attr('disabled','disabled');
				}else{
					jQuery('#confirmar').removeAttr('disabled');
				}
				/*Se ponen los errores en el html*/
				//jQuery('div').text(validated ? "pass" : "fail");
				// use DOM traversal to select the correct div for this input above
		});



});

jQuery('#confirmar').click(function(){

	if(jQuery('#pinguino').valid()){

		var nombre=jQuery('#name').val(),
		apellido=jQuery('#apellido').val(),
		email=jQuery('#email').val(),
		provincia=jQuery('#provincia').val(),
		ciudad=jQuery('#ciudad').val(),
		lepas=jQuery('#lepas').val(),
		lepasc=jQuery('#lepasc').val(),
		aceptar=jQuery('#check-terms').val(),
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
							vrtCrt:'registrar'
						},
						success: function (data){
							console.log(data);
              if(data=="exitoso"){
                window.location="perfil.php"
              }
						}, 
						error: function(result) {
											console.log(result,'error');
							}
						});
						return false;
	}

});

});
