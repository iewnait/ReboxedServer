var CanvasLoop = function () {

	// Loop Management
	var _frameCount = 0;
	var _frameInterval = null;

	// Functions
	var _loopedFunctions = [];

	var initCanvasLoop = function (loopTiming) {
		_frameInterval = setInterval(function(){frameLoop();}, loopTiming);
	};

	var frameLoop = function () {
		_frameCount++;
		for (var i in _loopedFunctions){
			_loopedFunctions[i].callbackFunction();
		}
	};

	var addIntervalCallback = function (callbackFunction) {
		var intervalObject = {		
			callbackFunction: callbackFunction
		};

		_loopedFunctions.push(intervalObject);
		return intervalObject;
	};

	var removeIntervalCallback = function (intervalObject){
		var listLength = _loopedFunctions.length;
		for (var i=0; i<listLength; i++){
			var intervalObjectComp = _loopedFunctions[i];
			if (intervalObjectComp == intervalObject){
				_loopedFunctions.splice(i,1);
				break;         
			}
		}
	};

	var getFrameCount = function (){
		return _frameCount;
	};

	return {
		initCanvasLoop: initCanvasLoop,
		addIntervalCallback: addIntervalCallback,
		removeIntervalCallback: removeIntervalCallback,
		getFrameCount: getFrameCount
	};

}