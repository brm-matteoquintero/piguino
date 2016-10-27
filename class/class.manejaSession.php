<?php

class manejaSession {



	function __construct() {
	   // set our custom session functions.
	   session_set_save_handler(array($this, 'read'), array($this, 'write'), array($this, 'destroy'), array($this, 'gc'));
	 
	   // This line prevents unexpected effects when using objects as save handlers.
	   register_shutdown_function('session_write_close');
	}

	function start_session($session_name, $secure) {
	   // Make sure the session cookie is not accessible via javascript.
	   $httponly = true;
	 
	   // Hash algorithm to use for the session. (use hash_algos() to get a list of available hashes.)
	   $session_hash = 'sha512';
	 
	   // Check if hash is available
	   if (in_array($session_hash, hash_algos())) {
	      // Set the has function.
	      ini_set('session.hash_function', $session_hash);
	   }
	   // How many bits per character of the hash.
	   // The possible values are '4' (0-9, a-f), '5' (0-9, a-v), and '6' (0-9, a-z, A-Z, "-", ",").
	   ini_set('session.hash_bits_per_character', 5);
	 
	   // Force the session to only use cookies, not URL variables.
	   ini_set('session.use_only_cookies', 1);
	 
	   // Get session cookie parameters 
	   $cookieParams = session_get_cookie_params(); 
	   // Set the parameters
	   session_set_cookie_params($cookieParams["lifetime"], $cookieParams["path"], $cookieParams["domain"], $secure, $httponly); 
	   // Change the session name 
	   session_name($session_name);
	   // Now we cat start the session
	   session_start();
	   // This line regenerates the session and delete the old one. 
	   // It also generates a new encryption key in the database. 
	   session_regenerate_id(true); 
	}

	function read($id) {
		$session = DB_DataObject::Factory("TbSession");
		//debug(1);
	  /* if(!isset($this->read_stmt)) {
	      $this->read_stmt = $this->db->prepare("SELECT data FROM sessions WHERE id = ? LIMIT 1");

	   }
	   $this->read_stmt->bind_param('s', $id);
	   $this->read_stmt->execute();
	   $this->read_stmt->store_result();
	   $this->read_stmt->bind_result($data);
	   $this->read_stmt->fetch();
	   $key = $this->getkey($id);
	   $data = $this->decryptS($data, $key);*/

	   $session->selectAdd();
	   $session->selectAdd('data');
	   $session->whereAdd('user_id ='.$id);
	   $session->limit('1');
	   $session ->find();
	   $existe=$session ->fetch();
	   //printVar($existe);
	   $dataS=$session->data;
	   $key = $this->getkey($id);
	  // printVar($key,'llaveLectura');
	   $data = $this->decryptS($dataS,$key);
	   return $data;
	}
	function write($id, $data) {
		//printVar($id);
		//printVar($data);
		$session = DB_DataObject::Factory("TbSession");
   // Get unique key
		//debug(1);
		
	   $key = $this->getkey($id);
	   //printVar($key,'LlaveGuardado');
	   // Encrypt the data
	   $data = $this->encryptS($data,$key);
	 
	  /* $time = time();
	   if(!isset($this->w_stmt)) {
	      $this->w_stmt = $this->db->prepare("REPLACE INTO sessions (id, set_time, data, session_key) VALUES (?, ?, ?, ?)");
	   }*/
	   $session->user_id=$id;
	   $session->data=$data;
	   $session->session_key=$key;
	   $session->set_time=time();
	   $session->dns=$_SERVER['SERVER_NAME'];
	   //$creaSession=$session->setInstancia();
	   $insert = $session -> insert();

		$session -> free();
	 
	  /* $this->w_stmt->bind_param('siss', $id, $time, $data, $key);
	   $this->w_stmt->execute();*/
	   return $data;
	}


	function destroy($id) {
		$session = DB_DataObject::Factory("TbSession");
	  /* if(!isset($this->delete_stmt)) {
	      $this->delete_stmt = $this->db->prepare("DELETE FROM sessions WHERE id = ?");
	   }
	   $this->delete_stmt->bind_param('s', $id);
	   $this->delete_stmt->execute();*/
	   $session->whereAdd('user_id ='.$id);
	   $session->delete(DB_DATAOBJECT_WHEREADD_ONLY);
	   return true;
	}

	function gc($max) {
		$session = DB_DataObject::Factory("TbSession");
	   /*if(!isset($this->gc_stmt)) {
	      $this->gc_stmt = $this->db->prepare("DELETE FROM sessions WHERE set_time < ?");
	   }
	   $old = time() - $max;
	   $this->gc_stmt->bind_param('s', $old);
	   $this->gc_stmt->execute();*/
	   $old = time() - $max;
	   $session->whereAdd('set_time' < $max);
	   $session->delete(DB_DATAOBJECT_WHEREADD_ONLY);
	   return true;
	}

	private function getkey($id) {
		$session = DB_DataObject::Factory("TbSession");
	   /*if(!isset($this->key_stmt)) {
	      $this->key_stmt = $this->db->prepare("SELECT session_key FROM sessions WHERE id = ? LIMIT 1");
	   }
	   $this->key_stmt->bind_param('s', $id);
	   $this->key_stmt->execute();
	   $this->key_stmt->store_result();
	   if($this->key_stmt->num_rows == 1) { 
	      $this->key_stmt->bind_result($key);
	      $this->key_stmt->fetch();
	      return $key;*/
	   $session->selectAdd();
	   $session->selectAdd('session_key');
	   $session->whereAdd('user_id ='.$id );
	   $session->limit('1');
	   $find=$session->find();
	   //printVar($find);

	   if($find > 0){
	   	$session->fetch();
	   	//printVar('hola');
	   	$key=$session->session_key;
	   	return $key;

	   } else {
	      $random_key = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
	      return $random_key;
	   }
	}

/*Pasar a private*/
	public function encryptS($data, $key) {
	   $salt = 'cH!swe!retReGu7W6bEDRup7usuDUh9THeD2CHeGE*ewr4n39=E@rAsp7c-Ph@pH';
	   $key = substr(hash('sha256', $salt.$key.$salt), 0, 32);
	 	
	   //printVar($key,'llaveE');
	   $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB);
	   $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
	   $encrypted = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $key, $data, MCRYPT_MODE_ECB, $iv));
	   //printVar($encrypted,'encriptada');
	   return $encrypted;
	}
	/*Pasar a private*/
	public function decryptS($data, $key) {
	   $salt = 'cH!swe!retReGu7W6bEDRup7usuDUh9THeD2CHeGE*ewr4n39=E@rAsp7c-Ph@pH';
	   $key = substr(hash('sha256', $salt.$key.$salt), 0, 32);
	   //printVar($key,'llaveD');
	   $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB);
	   $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
	   $decrypted = mcrypt_decrypt(MCRYPT_RIJNDAEL_256, $key, base64_decode($data), MCRYPT_MODE_ECB, $iv);
	   $decrypted = rtrim($decrypted, "\0");
	   //printVar($decrypted,'decript');
	   return $decrypted;
	}
	protected $protected='$f1nd3s3m0n4c00k13';

	public function llamaPass()
    {
        return $this->protected;
    }
    function site_protocol() {
    if(isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS'] == 'on' || $_SERVER['HTTPS'] == 1) || isset($_SERVER['HTTP_X_FORWARDED_PROTO']) &&  $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https')  return $protocol = 'https://'; else return $protocol = 'http://';
}

    /*Uso de decrypS

protected $protected='passphrase';
$mensajeSis=$session->decryptS($_COOKIE['nameCookie'],$protected);

Uso encrypS
Cookie con id de usuario
$datoCookie=$session->encryptS($idUsuario,$protected);
//printVar($datoCookie);
setcookie('nameCooke',$datoCookie, time() + 1200, '/', $secure, $httponly);


Se debe cargar todo sobre https
$host=$_SERVER['SERVER_NAME'];
			$dato=$guardaUsu."~".$host.'~4591';
			$creaSessionU=$session->write($guardaUsu,$dato,$host);
			printvar($creaSessionU,'holaCU');
			$createCookieU=$session->start_session('ywd_usu',true);
			printvar($createCookieU,'holaC');
			/*Se crea cookie de usuario
			setcookie('ywd_usu', $creaSessionU, time() + 1200, '/', $secure, $httponly);

*/

}