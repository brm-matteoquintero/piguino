<?php
	require("db/requires.php");
	$idF=rand (1,20);
	$smarty->assign('planramdom',$idF);
	$smarty->display("synchronize.html");
?>