<?php
require('db/requires.php');
ini_set('display_errors','0');
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
	case 'enc':
	$idVideoC=$varPost['video'];
	$video=explode("-", $idVideoC);
	$idVideo=$video[1];
	//printVar($idVideo);
	$datoVideo=$session->encryptS($idVideo,$protected);
	//printVar($datoVideo);
	setcookie('ywd_vid',$datoVideo, time() + 1200, '/');
	echo json_encode($datoVideo);
	break;
	/*Actualiza perfil*/
	case 'desc':
	$data=$varPost['video'];
	//$data=str_replace('"','',$data);
	//printVar($data);
	$desc=$session->decryptS($data,$protected);
	//printVar($desc);
	echo json_encode($desc);
	break;
	case 'rec':
		//printVar($varPost);
		$receta=$varPost['video'];
		$separar=explode('"', $receta);
		//printVar($separar);
		$recetad=base64_decode($separar[2]);
		if($recetad=="st"){
			setcookie('ywd_vidst',$separar[1], time() + 1200, '/');
			$video=$session->decryptS($separar[1],$protected);
			echo json_encode('enviarR');
		}
		break;
	
	default:
		# code...
		break;
}
?>