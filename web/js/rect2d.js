var Rect2d = function (origin, width, height) {

	// Variables
	var _origin = origin || new Point2d();
	var _width = width;
	var _height = height;

	var setRectWithValues = function (originX, originY, width, height) {
		_origin.set(originX, originY);
		_width = width;
		_height = height;
	};

	var setRectWithPoint = function (origin, width, height) {
		_origin = origin;
		_width = width;
		_height = height;
	};

	var checkPointWithinRect = function (point) {
		if (_origin.get().x2d <= point.get().x2d
			&& _origin.get().x2d + _width >= point.get().x2d
			&& _origin.get().y2d <= point.get().y2d
			&& _origin.get().y2d + _height >= point.get().y2d){
			return true;
		}
		return false;
	};

	var getRectOrigin = function (){
		return _origin;
	}

	var getRectWidth = function (){
		return _width;
	}

	var getRectHeight = function (){
		return _height;
	}

	var copyRect = function (){
		return new Rect2d(_origin.copy(), _width, _height)
	}

	return {
		setRectWithValues: setRectWithValues,
		checkPointWithinRect: checkPointWithinRect,
		getRectOrigin: getRectOrigin,
		getRectWidth: getRectWidth,
		getRectHeight: getRectHeight

	}
}
