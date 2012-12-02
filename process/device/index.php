<?php

include('../includes/httpful.phar');
include('../includes/common.inc');

// REceive commands from android device and take action

// Actions: auth, push

if(
	!isset($_POST['cmd'])		|| $_POST['cmd'] == ""
	|| !isset($_POST['user'])	|| $_POST['user'] == ""
	|| !isset($_POST['device'])	|| $_POST['device'] == ""
)
die("invalid parameter, cmd user or device missing");

$cmd = $_POST['cmd'];
$username = $_POST['user'];
$devicename = $_POST['device'];

if($cmd == 'auth')
{
	if(!isset($_POST['pass'])
		|| $_POST['pass'] == ""
	) die("invalid parameter, auth missing");
	
	$password = $_POST['pass'];


	// AUTH
	try {
		$response = \Httpful\Request::get(
			$_firebase_uri . 'users/' . $username . '.json')
			->send();
	} catch (Exception $e) {
		die('null');
	}

	print_r('{"device":"' . $devicename . '"}');
}
else if($cmd == 'post')
{
	try {
		foreach($_POST as $key => $value)
		{
			if($key != 'cmd' && $key != 'user' && $key != 'device')
			{
				$timestamp = time();

				// PUT DATA INTO FIREBASE
				// write value to db lar!
				try {
					//echo "writing $key $value";

					\Httpful\Request::put(
						$_firebase_uri . 'users/' . $username . '/devices/'.$devicename
							.'/sensors/'.$key.'/data/' . $timestamp . '.json',
						'"' . $value . '"')
						->send();
				} catch(Exception $e1) {
					// dont care
				}

				// also track the last timestamp
				try {
					\Httpful\Request::put(
						$_firebase_uri . 'users/' . $username . '/devices/'.$devicename
							.'/last.json',
						'"' . $timestamp . '"')
						->send();
				} catch (Exception $e2) {
					// duncare
				}
			}
		}
	} catch (Exception $e2) {
	}
	echo 'true';
}
