<?php
/**
 * Table Definition for tb_usuario
 */

class DataObject_TbUsuario extends DB_DataObject 
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'tb_usuario';                      // table name
    public $id;                              // int(11)  not_null primary_key auto_increment
    public $nombre;                          // string(150)  not_null
    public $apellido;                        // string(150)  not_null
    public $fechaNacimiento;                 // date(10)  not_null binary
    public $documento;                       // string(20)  not_null
    public $telefono;                        // string(25)  not_null
    public $email;                           // string(150)  not_null
    public $provincia;                       // string(100)  not_null
    public $ciudad;                          // string(100)  not_null
    public $activo;                          // string(1)  not_null enum
    public $contrasena;                      // string(100)  not_null
    public $idFacebook;                      // string(50)  
    public $fecha;                           // datetime(19)  not_null binary
    public $fechaActualizacion;              // datetime(19)  binary

    /* Static get */
    function &staticGet($class,$k,$v=NULL) { return DB_DataObject::staticGet('DataObject_TbUsuario',$k,$v); }

    function table()
    {
         return array(
             'id' =>  DB_DATAOBJECT_INT + DB_DATAOBJECT_NOTNULL,
             'nombre' =>  DB_DATAOBJECT_STR + DB_DATAOBJECT_NOTNULL,
             'apellido' =>  DB_DATAOBJECT_STR + DB_DATAOBJECT_NOTNULL,
             'fechaNacimiento' =>  DB_DATAOBJECT_STR + DB_DATAOBJECT_DATE + DB_DATAOBJECT_NOTNULL,
             'documento' =>  DB_DATAOBJECT_STR + DB_DATAOBJECT_NOTNULL,
             'telefono' =>  DB_DATAOBJECT_STR + DB_DATAOBJECT_NOTNULL,
             'email' =>  DB_DATAOBJECT_STR + DB_DATAOBJECT_NOTNULL,
             'provincia' =>  DB_DATAOBJECT_STR + DB_DATAOBJECT_NOTNULL,
             'ciudad' =>  DB_DATAOBJECT_STR + DB_DATAOBJECT_NOTNULL,
             'activo' =>  DB_DATAOBJECT_STR + DB_DATAOBJECT_NOTNULL,
             'contrasena' =>  DB_DATAOBJECT_STR + DB_DATAOBJECT_NOTNULL,
             'idFacebook' =>  DB_DATAOBJECT_STR,
             'fecha' =>  DB_DATAOBJECT_STR + DB_DATAOBJECT_DATE + DB_DATAOBJECT_TIME + DB_DATAOBJECT_NOTNULL,
             'fechaActualizacion' =>  DB_DATAOBJECT_STR + DB_DATAOBJECT_DATE + DB_DATAOBJECT_TIME,
         );
    }

    function keys()
    {
         return array('id');
    }

    function sequenceKey() // keyname, use native, native name
    {
         return array('id', true, false);
    }

    function defaults() // column default values 
    {
         return array(
             'nombre' => '',
             'apellido' => '',
             'documento' => '',
             'telefono' => '',
             'email' => '',
             'provincia' => '',
             'ciudad' => '',
             'activo' => '',
             'contrasena' => '',
             'idFacebook' => '',
         );
    }


    /* the code above is auto generated do not remove the tag below */
    ###END_AUTOCODE
}
