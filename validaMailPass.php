<?php
require("db/requires.php");
//printVar($_SERVER);
$url=$_SERVER['QUERY_STRING'];

$session= new manejaSession();
$protected=$session->llamaPass();



$idUser=$session->decryptS($url,$protected);
//printVar($idUser);
$separar=explode("~", $idUser);
//var_dump($separar);

$fechaO=$separar[2];
$dfecha=date("Y-m-d H:i:s", strtotime($fechaO."+1 days"));
//printVar($fechaO);
//printVar($dfecha);
$afecha=date("Y-m-d H:i:s");
//printVar($afecha);
if($dfecha < $afecha){

	header('location: registro');

}else{

	 if($protocol=="https://"){
    	$secure=true;
    	$httponly=true;
    	//printVar($secure,'https');
    }else{
    	$secure=false;
    	$httponly=false;
    	//printVar($secure,'https');
    		$idUsuarioL=$separar[1];
    		$host=$_SERVER['SERVER_NAME'];
			$dato=$idUsuarioL."~".$host.'~4591';
			$destroy=$session->destroy($idUsuarioL);
			$creaSessionU=$session->write($idUsuarioL,$dato);
			//printvar($creaSessionU,'holaCU');
			$createCookieU=$session->start_session('ywd_usu',true);
			$protected=$session->llamaPass();
			$datoCookie=$session->encryptS($idUsuarioL,$protected);
			//printvar($datoCookie,'holaC');
			//printvar($httponly,'holaC');
			/*Se crea cookie de usuario*/
	   		setcookie('ywd_fr',$datoCookie, time() + 1200, '/');
			setcookie('ywd_usu', $creaSessionU, time() + 1200, '/', $secure, $httponly);
			
			header('location: perfil');
    }

}
?>