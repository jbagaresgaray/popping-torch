<?php
	require '../../app/cors.php';
	require '../../app/config.php';

	$config= new Config();
	$method = $_SERVER['REQUEST_METHOD'];
	$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));

	switch ($method) {
	  	case 'GET':
	  		$_host = 'http://v0.postcodeapi.com.au/states.json';
		  	$value = file_get_contents($_host);
			print_r($value);
		    break;
	  default:
	    break;
	}
?>