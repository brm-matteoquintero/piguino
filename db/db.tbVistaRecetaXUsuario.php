<?php
/**
 * Table Definition for tb_vista_receta_x_usuario
 */

class DataObject_TbVistaRecetaXUsuario extends DB_DataObject 
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'tb_vista_receta_x_usuario';       // table name
    public $id;                              // int(11)  not_null
    public $nombreReceta;                    // string(150)  not_null
    public $idUsuario;                       // int(11)  
    public $idReceta;                        // int(11)  

    /* Static get */
    function &staticGet($class,$k,$v=NULL) { return DB_DataObject::staticGet('DataObject_TbVistaRecetaXUsuario',$k,$v); }

    function table()
    {
         return array(
             'id' =>  DB_DATAOBJECT_INT + DB_DATAOBJECT_NOTNULL,
             'nombreReceta' =>  DB_DATAOBJECT_STR + DB_DATAOBJECT_NOTNULL,
             'idUsuario' =>  DB_DATAOBJECT_INT,
             'idReceta' =>  DB_DATAOBJECT_INT,
         );
    }

    function keys()
    {
         return array();
    }

    function sequenceKey() // keyname, use native, native name
    {
         return array('id', true, false);
    }

    function defaults() // column default values 
    {
         return array(
             'id' => 0,
             'nombreReceta' => '',
         );
    }


    /* the code above is auto generated do not remove the tag below */
    ###END_AUTOCODE
}
