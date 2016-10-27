<?php
/**
 * Table Definition for tb_receta
 */

class DataObject_TbReceta extends DB_DataObject 
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'tb_receta';                       // table name
    public $id;                              // int(11)  not_null primary_key auto_increment
    public $nombreReceta;                    // string(50)  not_null
    public $videourl;                        // string(50)  
    public $img1;                            // string(50)  
    public $img2;                            // string(50)  
    public $img3;                            // string(50)  
    public $img4;                            // string(50)  
    public $descripcion;                     // blob(65535)  blob
    public $activo;                          // string(1)  not_null enum
    public $fecha;                           // datetime(19)  not_null binary

    /* Static get */
    function &staticGet($class,$k,$v=NULL) { return DB_DataObject::staticGet('DataObject_TbReceta',$k,$v); }

    function table()
    {
         return array(
             'id' =>  DB_DATAOBJECT_INT + DB_DATAOBJECT_NOTNULL,
             'nombreReceta' =>  DB_DATAOBJECT_STR + DB_DATAOBJECT_NOTNULL,
             'videourl' =>  DB_DATAOBJECT_STR,
             'img1' =>  DB_DATAOBJECT_STR,
             'img2' =>  DB_DATAOBJECT_STR,
             'img3' =>  DB_DATAOBJECT_STR,
             'img4' =>  DB_DATAOBJECT_STR,
             'descripcion' =>  DB_DATAOBJECT_STR + DB_DATAOBJECT_BLOB,
             'activo' =>  DB_DATAOBJECT_STR + DB_DATAOBJECT_NOTNULL,
             'fecha' =>  DB_DATAOBJECT_STR + DB_DATAOBJECT_DATE + DB_DATAOBJECT_TIME + DB_DATAOBJECT_NOTNULL,
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
             'nombreReceta' => '',
             'videourl' => '',
             'img1' => '',
             'img2' => '',
             'img3' => '',
             'img4' => '',
             'descripcion' => '',
             'activo' => '',
         );
    }


    /* the code above is auto generated do not remove the tag below */
    ###END_AUTOCODE
}
