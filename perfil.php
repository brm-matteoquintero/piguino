<?php
//ini_set('display_errors','1');
if(isset($_COOKIE['ywd_usu']) && $_COOKIE['ywd_usu']!='' ){
	require("db/requires.php");
	$varPost=filter_input_array(INPUT_POST);
	$registrar= new Registro();
	$session= new manejaSession();
	$protected=$session->llamaPass();
	$idUser=$session->decryptS($_COOKIE['ywd_fr'],$protected);
	//printVar($idUser);
	$datosUsuario=$registrar->perfil($idUser);
	//printVar($datosUsuario);
	$nobmre=$datosUsuario[0]->nombre;
	$apellido=$datosUsuario[0]->apellido;
	$email=$datosUsuario[0]->email;
	$provincia=$datosUsuario[0]->provincia;
	$ciudad=$datosUsuario[0]->ciudad;
	$pass=base64_decode($datosUsuario[0]->contrasena);
	$idFacebook=$datosUsuario[0]->idFacebook;

	/*Asignar las variables al html*/
	$smarty->assign("nombre",$nobmre);
	$smarty->assign("apellido",$apellido);
	$smarty->assign("email",$email);
	$smarty->assign("provincia",$provincia);
	$smarty->assign("ciudad",$ciudad);
	$smarty->assign("pwd",$pass);
	$smarty->assign("idFb",$idFacebook);
	$smarty->display("edit-profile.html");
}else{
	header('location: registro.php');
}

?>