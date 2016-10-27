<?php

session_start();

global $prefijo;
require($prefijo."db/DBO.php");

//DataObjects

require($prefijo."db/requires.ini.php");


//Clases
require($prefijo."class/class.General.inc.php");
require($prefijo."class/class.manejaSession.php");
require($prefijo."class/class.Registro.php");


//Smarty

//require("./Smarty/libs/Smarty.class.php");

/*/Tanga*/
//require($_SERVER["DOCUMENT_ROOT"]."./Smarty/libs/Smarty.class.php");

//mateo
require($_SERVER["DOCUMENT_ROOT"]."/libs/Smarty/libs/Smarty.class.php");


$smarty = new Smarty();

$smarty->compile_check = true;
$smarty->left_delimiter = '{#';
$smarty->right_delimiter = '#}';

//Si existe la cookie ml_idUsuario trae los datos para armar el perfil


function cambiaParaEnvio($cadena){
	//$cadena = htmlentities($cadena,ENT_NOQUOTES,"ISO8859-1");
	$cadena = utf8_encode($cadena);
	return($cadena);
}

function printVar( $variable, $title = "" ){
	$var = print_r( $variable, true );
	echo "<pre style='background-color:#dddd00; border: dashed thin #000000;'><strong>[$title]</strong> $var</pre>";
}

function limpiarMiga($nombreVariable){
	$limpieza = array(	" " => "_",
						"�" => "a",
						"�" => "e",
						"�" => "i",
						"�" => "o",
						"�" => "u",
						"�" => "A",
						"�" => "E",
						"�" => "I",
						"�" => "O",
						"�" => "U",
						"�" => "n",
						"�" => "�",
						"&aacute;" => "a",
						"&eacute;" => "e",
						"&iacute;" => "i",
						"&oacute;" => "o",
						"&uacute;" => "u",
						"&Aacute;" => "A",
						"&Eacute;" => "E",
						"&Iacute;" => "I",
						"&Oacute;" => "O",
						"&Uacute;" => "U",
						"&ntilde;" => "n",
						"&Ntilde;" => "�",
						"(" => "_",
						")" => "_"
	);
	$nombreVariable = strtr($nombreVariable, $limpieza);
	return $nombreVariable;
}

function buscaInjec($valor){
	//printVar($valor);
	$valorLimpio=limpiarMiga(trim($valor));
	//Si encontramos alguna palabra reservada
	//(cast|char|convert|declare|delete|drop|exec|insert|meta|script|select|set|truncate|update|version)
	$blocked = array("create","cast","char","convert","declare","delete","drop","exec","insert","meta","script","select","set","truncate","update","version","update","grant");
	 if (in_array($valorLimpio, $blocked)) {
		 //printVar($valor,"MACH");
		 header('Location: http://millerlite.com.co/404/?'.$valorLimpio);
			exit();
	 }
	return $valor;
}

function escapaReq($valor){
	if(is_array($valor)){
		foreach($valor as $key => $value){
			$valor[$key] = escapaReq($value);
		}
		return ($valor);
	}else{
		//return (mysql_real_escape_string($valor));
		return (buscaInjec($valor));
	}
}


$ipServidorActual = $_SERVER["SERVER_ADDR"];
$smarty->assign("ipServidorActual", $ipServidorActual);
$_REQUEST = escapaReq($_REQUEST);
$_POST = escapaReq($_POST);


/*if(date('Y-m-d H:i:s') > '2015-09-30 00:00:00'){
	
	$acabar='1';
}else{
	
	$acabar='0';
}
$smarty->assign("acabar",$acabar);*/
if(isset($_COOKIE['ywd_fr']) && $_COOKIE['ywd_fr']!='' ){
	$loge='Si';
}else{
	$loge='No';
}
$smarty->assign('logueo',$loge)


?>