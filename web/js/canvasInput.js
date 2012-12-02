// Handles user input events.
// Requires jQuery.js
// Requires point2d.js

var CanvasInput = function () {


	// // Constants // // 
	var bufferedDelayMs = 50;

	// // Variables // //
	var _$canvas;
	var _listMouseDownCallbacks = [];
	var _listMouseDragCallbacks = [];
	var _listMouseUpCallbacks = [];
	var _listKeyDownCallbacks = [];

	// // Functions // //
	var initCanvasInput = function ($canvas){
		_$canvas = $canvas;
		_$canvas.mousedown(dispatchMouseDownCallback);
		$(document).keydown(dispatchKeyDownCallback);

	};

	// Callback function to handle mousedown calls.
	var dispatchMouseDownCallback = function (mouseEvent) {
		var rect = mouseEvent.target.getBoundingClientRect();
		var mouseX = mouseEvent.offsetX || mouseEvent.pageX - rect.left - window.scrollX;
		var mouseY = mouseEvent.offsetY || mouseEvent.pageY - rect.top - window.scrollY;
		var mousePoint = new Point2d();
		mousePoint.set(mouseX, mouseY);
		//console.log(mouseX + " " + mouseY);

		var listLength = _listMouseDownCallbacks.length;
		//console.log(listLength);
		for (var i=0; i<listLength; i++){
			var callbackObject = _listMouseDownCallbacks[i];
			if (callbackObject){ // Check if the callback still exists. It could be removed and still ran through.
				if (callbackObject.rectBound.checkPointWithinRect(mousePoint)){
					callbackObject.callback();
				}	
			}
		}
	};

	var addMouseDownCallback = function (rectBound, callbackFunction) {
		var mouseDownCallback = {		
			rectBound: rectBound, 
			callback: callbackFunction
		};

		_listMouseDownCallbacks.push(mouseDownCallback);
		return mouseDownCallback;
	};

	var removeMouseDownCallback = function (mouseDownCallback) {
		var listLength = _listMouseDownCallbacks.length;
		for (var i=0; i<listLength; i++){
			var callbackObject = _listMouseDownCallbacks[i];
			if (callbackObject == mouseDownCallback){
				_listMouseDownCallbacks.splice(i,1);
				break;         
			}
		}
	};

	var dispatchKeyDownCallback = function (keyEvent){
		var keyCode = keyEvent.keyCode;
		var listLength = _listKeyDownCallbacks.length;
		//console.log(listLength);
		for (var i=0; i<listLength; i++){
			var callbackObject = _listKeyDownCallbacks[i];
			if (callbackObject){ // Check if the callback still exists. It could be removed and still ran through.
				if (callbackObject.key == keyCode){
					callbackObject.callback();
				}	
			}
		}
	};

/*
	// To prevent multiple firing of key events on multiple presses.
	var keyBuffer = "";
	var bufferedDispatchKeyDownCallback = function (keyEvent){
		var keyCode = keyEvent.keyCode;
		var listLength = _listKeyDownCallbacks.length;
		// Store key in buffer
		keyBuffer = keyCode;
		var resolveKey = function () {
			for (var i=0; i<listLength; i++){
				var callbackObject = _listKeyDownCallbacks[i];
				if (callbackObject){ // Check if the callback still exists. It could be removed and still ran through.
					if (callbackObject.key == keyBuffer){
						callbackObject.callback();
						keyBuffer = "";
					}	
				}
			}
		}
		setTimeout(resolveKey, bufferedDelayMs);
	};
*/

	var addKeyDownCallback = function (key, callbackFunction) {
		var keyDownCallback = {		
			key: key,
			callback: callbackFunction
		};

		_listKeyDownCallbacks.push(keyDownCallback);
		return keyDownCallback;
	};

	var removeKeyDownCallback = function (keyPressCallback) {
		var listLength = _listKeyDownCallbacks.length;
		for (var i=0; i<listLength; i++){
			var callbackObject = _listKeyDownCallbacks[i];
			if (callbackObject == keyPressCallback){
				_listKeyDownCallbacks.splice(i,1);
				break;         
			}
		}
	};

	var checkPointWithinPixelBound = function () {
		id = ctx.getImageData(0,0, img.width, img.height);  //Get the pixelData of image
		//id.data[(y*width+x)*4+3] for the alpha value of pixel at x,y, 0->255
	};

	// // Public // //
	return {
		initCanvasInput: initCanvasInput,
		addMouseDownCallback: addMouseDownCallback,
		removeMouseDownCallback: removeMouseDownCallback,
		addKeyDownCallback: addKeyDownCallback,
		removeKeyDownCallback: removeKeyDownCallback,
		checkPointWithinPixelBound: checkPointWithinPixelBound
	};

};