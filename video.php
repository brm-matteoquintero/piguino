<?php
if(isset($_COOKIE['ywd_vid']) && $_COOKIE['ywd_vid']!=''){
	
	require("db/requires.php");
	$smarty->display("video.html");
}else{
	header('location: /');
}
?>