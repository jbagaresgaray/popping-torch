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
			$data=file_get_contents( 'php://input' );
	  		$res = json_decode($data);
	  		$test = array(
  				"code" => $res->code,
  				"product" => $res->product,
  				"suburb" => $res->suburb,
  				"time" => $res->time
  			);
  			$id = $res->id;
		  	$value = $firebaseConfig->updateFirebaseValue('/codes/'.$id,$test,$firebase);
			print_r($value);
	    	break;
	  	case 'POST':
	  		$data=file_get_contents( 'php://input' );
	  		$res = json_decode($data);
	  		$test = array(
  				"code" => $res->code,
  				"product" => $res->product,
  				"suburb" => $res->suburb,
  				"time" => $res->time
  			);
  			$value = $firebaseConfig->pushFirebaseValue('/codes',$test,$firebase);
  			print_r($value);
	    	break;
	  	case 'GET':
		  	$value = $firebaseConfig->getFirebaseValue($config->DEFAULT_PATH,$firebase);
			print_r($value);
		    break;
	  	case 'DELETE':
		  	if(!empty($_GET) && isset($_GET['id'])){
		  		$id = $_GET['id'];
		  		$value = $firebaseConfig->deleteFirebaseValue('/codes/'.$id,$firebase);
  				print_r($value);
		  	}
	    	break;
	  default:
	    break;
	}
?>