<?php

require_once "Mail.php";

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

		// check if device matches solution device
		if($solution->device_tagged <> $devicename) continue;

		try {

		// retrieve solution via key
		$gsolution = \Httpful\Request::get(
	                $_firebase_uri . 'solutions/' . $key . '/1/.json')
	                ->send();

		// get array of blocks
		$gsolution = $gsolution->body->blocks;

		$numblocks = sizeof($gsolution);

		$returnvalue = TRUE;

		for($i = 0; $i < $numblocks; ++$i) {

			try {

			$gblock = $gsolution[$i];
			$block = $solution->blocks[$i];

			
			//
			switch($gblock->id) {
			case "accel":
				if($block->gtlt == 'gt') {
					if($lastsensor['accel'] > $block->velocity)
						$returnvalue = TRUE;
					else
						$returnvalue = FALSE;

				} else { // lt
					if($lastsensor['accel'] < $block->velocity)
						$returnvalue = TRUE;
					else
						$returnvalue = FALSE;
				}
				break;

			case "smoke":
				// convert to %
				$value = $lastsensor['smoke'] / 3.3 * 100.0;
                                if($block->gtlt == 'gt') {
                                        if($value > $block->percentage)
                                                $returnvalue = TRUE;
                                        else
                                                $returnvalue = FALSE;

                                } else { // lt
                                        if($value < $block->percentage)
                                                $returnvalue = TRUE;
                                        else
                                                $returnvalue = FALSE;
                                }
				break;
			
			case "motion":
				// convert to %
				$value = $lastsensor['motion'] / 3.3 * 100.0;
				if($block->gtlt == 'gt') {
                                        if($value > $block->percentage)
                                                $returnvalue = TRUE;
                                        else
                                                $returnvalue = FALSE;

                                } else { // lt
                                        if($value < $block->percentage)
                                                $returnvalue = TRUE;
                                        else
                                                $returnvalue = FALSE;
                                }
				break;

			case "email":
				// Check for suppression
				if(isset($block->suppression_laststamp))
					$laststamp = $block->suppression_laststamp;
				else
					$laststamp = 0;

				if(time() - $laststamp > $block->suppression_delay) {
					$laststamp = time();

					// PEAR Mail
					// require_once "Mail.php"
			
					$headers = array ("From" => "nuscvwo@gmail.com",
	        		        	"To" => $block->address,
					        "Subject" => $block->subject);
				  
					Mail::factory("smtp",
						array ('host' => "smtp.gmail.com",
						'auth' => true,
				                    'username' => "nuscvwo@gmail.com",
			        	            'password' => "vwo2007vwo2007"))
							->send($block->address, $headers, $block->content .
							"\nSmoke: " . $lastsensor['smoke'] / 3.3 * 100.0 . '%' .
							"\nMotion: " . $lastsensor['motion'] / 3.3 * 100.0 .'%' .
							"\nAccel: " . $lastsensor['accel'] . 'm/s^2'
					);

					// write $laststamp back to user solution block $i suppression_laststamp
					try {
					\Httpful\Request::put(
                                                $_firebase_uri . 'users/' . $username . '/solutions_active/'
						. $key .'/blocks/'.$i.'/suppression_laststamp/.json',
						'"' . $laststamp . '"')
                                                ->send();
					}
					catch (Exception $e6) { print_r($e6); }


				}

				$returnvalue = TRUE;
				break;

			case "phone":

				break;

			default:
				// no such element?
				break;
			}
	
			//echo $returnvalue . " HAI \n\n";

			// last block returned false
			if($returnvalue == FALSE) break;

			} catch(Exception $e5) {
				echo 'something broke, exit for loop';
				break;
			}
		}

		} catch(Exception $e4) {
			//echo 'cant find? ignore';
			//print_r($e4);
		}


	}


	} catch(Exception $e3) {
	}


}

