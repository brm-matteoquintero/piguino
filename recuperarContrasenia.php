<?php
//ini_set('display_errors', '1');
require("db/requires.php");
$varPost=filter_input_array(INPUT_POST);
$registrar= new Registro();
$session= new manejaSession();
if(isset($_COOKIE['ywd_usu']) && $_COOKIE['ywd_usu']!='' ){
	
	
	$protected=$session->llamaPass();
	$idUser=$session->decryptS($_COOKIE['ywd_fr'],$protected);
	//printVar($idUser);
	$smarty->display("remember-password-alert.html");
}else{
	 $smarty->display("remember-password.html");
}

 
?>