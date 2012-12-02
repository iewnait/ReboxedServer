$(document).ready(function() {

	// Write all page specific javascripts here.
	$('.solutionsRow').click(function(){
		console.log("test");
		window.location = "customizableWidget.html";
	});

  var fbRef = new Firebase('https://rebox.firebaseio.com');

  var user_id = userId(); 

  function userId() {
    var req = new XMLHttpRequest();

    req.open('GET', 'php/user.php', false);
    req.send();

    if (req.status == 200) {
      return req.responseText;
    }
  }

  var devicesRef = fbRef.child('users').child(""+user_id).child('devices');
  devicesRef.on('value', function(snapshot) {
    var devices = snapshot.val();

    updateDeviceList(devices);
  });

  function updateDeviceList(devices) {
    var devicesCol = document.getElementById('devicesCol');
    devicesCol.innerHTML = "<div><h4 style='color: #CCC; padding: 10px;'>Device List</h4></div>";

    for (var deviceName in devices) {
      addDeviceNode(deviceName, devicesCol);
    }
  }

  function clear(element) {
    element.innerHTML = "";
  }

  function addDeviceNode(deviceName, parent) {
    var child = document.createElement('div');
    child.className = "deviceDetails green";
    child.innerHTML = "<b>" + deviceName + "</b><br />Working<br /><div style='text-align:right;'><a href='#'>Location</a></div>";
    var newChild = parent.appendChild(child);
  }
});