/*
Canvas Display

Controls the views. Mother of all friggin view.

Notes:
If cropRect crops larger than image, the image will not appear.
Eg: 10x10 picture crop (0,0,11,11) will yield nothing.


*/
var CanvasDisplay = function () {
	
	var canvasElement = null;
	var canvasContext = null;
	var bufferElement = null;
	var bufferContext = null;

	var imageList = [];
	var removeImageObjectFlag = false;

	var initCanvasDisplay = function ($canvas) {
		// Canvas Init
		canvasElement = $canvas[0];
		canvasContext = canvasElement.getContext("2d");
		// Buffer Init
		bufferElement = document.createElement('canvas');
		bufferElement.width = canvasElement.width;
		bufferElement.height = canvasElement.height;
		bufferContext = bufferElement.getContext('2d');
	}

	var updateCanvasDisplay = function () {

		// Buffer Clear, Draw
		bufferContext.clearRect(0, 0, bufferElement.width, bufferElement.height);
		imageListCount = imageList.length;
		for (var i=0; i<imageListCount; i++){
			imageObject = imageList[i];
			bufferContext.save();

			bufferContext.drawImage(
				imageObject.img,
				imageObject.cropRect.getRectOrigin().get().x2d,
				imageObject.cropRect.getRectOrigin().get().y2d,
				imageObject.cropRect.getRectWidth(),
				imageObject.cropRect.getRectHeight(),
				imageObject.posRect.getRectOrigin().get().x2d,
				imageObject.posRect.getRectOrigin().get().y2d,
				imageObject.posRect.getRectWidth(),
				imageObject.posRect.getRectHeight()
			);
		}

		// Remove Flagged Objects
		if (removeImageObjectFlag){
			var imageListLength = imageList.length;
			var offset=0;
			for (var i=0; i<imageListLength; i++){
				var imageObject = imageList[i-offset];
				if (imageObject.deleteFlag){
					imageList.splice(i-offset,1);
					offset++;
				}
			}
			removeImageObjectFlag = false;
		}

		// Canvas Clear, Draw
		canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
		canvasContext.drawImage(bufferElement, 0, 0);
	};

	var addImageToCanvas = function (img, posRect, cropRect, rotation) {
		// PosRect states area on the canvas, cropRect is the area cut out to be used on that area.
		var imageObject = {"img": img, "posRect": posRect, "cropRect": cropRect, "rotatePoint": ""};
		imageList.push(imageObject);
		return imageObject;
	};

	var removeImageFromCanvas = function (imageObjectCopy) {
		for (var i in imageList){
			if (imageList[i] == imageObjectCopy){
				imageList[i]["deleteFlag"] = true;
			}
		}
		removeImageObjectFlag = true;
	};

	var removeAllImagesFromCanvas = function () {
		for (var i in imageList){
			imageList[i]["deleteFlag"] = true;
		}
		removeImageObjectFlag = true;
	};

	return {
		initCanvasDisplay: initCanvasDisplay,
		updateCanvasDisplay: updateCanvasDisplay,
		addImageToCanvas: addImageToCanvas,
		removeImageFromCanvas: removeImageFromCanvas,
		removeAllImagesFromCanvas: removeAllImagesFromCanvas
	};
};