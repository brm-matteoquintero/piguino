<?php
if(isset($_COOKIE['ywd_vid']) && $_COOKIE['ywd_vid']!=''){
    require("db/requires.php");
   $session= new manejaSession();
   $registro= new Registro();
   $protocol=$session->site_protocol();
   $protected=$session->llamaPass();
   $idRect=$session->decryptS($_COOKIE['ywd_vid'],$protected);
   $recetas=$registro->recetasPingD($idRect);
   //printVar($recetas);
   $nombre=$recetas[0]->nombre;
   $id=$recetas[0]->id;
   $smarty->assign('nombre',$nombre);
	 $smarty->assign("id",$id);
   $smarty->display("synchronize.html");
}else{
    header('location : /planpinguino/');
}
?>