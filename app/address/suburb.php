<?php
	require '../../app/cors.php';
	require '../../app/config.php';

	$config= new Config();
	$method = $_SERVER['REQUEST_METHOD'];
	$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));

	switch ($method) {
	  	case 'GET':
	  		$value = $request[0];
	  		$_host = 'http://v0.postcodeapi.com.au/suburbs.json';
		  	$value = file_get_contents($_host);
			print_r($value);
		    break;
	  default:
	    break;
	}
?>