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

$lastsensor = array();

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
		$timestamp = time();

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

		foreach($_POST as $key => $value)
		{
			if($key != 'cmd' && $key != 'user' && $key != 'device')
			{
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
			
				$lastsensor[$key] = $value;
			}
		}
	} catch (Exception $e2) {
	}
	echo 'true';
	echo "\n\n\n";

	try {
	// Obtain solutions
	$solutions = \Httpful\Request::get(
        	$_firebase_uri . 'users/' . $username . '/solutions_active.json')
		->autoParse(FALSE)
	        ->send();
	$solutions = json_decode($solutions->body);

	foreach($solutions as $key => $solution) {

		if($solution->status <> 'active') continue;

		try {

		// retrieve solution via key
		$solution = \Httpful\Request::get(
	                $_firebase_uri . 'solutions/' . $key . '/1/.json')
	                ->send();

		// get array of blocks
		$solution = $solution->body->blocks;

		$numblocks = sizeof($solution);

		for($i = 0; $i < $numblocks; ++$i) {
			$block = $solution[$i];
			
		}

		} catch(Exception $e4) {
			// cant find? ignore
		}


	}


	} catch(Exception $e3) {
	}


}

