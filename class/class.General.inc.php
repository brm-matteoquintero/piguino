<?php
class General
{
	/**
	* Se crea la tupla en la tabla dada
	* @param tabla: Nombre del DBO de la tabla
	*/
	function setInstancia($tabla){
		//Crea una nueva instancia de $tabla a partir de DataObject
		$objDBO = DB_DataObject::Factory($tabla);
		
		$campos = $objDBO->table();
		unset($campos["id"]);
		unset($campos["fecha"]);
		
		//Asigna los valores
		foreach($campos as $key => $value){
			$objDBO->$key = utf8_decode($this->$key);
		}
		
		$objDBO->find();
		if($objDBO->fetch()){
			$ret = $objDBO->id;
		}else{
			$objDBO->fecha = date("Y-m-d H:i:s");
		
			$ret = $objDBO->insert();
		}
		
		//Libera el objeto DBO
		$objDBO->free();
		

		return ($ret);
	}
	
	
	/**
	* Actualiza la tupla con id dado en la tabla dada
	* @param tabla: Nombre del DBO de la tabla a actualizar
	* @param id: Id del registro a actualizar
	*/
	function updateInstancia($tabla,$id){
		//DB_DataObject::debugLevel(1);
		//Crea una nueva instancia de $tabla a partir de DataObject
		$objDBO = DB_DataObject::Factory($tabla);
		
		$campos = $objDBO->table();
		unset($campos["id"]);
		unset($campos["password"]);
		unset($campos["fecha"]);

		$objDBO->id = $id;
		
		//Asigna los valores
		$objDBO->find();
		if($objDBO->fetch()){
			foreach($campos as $key => $value){
				$objDBO->$key = utf8_decode($this->$key);
			}
			$objDBO->fecha = date("Y-m-d H:i:s");
			$objDBO->update();
			$ret = true;
		}else{
			$ret = false;
		}
		
		//Libera el objeto DBO
		$objDBO->free();

		return ($ret);
	}
	
	/**
	* Trae la tupla de la tabla dada
	* @param tabla: Nombre del DBO de la tabla
	* @param campo: arreglo con la dupla campo y valor
	*/
	function getInstancia($tabla,$campo){
		//DB_DataObject::debugLevel(1);
		//Crea una nueva instancia de $tabla a partir de DataObject
		$objDBO = DB_DataObject::Factory($tabla);
		
		$campos = $objDBO->table();
		
		if(is_array($campo)){
			foreach($campo as $key => $value){
				$objDBO->$key = $value;
			}
		}
		
		$objDBO->find();
		if($objDBO->fetch()){
			//Asigna los valores
			foreach($campos as $key => $value){
				$ret->$key = cambiaParaEnvio($objDBO->$key);
			}
		}else{
			$ret = false;
		}
		
		//Libera el objeto DBO
		$objDBO->free();
		

		return ($ret);
	}
		/**
	* Trae la tupla de la tabla dada
	* @param tabla: Nombre del DBO de la tabla
	* @param campo: arreglo con la dupla campo y valor
	*/
	function getInstancia2($tabla,$campo=NULL){
		//DB_DataObject::debugLevel(5);
		//Crea una nueva instancia de $tabla a partir de DataObject
		$objDBO = DB_DataObject::Factory($tabla);
		if(is_array($campo)){
			foreach($campo as $key => $value){
				$objDBO->$key = $value;
			}
		}
		$contador = 0;
		$objDBO->find();
		$columna = $objDBO->table();
		while ($objDBO->fetch()) {
			foreach ($columna as $key => $value) {
				$ret[$contador]->$key = cambiaParaEnvio($objDBO->$key);
			}
			$contador++;
		}
		
		//Libera el objeto DBO
		$objDBO->free();

		return $ret;	
	}
	/**
	* Borrar la tupla con id dado en la tabla dada
	* @param tabla: Nombre del DBO de la tabla donde se va a borrar
	* @param id: Id del registro a borrar
	*/
	function unSetInstancia($tabla,$id){
		//Crea una nueva instancia de $tabla a partir de DataObject
		$objDBO = DB_DataObject::Factory($tabla);
			
		$campos = $objDBO->table();
		
		if(strpos($id,',') === false){
			$objDBO->get($id);
		}else{
			$datos = split(',',$id);
			$objDBO->get($datos[0],$datos[1]);
		}
		
		
		$ret = $objDBO->delete();
		
		//Libera el objeto DBO
		$objDBO->free();
		

		return ($ret);
	}

	/**
	* Trae el listado de campos sin id ni fecha
	* @param tabla: Nombre del DBO de la tabla 
	*/
	function getCampos($tabla){
		//DB_DataObject::debugLevel(5);
		//Crea una nueva instancia de $tabla a partir de DataObject
		$objDBO = DB_DataObject::Factory($tabla);
		
		$campos = $objDBO->table();
		
		unset($campos["id"]);
		unset($campos["fecha"]);
		
		//Libera el objeto DBO
		$objDBO->free();
		
		return ($campos);
	}
}
?>