<?php
require('db/requires.php');
ini_set('display_errors','0');
@error_reporting(0);

$registrar= new Registro();
if (isset($_POST['idUsuario']) && $_POST['idUsuario'] !="" && isset($_POST['idReceta']) && $_POST['idReceta'] !="") {
    $data = array(
        "idUsuario"=>$_POST['idUsuario'],
        "idReceta"=>$_POST['idReceta']
    );
    $idReg = $registrar->usuarioReceta($data);
    var_dump($insert);
    if ($id>0) {
        $result['error']=1;
        $result['idReg']=$idReg;
    }else{
        $result['error']=0;
    }
    echo json_encode($result);
}
?>