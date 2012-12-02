$(document).ready(function() {

	// Write all page specific javascripts here.
	var openPopup = false;

	$('html').click(function(pageEvent){
		$('#poppup_div').css({left:leftVal,top:topVal}).hide();
		$('.solutionsRow').removeClass('greyOut');
	});


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
