$(document).ready(function() {

	// Write all page specific javascripts here.
	var openPopup = false;

	$('html').click(function(pageEvent){
		$('#poppup_div').hide();
		$('.solutionsRow').removeClass('greyOut');
	});

  $('.inlinesparkline').sparkline('html',{width: '100px'}); 

	$('.solutionsRow').click(function(pageEvent){
		$('.solutionsRow').removeClass('greyOut');
		$(this).addClass('greyOut')
		var height = $('#poppup_div').height();
		var width = $('#poppup_div').width();
		//calculating offset for displaying popup message
		leftVal=pageEvent.pageX+20+"px"; //-(width/2)
		topVal=pageEvent.pageY-20+"px"; //-(height/2)
		//show the popup message and hide with fading effect
		$('#poppup_div').css({left:leftVal,top:topVal}).show();
		pageEvent.stopPropagation();
	});

  var fbRef = new Firebase('https://rebox.firebaseio.com');

  var user_id = userId();
  var userRef = fbRef.child('users').child(""+user_id);
  function userId() {
    var req = new XMLHttpRequest();

    req.open('GET', 'php/user.php', false);
    req.send();

    if (req.status == 200) {
      return req.responseText;
    }
  }

  var devicesRef = userRef.child('devices');
  devicesRef.on('value', function(snapshot) {
    var devices = snapshot.val();

    updateDeviceList(devices);
  });

  function updateDeviceList(devices) {
    var devicesCol = document.getElementById('devicesCol');
    var existingDevices = document.getElementsByClassName('deviceDetails');

    $('.deviceDetails').remove();
    
    for (var deviceName in devices) {
      addDeviceNode(deviceName, devicesCol);
    }
    $('.inlinesparkline').sparkline('html', {width: '100px'});
  }

  function clear(element) {
    element.innerHTML = "";
  } 

  function addDeviceNode(deviceName, parent) {
    var child = document.createElement('div');
    child.className = "deviceDetails green";

    var accelString  = null;
    var smokeString = null;
    var motionString = null;

    var devSensors = devicesRef.child(deviceName).child('sensors');
    var accel = devSensors.child('accel').child('data').limit(10);
    var smoke = devSensors.child('smoke').child('data').limit(10);
    var motion = devSensors.child('motion').child('data').limit(10);

    accel.on('value', function(snapshot) {
      var accelData = snapshot.val();
      
      accelString = valuesToString(accelData);
    });

    motion.on('value', function(snapshot) {
      var motionData = snapshot.val();

      motionString = valuesToString(motionData);
    });

    smoke.on('value', function(snapshot) {
      var smokeData = snapshot.val();

      smokeString = valuesToString(smokeData);
    });
    // console.log(smokeString);
    // console.log(motionString);
    // console.log(accelString);

    child.innerHTML = "<b>" + deviceName + "</b><br />Working<br /><div style='text-align:right;'>          Sensor Activity </br>           Motion Sensor:<span class='inlinesparkline pull-right'>" + motionString + "</span><br/>           Smoke Sensor:<span class='inlinesparkline pull-right'>" + smokeString + "</span><br/>           Accel. Sensor:<span class='inlinesparkline pull-right'>"+ accelString+"</span></br/>";
    var newChild = parent.appendChild(child);
  }

  var solutionsRef = userRef.child("solutions_active");

  solutionsRef.on('value', function(snapshot) {
    var solnTable = document.getElementById('solutions_table');
    var existingRows = document.getElementsByClassName('solutionsRow');
    
    $('.solutionsRow').remove();

    // for (i = existingRows.length - 1; i >= 0; i--) {
    //   solnTable.removeChild(existingRows[0]);
    // }

    var solutions = snapshot.val();
    for (var solution in solutions) {
      insertSolution(solutions[solution], solution, solnTable);
    }
  });

  function valuesToString(data) {
    // console.log(data);

    var str = "";
    for (var k in data) {
       (function (k) {
        str += data[k] + ',';
       })(k); 
    }
    return str;
  }

  function insertSolution(solnRef, solnName, solnTable) {
    var solutionsFooter = document.getElementById('solutions_footer');

    var solRow = document.createElement('div');
    solRow.className = "solutionsRow container-fluid";
    solRow.id = solnName;
    solRow = solnTable.insertBefore(solRow, solutionsFooter);

    solRow.onclick = function() {
      document.location = ('customizableWidget.html?q=' + solnName);
    };

    var mainDetails = document.createElement('div');
    mainDetails.className = "mainDetails row-fluid";
    mainDetails = solRow.appendChild(mainDetails);

    var statusContainer = document.createElement('div');
    var solnContainer = document.createElement('div');
    var deviceContainer = document.createElement('div');

    statusContainer.className = "statusContainer span2";
    var status = document.createElement('div');
    status.className = "status green";
    status.innerHTML = solnRef.status;
    status = statusContainer.appendChild(status);
    statusContainer = mainDetails.appendChild(statusContainer);

    solnContainer.className = "solutionContainer span5";
    var soln = document.createElement('div');
    soln.className = "solution";
    soln.innerHTML = solnName;
    soln = solnContainer.appendChild(soln);
    solnContainer = mainDetails.appendChild(solnContainer);

    deviceContainer.className = "deviceContainer span5";
    var device = document.createElement('div')
    device.className = "device";
    device.innerHTML = solnRef.device_tagged;
    device = deviceContainer.appendChild(device);
    deviceContainer = mainDetails.appendChild(deviceContainer);

    var expandDetails = document.createElement('h')
    expandDetails.className = "expand-details";
    expandDetails = solRow.appendChild(expandDetails);
  }
});
