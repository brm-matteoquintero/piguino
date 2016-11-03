<?php
class Registro {

	/*Registra el usuario en la base de datos*/
	function inscripcion($campos) {
		//printVar($campos);
		$inscr = DB_DataObject::Factory('TbUsuario');
		$inscr ->nombre = $campos['nombre'];
		$inscr ->apellido = $campos['apellido'];
		$inscr ->email = $campos['email'];
		//$inscr ->provincia = $campos['provincia'];
		$inscr ->ciudad = $campos['ciudad'];
		$inscr ->contrasena = $campos['lepass'];
		$inscr ->activo = $campos['aceptar'];
		$inscr ->idFacebook = $campos['idR'];
		$inscr ->fecha = date("Y-m-d H:i:s");
		$insert = $inscr -> insert();

		$inscr -> free();
		return $insert;
	}
	/*Verifica si existe el email*/
	function verficaEmial($mail){
		//DB_DataObject::debugLevel(1);
		$inscr = DB_DataObject::Factory('TbUsuario');
		$inscr->email=$mail;
		$return =false;
		$find=$inscr->find();
		if($find>0){
			$return = true;
		}
		//printVar($return);
		return $return;
	}

	/*Funcion para limpiar el texto antes de guardarlo*/
	function limpiaContent($nombreVariable){
		$limpieza = array(	"é" => "&eacute;",
			"á" => "&aacute;",
			"í" => "&iacute;",
			"ó" => "&oacute;",
			"ú" => "&uacute;",
			"ñ" => "&ntilde;",
			"É" => "&Eacute;",
			"Á" => "&Aacute;",
			"Í" => "&Iacute;",
			"Ó" => "&Oacute;",
			"Ú" => "&Uacute;",
			"Ñ" => "&Ntilde;",
			"®" => "&reg;",
			"¿" => "&iquest;",
			"¡" => "&iexcl;",
			"®" => "&reg;",

							
		);
		$nombreVariable = strtr($nombreVariable, $limpieza);
		return $nombreVariable;
	}

	/*Login*/
	function logueo($mail,$pass){
		//DB_DataObject::debugLevel(1);
		$logueo=DB_DataObject::Factory('TbUsuario');
		$logueo->selectAdd();
		$logueo->selectAdd('id,email,contrasena');
		$logueo->whereAdd('email="'.$mail.'" AND contrasena="'.$pass.'"');
		$logueo -> limit('1');
		$logueo -> find();
		
		$count = 0;
		while ($logueo -> fetch()) {
			$ret[$count]->id = $logueo->id;			
			$count++;
		}
		//$ret = $ret + 1;
		//Libera el objeto DBO
		return $ret;
		$logueo -> free();

	}
	/*Perfil de usuario*/
	function perfil($id){
		//printVar($id);
		//DB_DataObject::debugLevel(1);
		$perfil=DB_DataObject::Factory('TbUsuario');
		$perfil->selectAdd();
		$perfil->selectAdd('id,email,nombre,apellido,ciudad,contrasena,idFacebook');
		$perfil->whereAdd('id="'.$id.'"');
		$perfil->find();
		$count=0;
		while ($perfil->fetch()) {
			# code...
			$pef[$count]->id=$perfil->id;
			$pef[$count]->email=$perfil->email;
			$pef[$count]->nombre=$perfil->nombre;
			$pef[$count]->apellido=$perfil->apellido;
			//$pef[$count]->provincia=$perfil->provincia;
			$pef[$count]->ciudad=$perfil->ciudad;
			$pef[$count]->contrasena=$perfil->contrasena;
			$pef[$count]->idFacebook=$perfil->idFacebook;
			$count++;

		}

		return $pef;
		$perfil->free();

	}
	/*Verifica si existe el email para enviar el mail*/
	function verficaEmialE($mail){
		//DB_DataObject::debugLevel(1);
		$inscr = DB_DataObject::Factory('TbUsuario');
		$inscr->selectAdd();
		$inscr->selectAdd('id,email');
		$inscr->whereAdd('email="'.$mail.'"');
		//$inscr->email=$mail;
		//$return =false;
		$find=$inscr->find();
		$count = 0;
		while ($inscr -> fetch()) {
			$ret[$count]->id = $inscr->id;			
			$ret[$count]->email = $inscr->email;			
			$count++;
		}
		//$ret = $ret + 1;
		//Libera el objeto DBO
		return $ret;
	}
	/*Función para restringir el acceso al cambio de contraseña desde mail*/
	function mailC($campos){
		//DB_DataObject::debugLevel(1);
		$passC=DB_DataObject::Factory('TbRemeberPass');
		$passC->mail=$campos['mail'];
		$passC->keyMail=$campos['hash'];
		$passC ->fecha = date("Y-m-d H:i:s");
		$insert = $passC -> insert();
		$passC -> free();
		return $insert;


	}
	function validaPassR($campos){
		$passC=DB_DataObject::Factory('TbRemeberPass');
		$passC->valido='N';
		$passC-> whereAdd("mail='" . $campos['mail']."' AND keyMail='".$campos['hash']."' AND valido='S'");
		$passC -> find();
		$ret = $passC -> update(DB_DATAOBJECT_WHEREADD_ONLY);
		//printVar($ret);
		$passC -> free();
		return $ret;

	}

	/*Actualiza datos*/
	function acutalizaPerfil($campos){

		$inscr = DB_DataObject::Factory('TbUsuario');
		$inscr ->nombre = $campos['nombre'];
		$inscr ->apellido = $campos['apellido'];
		$inscr ->email = $campos['email'];
		//$inscr ->provincia = $campos['provincia'];
		$inscr ->ciudad = $campos['ciudad'];
		$inscr ->contrasena = $campos['lepass'];
		$inscr ->idFacebook = $campos['idR'];
		$inscr ->fechaActualizacion = date("Y-m-d H:i:s");
		$inscr-> whereAdd("id='" . $campos['idU']."'");
		$inscr -> find();
		$ret = $inscr -> update(DB_DATAOBJECT_WHEREADD_ONLY);
		$inscr -> free();
		return $ret;
	}

	/*Función para traer recetas*/
	 function recetasPing(){
	 	//printVar($desc);
	 	//DB_DataObject::debugLevel(1);
	 	$ping= DB_DataObject::Factory('TbReceta');
	 	$ping->selectAdd();
	 	$ping->selectAdd('id,nombreReceta,activo');
	 	$ping->whereAdd('activo="S"');
	 	$ping->find();
	 	$cpint=0;
	 	while ($ping->fetch()) {
	 		$rec[$cpint]->id=$ping->id;
	 		$rec[$cpint]->nombre=$ping->nombreReceta;
	 		//$rec[$cpint]->descripcion=$ping->descripcion;
	 		$cpint++;
	 	}

	 	return $rec;
	 	$ping->free();
	 }
	 function recetasPingD($id){
	 	//printVar($id);
	 	//DB_DataObject::debugLevel(1);
	 	$ping= DB_DataObject::Factory('TbReceta');
	 	$ping->selectAdd();
	 	$ping->selectAdd('id,nombreReceta,activo');
	 	$ping->whereAdd('activo="S" AND id='.$id);
	 	$ping->find();
	 	$cpint=0;
	 	while ($ping->fetch()) {
	 		$rec[$cpint]->id=$ping->id;
	 		$rec[$cpint]->nombre=$ping->nombreReceta;
	 		//$rec[$cpint]->descripcion=$ping->descripcion;
	 		$cpint++;
	 	}

	 	return $rec;
	 	$ping->free();
	 }
	 /*Función para actualizar los datos temporales*/
	 function actualizaTemporal($idT,$id){
	 	$recetaD=DB_DataObject::Factory('TbRecetaDesbloqueada');
	 	$recetaD->idUsuario=$id;
	 	$recetaD->whereAdd('idUsuario='.$idT);
	 	$recetaD->find();
	 	$retD= $recetaD->update(DB_DATAOBJECT_WHEREADD_ONLY);
	 	$recetaD->free();
	 	return $retD;
	 	
	 }
	 
	 /*Función para guardar las recetas por usuario*/
	 function usuarioReceta($campos){
	 	//DB_DataObject::debugLevel(1);
	 	$receta=DB_DataObject::Factory('TbRecetaDesbloqueada');
	 	// idusuario = cookie(ydw_usu) registrados o ywd_usud para temporal
	 	$receta->idUsuario=$campos['idUsuario'];
	 	$receta->idReceta=$campos['idReceta'];
	 	$receta->fecha=date("Y-m-d H:i:s");
	 	$insert = $receta-> insert();
		$receta -> free();
		return $insert;
	 }
	 /*Traer recetas desbloqueadas*/
	 function recetasPingU($idR,$idU){
	 	//printVar($id);
	 	//DB_DataObject::debugLevel(1);
	 	$ping= DB_DataObject::Factory('TbRecetaDesbloqueada');
	 	$ping->selectAdd();
	 	$ping->selectAdd('idUsuario,idReceta');
	 	//$ping->groupBy('idUsuario');
	 	$ping->whereAdd('idReceta='.$idR.' AND idUsuario='.$idU);
	 	$ping->find();
	 	//$cpint=0;
	 	//printVar($ping->fetch());
	 	if($ping->fetch()){
	 		$rec=true;
	 	}else{
	 		$rec=false;
	 	}
	 	

	 	return $rec;
	 	$ping->free();
	 }
	 
	 	

}
?>