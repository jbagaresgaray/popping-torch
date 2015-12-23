<?php

class Config {
    public $DEFAULT_URL  ='https://popping-torch-5033.firebaseio.com/';
    public $DEFAULT_TOKEN ='Xx31vdKyAQ1YNDm8qWUtKsSQww0CU1JIpPq1nEF2';
    public $DEFAULT_PATH  = '/codes';
}

class FirebaseConfig {

	public function setFirebaseValue($path, $value, $firebase) {
	  $firebase->set($path, $value);
	}

	public function getFirebaseValue($path, $firebase) {
	  return $firebase->get($path);
	}

	public function updateFirebaseValue($path, $data, $firebase) {
	  return $firebase->update($path, $data);
	}

	public function deleteFirebaseValue($path, $firebase) {
	  return $firebase->delete($path);
	}

	public function pushFirebaseValue($path, $data, $firebase) {
	  return $firebase->push($path, $data);
	}

	private function _getJsonPath($path)
    {
        $url = $this->_baseURI;
        $path = ltrim($path, '/');
        $auth = ($this->_token == '') ? '' : '?auth=' . $this->_token;
        return $url . $path . '.json' . $auth;
    }
    
	private function _getCurlHandler($path, $mode)
    {
        $url = $this->_getJsonPath($path);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_TIMEOUT, $this->_timeout);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $this->_timeout);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $mode);
        return $ch;
    }

}

?>
