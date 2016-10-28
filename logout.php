<?php
foreach ($_COOKIE as $key => $value) {
    unset($value);
    var_dump($key);
    $_COOKIE[$key]="";
    setcookie($key, null, time() - 3600,'/');
}

header('location: /planpinguino/');
?>