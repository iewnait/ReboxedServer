<?php
class Firebase {

  private $firebaseName = "";
  private $firebasePath = "";

  function makePath($firebaseName) {
    return "https://{$firebaseName}.firebaseio.com/";
  }

  function __construct($firebaseName)  {
    $this->firebaseName = $firebaseName;
    $this->firebasePath = $this->makePath($firebaseName);
  } 

  function get($path) {
    $req = new HttpRequest($this->firebasePath . $path, HTTP_METH_GET);
    
    try {
      $resp = $req->send();
      if ($resp->getResponseCode() == 200) {
        return $resp->getBody();
      }
    } catch (Exception $e) {
      echo $e;
    }
  }

  function isValidLogin($username, $password) {
    if (empty($username) || empty($password)) {
      return false;
    }

    $path = 'users/' . $username . '/password.json';

    $passHash = $this->superfuckingduperhash($password);
    $dbPassHash = json_decode($this->get($path));
    $isValid = ($passHash == $dbPassHash);

    return $isValid;
  }

  function superfuckingduperhash($string) {
    return $string;
  }
}
