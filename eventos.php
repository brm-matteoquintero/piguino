<?php
require('db/requires.php');
ini_set('display_errors','1');
@error_reporting(0);
/*se ejecutan eventos dependiendo de lo solicitado*/
$varPost=filter_input_array(INPUT_POST);
$registrar= new Registro();
$session= new manejaSession();
$protocol=$session->site_protocol();
$protected=$session->llamaPass();
    //printVar($protocol);
    if($protocol=="https://"){
    	$secure=true;
    	$httponly=true;
    }else{
    	$secure=false;
    	$httponly=false;
    }


//printVar($varPost);
$vrtCtr=$varPost['vrtCrt'];
//printVar($vrtCtr);
switch ($vrtCtr) {
	/*Trae ciudades por departamento*/
	case 'recuperar':
		# code...
	
		$mandaM=$registrar->verficaEmialE($varPost['email']);
		//printVar($mandaM);
		if($mandaM[0]->email!='' && $mandaM[0]->id!=''){
			$idUsuarioL=$mandaM[0]->id;
			$mail=$mandaM[0]->email;
			$fecha=date('Y-m-d H:i:s');
			$datoe=$mail."~".$idUsuarioL."~".$fecha;
			//printVar($datoe);

			$datoCookie=$session->encryptS($datoe,$protected);
		//die();
			$campos['mail']=$mail;
			$campos['hash']=$datoCookie;
			$registrar->mailC($campos);
			if($registrar>0){
				$para  = $mandaM[0]->email;
				$urlEnvio="http://www.heladospinguino.com.ec/planpinguino/?".$datoCookie;
				$asunto = 'Mensaje de recuperación';
				$mensaje= "Hola, soy un mensaje, por favor de click en el link adjunto ". $urlEnvio ;
		
				// Cabecera que especifica que es un HMTL
				// Cabecera que especifica que es un HMTL
				$cabeceras  = 'MIME-Version: 1.0' . "\r\n";
				$cabeceras .= 'Content-type: text/html; charset=utf-8' . "\r\n";
				//$cabeceras .= 'Content-Type: text/plain; charset=utf-8' . "\r\n";
				//$cabeceras .= 'Content-Type: text/plain; charset=utf-8' . "\r\n";
				// Cabeceras adicionales
				$cabeceras .= 'From: Pinguino <info@cristian.tangarife@brm.com.co>' . "\r\n";
				//$cabeceras .= 'Cc: archivotarifas@example.com' . "\r\n";
				//$cabeceras .= 'Bcc: lorena.lozano@brm.com.co,pedro.barreto@brm.com.co,mauricio.obando@preferente.com.co' . "\r\n";
				// enviamos el correo!
				mail($para, $asunto, $mensaje, $cabeceras);
				echo json_encode("Hemos enviado un correo con la informaci&oacute;n para el cambio de contrase&ntilde;a");
			}else{
			echo json_encode("Hemos enviado un correo con la informaci&oacute;n para el cambio de contrase&ntilde;a");
		}
		
		}else{
			echo json_encode("Hemos enviado un correo con la informaci&oacute;n para el cambio de contrase&ntilde;a");
		}
		
	
		break;
	/*Verifica si ya se encuentra registrado el email*/
	case 'email':
		# code...
		$cedula=$varPost['email'];
		//printVar($varPost);
		
		$existe=$registrar->verficaEmial($cedula);
		//printVar($existe);
		if($existe==1){
			$mensaje='El mail ya se encuentra registrado';
			//echo false;
		}else{
			
			$mensaje='true';
		}
		echo json_encode($mensaje);
		//die();
		break;
	/*Registro de usuario*/
	case 'registrar':
		# code...
		//printVar($varPost);
		//setcookie('ywd_usui', "hola", time() + 1200, '/', $secure, $httponly);
		/*Datos de usauario*/
		if(isset($varPost['email']) && $varPost['email']!='' && isset($varPost['aceptar']) && $varPost['aceptar']=='S' && isset($varPost['lepas']) && $varPost['lepas']!='' && isset($varPost['lepasc']) && $varPost['lepasc']=!'' && $varPost['lepas']==$varPost['lepasc'] ){
			
			
			$campos['nombre']=utf8_decode($varPost['nombre']);
			$campos['apellido']=utf8_decode($varPost['apellido']);
			$campos['email']=strtolower($varPost['email']);
			//$campos['provincia']=utf8_decode($varPost['provincia']);
			$campos['ciudad']=utf8_decode($varPost['ciudad']);
			$campos['lepass']=base64_encode($varPost['lepas']);
			$campos['aceptar']=$varPost['aceptar'];
			$campos['idR']=$varPost['idR'];
			//printVar($subida,'Hola s');
			$guardaUsu=$registrar->inscripcion($campos);
			//printVar($guardaUsu,'Respuesta insert');
			/*Creación y lectura de cookie*/
			if($guardaUsu!=''){
				if(isset($_COOKIE['ywd_usud']) && $_COOKIE['ywd_usud']!=''){
				/*Aquí se actualiza la sessión y se destruye la actual*/
					$idUser=$session->decryptS($_COOKIE['ywd_usud'],$protected);
					$destruye==$session->destroy($idUser);
					//unset($_COOKIE['ywd_usud']);
					setcookie('ywd_usud','', time() - 3600, '/');
				}
				if(isset($_COOKIE['ywd_vidst']) && $_COOKIE['ywd_vidst']!=''){
					
					$idReceta=$session->decryptS($_COOKIE['ywd_vidst'],$protected);
					$campos['idUsuario']=$guardaUsu;
					$campos['idReceta']=$idReceta;
					$recetaxusuario=$registrar->usuarioReceta($campos);
					setcookie('ywd_vidst','', time() - 3600, '/');
				}
			$host=$_SERVER['SERVER_NAME'];
			$dato=$guardaUsu."~".$host.'~4591';
			$creaSessionU=$session->write($guardaUsu,$dato,$host);
			//printvar($creaSessionU,'holaCU');
			$createCookieU=$session->start_session('ywd_usu',true);
			$datoCookie=$session->encryptS($guardaUsu,$protected);
			
			//printvar($createCookieU,'holaC');
			/*Se crea cookie de usuario*/
			setcookie('ywd_fr',$datoCookie, time() + 1200, '/');
			setcookie('ywd_usu', $creaSessionU, time() + 1200, '/', $secure, $httponly);
				
			}
		
		//die();
		if($guardaUsu>0){
			$mensaje="exitoso";
		}else{
			$mensaje="noguarda";
		}
	}else{
		$mensaje="Registro no v&aacute;lido";
	}
		echo json_encode($mensaje);
		break;
	/*Actualiza perfil*/
	case 'actualizaP':
		# code...
		//printVar($varPost);
		//setcookie('ywd_usui', "hola", time() + 1200, '/', $secure, $httponly);
		/*Datos de usauario*/
		if(isset($varPost['email']) && $varPost['email']!='' && isset($varPost['lepas']) && $varPost['lepas']!='' && isset($varPost['lepasc']) && $varPost['lepasc']=!'' && $varPost['lepas']==$varPost['lepasc'] ){

			if(isset($_COOKIE['ywd_usu']) && $_COOKIE['ywd_usu']!=''){
				$idUser=$session->decryptS($_COOKIE['ywd_fr'],$protected);
				//printVar($idUser);
				$campos['nombre']=utf8_decode($varPost['nombre']);
				$campos['apellido']=utf8_decode($varPost['apellido']);
				$campos['email']=strtolower($varPost['email']);
				//$campos['provincia']=utf8_decode($varPost['provincia']);
				$campos['ciudad']=utf8_decode($varPost['ciudad']);
				$campos['lepass']=base64_encode($varPost['lepas']);
				$campos['idR']=$varPost['idR'];
				$campos['idU']=$idUser;

				$actualizaP=$registrar->acutalizaPerfil($campos);
			//printVar($actualizaP,'Hola actualizar');
			//printVar($guardaUsu,'Respuesta insert');
			/*Creación y lectura de cookie*/
			//if($guardaUsu!=''){
			//}
			
			//die();
				if($actualizaP>0){
					$mensaje="exitoso";
				}else{
					$mensaje="noguarda";
				}
			}else{
				$mensaje="Registro no v&aacute;lido";
			}
		echo json_encode($mensaje);

			}

	
		break;

		/*cambiar contraseña*/
		case "changeP":
		if(isset($varPost['lepas']) && $varPost['lepas']!='' && isset($varPost['lepasc']) && $varPost['lepasc']=!'' && $varPost['lepas']==$varPost['lepasc'] ){
			if(isset($_COOKIE['ywd_usu']) && $_COOKIE['ywd_usu']!=''){
				$idUser=$session->decryptS($_COOKIE['ywd_fr'],$protected);
				$campos['lepass']=base64_encode($varPost['lepas']);
				$campos['idU']=$idUser;
				$actualizaP=$registrar->acutalizaPerfil($campos);
				if($actualizaP>0){
					$mensaje="exitoso";
				}else{
					$mensaje="noguarda";
				}
			}else{
				$mensaje="No se pudo actualizar";
			}

		}

		break;
	
	default:
		# code...
		break;
}
?>