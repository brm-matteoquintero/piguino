<?php
/**
 * Table Definition for tb_session
 */

class DataObject_TbSession extends DB_DataObject 
{
    ###START_AUTOCODE
    /* the code below is auto generated do not remove the above tag */

    public $__table = 'tb_session';                      // table name
    public $id;                              // int(11)  not_null primary_key auto_increment
    public $user_id;                         // string(128)  not_null
    public $data;                            // blob(65535)  not_null blob
    public $session_key;                     // string(128)  not_null
    public $dns;                             // string(128)  not_null
    public $set_time;                        // string(10)  not_null

    /* Static get */
    function &staticGet($class,$k,$v=NULL) { return DB_DataObject::staticGet('DataObject_TbSession',$k,$v); }

    function table()
    {
         return array(
             'id' =>  DB_DATAOBJECT_INT + DB_DATAOBJECT_NOTNULL,
             'user_id' =>  DB_DATAOBJECT_STR + DB_DATAOBJECT_NOTNULL,
             'data' =>  DB_DATAOBJECT_STR + DB_DATAOBJECT_BLOB + DB_DATAOBJECT_NOTNULL,
             'session_key' =>  DB_DATAOBJECT_STR + DB_DATAOBJECT_NOTNULL,
             'dns' =>  DB_DATAOBJECT_STR + DB_DATAOBJECT_NOTNULL,
             'set_time' =>  DB_DATAOBJECT_STR + DB_DATAOBJECT_NOTNULL,
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
             'user_id' => '',
             'data' => '',
             'session_key' => '',
             'dns' => '',
             'set_time' => '',
         );
    }


    /* the code above is auto generated do not remove the tag below */
    ###END_AUTOCODE
}
