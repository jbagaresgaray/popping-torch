<?php
	require '../../app/cors.php';
	require '../../app/config.php';
	require '../../vendor/autoload.php';

	$config= new Config();
	$firebaseConfig = new FirebaseConfig();
	$firebase = new \Firebase\FirebaseLib($config->DEFAULT_URL, $config->DEFAULT_TOKEN);

	$method = $_SERVER['REQUEST_METHOD'];
	$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));

	switch ($method) {
		case 'PUT':
			$data=parse_str( file_get_contents( 'php://input' ), $_PUT );
			foreach ($_PUT as $key => $value){
					unset($_PUT[$key]);
					$_PUT[str_replace('amp;', '', $key)] = $value;
			}
			$_REQUEST = array_merge($_REQUEST, $_PUT);

			
	    	break;
	  	case 'POST':
			
	    	break;
	  	case 'GET':
		  	$value = $firebaseConfig->getFirebaseValue($config->DEFAULT_PATH,$firebase);
			print_r($value);
		    break;
	  	case 'DELETE':
		  	
	    	break;
	  default:
	    break;
	}
?>