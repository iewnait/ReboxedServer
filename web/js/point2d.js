// Point2d Object
// Object that holds 2d points.

var Point2d = function (x2d,y2d) {

	var _x2d = x2d || 0.0;
	var _y2d = y2d || 0.0;


	var set = function (x2d,y2d) {
		_x2d = x2d;
		_y2d = y2d;
	};

	var setX = function (x2d) {
		_x2d = x2d;
	};

	var setY = function (y2d) {
		_y2d = y2d;
	};

	var get = function () {
		return {"x2d": _x2d, "y2d": _y2d};
	};

	var getX = function () {
		return _x2d;
	};

	var getY = function () {
		return _y2d;
	};

	var add = function (addPoint) {
		var resultPoint = new Point2d();
		var resultX = _x2d + addPoint.get().x2d;
		var resultY = _y2d + addPoint.get().y2d;
		resultPoint.set(resultX, resultY);
		return resultPoint;
	}

	var sub = function (subPoint) {
		var resultPoint = new Point2d();
		var resultX = _x2d - subPoint.get().x2d;
		var resultY = _y2d - subPoint.get().y2d;
		resultPoint.set(resultX, resultY);
		return resultPoint;
	}

	var copy = function (){
		return new Point2d(_x2d, _y2d);
	}

	return {
		set: set,
		setX: setX,
		setY: setY,
		get: get,
		getX: getX,
		getY: getY,
		add: add,
		sub: sub,
		copy: copy
	};

};