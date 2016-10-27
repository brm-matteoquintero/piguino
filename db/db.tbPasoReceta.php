<?php
/**
 * Table Definition for tb_paso_receta
 */

class DataObject_TbPasoReceta extends DB_DataObject 
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'tb_paso_receta';                  // table name
    public $id;                              // int(11)  not_null primary_key auto_increment
    public $idPaso;                          // int(11)  not_null
    public $idReceta;                        // int(11)  not_null
    public $fecha;                           // datetime(19)  not_null binary

    /* Static get */
    function &staticGet($class,$k,$v=NULL) { return DB_DataObject::staticGet('DataObject_TbPasoReceta',$k,$v); }

    function table()
    {
         return array(
             'id' =>  DB_DATAOBJECT_INT + DB_DATAOBJECT_NOTNULL,
             'idPaso' =>  DB_DATAOBJECT_INT + DB_DATAOBJECT_NOTNULL,
             'idReceta' =>  DB_DATAOBJECT_INT + DB_DATAOBJECT_NOTNULL,
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


    /* the code above is auto generated do not remove the tag below */
    ###END_AUTOCODE
}
