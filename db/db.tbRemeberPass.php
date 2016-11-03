<?php
/**
 * Table Definition for tb_remeber_pass
 */

class DataObject_TbRemeberPass extends DB_DataObject 
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'tb_remeber_pass';                 // table name
    public $id;                              // int(10)  not_null primary_key auto_increment
    public $mail;                            // string(255)  
    public $keyMail;                         // string(255)  
    public $valido;                          // string(1)  enum
    public $fecha;                           // datetime(19)  binary

    /* Static get */
    function &staticGet($class,$k,$v=NULL) { return DB_DataObject::staticGet('DataObject_TbRemeberPass',$k,$v); }

    function table()
    {
         return array(
             'id' =>  DB_DATAOBJECT_INT + DB_DATAOBJECT_NOTNULL,
             'mail' =>  DB_DATAOBJECT_STR,
             'keyMail' =>  DB_DATAOBJECT_STR,
             'valido' =>  DB_DATAOBJECT_STR,
             'fecha' =>  DB_DATAOBJECT_STR + DB_DATAOBJECT_DATE + DB_DATAOBJECT_TIME,
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
             'mail' => '',
             'keyMail' => '',
             'valido' => 'S',
         );
    }


    /* the code above is auto generated do not remove the tag below */
    ###END_AUTOCODE
}
