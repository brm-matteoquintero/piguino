<?php
require("db/requires.php");
$session= new manejaSession();
$registro= new Registro();
$protocol=$session->site_protocol();
$protected=$session->llamaPass();




if(isset($_SERVER['QUERY_STRING']) && $_SERVER['QUERY_STRING']!=''){
$url=$_SERVER['QUERY_STRING'];
$url=base64_decode($url);
//printVar($url);
$idReceta=$session->decryptS($url,$protected);
//printVar($idReceta);
//die();
$datoVideo=$session->encryptS($idVideo,$protected);
	//printVar($datoVideo);
	setcookie('ywd_vid',$datoVideo, time() + 1200, '/');
}



$idUser=$session->decryptS($url,$protected);
    //printVar($protocol);
    if($protocol=="https://"){
    	$secure=true;
    	$httponly=true;
    }else{
    	$secure=false;
    	$httponly=false;
    }
if(isset($_COOKIE['ywd_usu']) && $_COOKIE['ywd_usu']!='' && isset($_COOKE['ywd_fr']) && $_COOKE['ywd_fr']){
	$idUser=$session->decryptS($_COOKIE['ywd_fr'],$protected);
	//printVar($idUser);
	$recetas=$registro->recetasPing();
	//printVar($recetas,'recetas');
	$cuentar=count($recetas);
	//$recetasDesb=$registro->recetasPingU(1,$idUser);
	//var_dump($recetasDesb);die();
	// Videos que tienen bloqueados
	$randoR=array("1","5","8","13","14");
	for ($i=0; $i < $cuentar; $i++) {
		# code...
		//printVar($recetas[$i]);
		$id=$recetas[$i]->id;
		$nombre=$recetas[$i]->nombre;
		$descripcion=$recetas[$i]->descripcion;
		//printVar($recetas[$i]->id);
		$recetasDesb=$registro->recetasPingU($recetas[$i]->id,$idUser);
		//printVar($recetasDesb,'desb');
		if(in_array($id, $randoR) && $recetasDesb){
			// si el video esta bloqueado
			//printVar($i,'conteo');
			//printVar("locked$id",'no');
			$smarty->assign("locked$id",'no');
		}else{
			// si el video esta desbloqueado
			$smarty->assign("locked$id",'si');
		}
		$smarty->assign("id-[$id]",$id);
		$smarty->assign("nombre-$id",$nombre);
		
	}
	
}else{
	$idF=rand (10000,99999);
	//printVar($idF);
	$creaSessionU=$session->write($idF,$dato);	
	$protected=$session->llamaPass();
	$createCookieU=$session->start_session('ywd_usud',true);
	$datoCookie=$session->encryptS($idUsuarioL,$protected);
	$randoR=array("1","5","8","13","14");
	//$recetasDesb=array_rand($randoR);
	//printVar($randoR[$recetasDesb]);
	$recetas=$registro->recetasPing();
	$cuentar=count($recetas);
	for ($i=0; $i < $cuentar; $i++) {
		# code...
		//printVar($recetas[$i]);
		$id=$recetas[$i]->id;
		$nombre=$recetas[$i]->nombre;
		$descripcion=$recetas[$i]->descripcion;
		//printVar($nombre,"nombre-[$id]");
		//printVar($idLock);
		//$smarty->assign("locked$id",$idLock);
		if(in_array($id, $randoR)){
			//printVar($randoR);
			$smarty->assign("locked$id",'si');
		}else{
			$smarty->assign("locked$id",'no');
		}
		$smarty->assign("id-[$id]",$id);
		$smarty->assign("nombre-$id",$nombre);
		
		$smarty->assign("descripcion-$id",$descripcion);
	}
	
	//setcookie('ywd_usud', $creaSessionU, time() + 1200, '/', $secure, $httponly);
}


	//printVar($recetas);
	$smarty->display("recipes.html");



?>