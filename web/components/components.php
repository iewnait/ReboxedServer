<?php

/* component:
['componentid'] = [

['name']		- friendly name of component

['description'] - desc of component

['type']		- condition or action

['params']		- list of parameter IDs, e.g.
	= ['threshold',
	'gtlt',			(greater than, lesser than?)
	'email',		(for action..)
	'message',
	'phonenum'
	];
	
['gui']			- GUI HTML / JS text

['execute']
	= function ($paramlist) {
		// blah 
		// blah 
		// blah 
		return $truefalse;
	}

*/
$rebox_components = array();

// include all components
foreach (glob("*.component") as $filename)
{
    include $filename;
}

function print_components()
{
	global $rebox_components;
	print_r($rebox_components);
}

function print_gui($componentid)
{
	global $rebox_components;
	try {
		// print out the gui text
		echo $rebox_components[$componentid]['gui'];
		
	} catch (Exception $e)
	{
		// print error if any
		echo 'error';
	}
}