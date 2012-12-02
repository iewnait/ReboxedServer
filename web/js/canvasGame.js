var CanvasGame = function(){

	//// Variables ////


	// Library Instances
	var instanceCanvasDisplay = null;
	var instanceCanvasInput = null;
	var instanceCanvasLoop = null;

	// View Management
	var imageList = {};


	//// Functions ////

	// Initialization
	var canvasGameInit = function () {
		// Library Instantiation
		instanceCanvasDisplay = new CanvasDisplay ();
		instanceCanvasInput = new CanvasInput ();
		instanceCanvasLoop = new CanvasLoop();
		instanceCanvasDisplay.initCanvasDisplay($('#myCanvas'));
		instanceCanvasInput.initCanvasInput($('#myCanvas'));
		instanceCanvasLoop.initCanvasLoop(17);
		instanceCanvasLoop.addIntervalCallback(function () {instanceCanvasDisplay.updateCanvasDisplay();});
		mainmenuView();
	};

	// Controller - Main Game Logic
	var roundUpdate = function () {

		// Movement Calculation
		switch (whiteMovement){
			case 'towards': relativeDistance --; break;
			case 'away': relativeDistance ++; break;
			default : break;
		}
		switch (blackMovement){
			case 'towards': relativeDistance --; break;
			case 'away': relativeDistance ++; break;
			default : break;
		}
		if (whiteMovement == 'left' && blackMovement == 'right'){
			relativeDistance += 1;
		}
		if (whiteMovement == 'right' && blackMovement == 'left'){
			relativeDistance += 1;
		}
		// Movement Limit
		if (relativeDistance > 6){
			relativeDistance = 6;
		} else if (relativeDistance < 1){
			relativeDistance = 1;
		}

		// Convert To Decision
		tempDecision = null;

		tempDecision = new Decision ();
		if (blackAction == 'block' || blackAction == 'counter'){
			tempDecision.dTarget = 'black';
			tempDecision.dDelay = 1;
			tempDecision.dAction = blackAction;
			playerDecisionsList.push(tempDecision);
		} else {
			tempDecision.dTarget = 'white';
			tempDecision.dDelay = relativeDistance;
			tempDecision.dAction = blackAction;
			playerDecisionsList.push(tempDecision);
		}

		tempDecision = new Decision ();
		if (whiteAction == 'block' || whiteAction == 'counter'){
			tempDecision.dTarget = 'white';
			tempDecision.dDelay = 1;
			tempDecision.dAction = whiteAction;
			playerDecisionsList.push(tempDecision);
		} else {
			tempDecision.dTarget = 'black';
			tempDecision.dDelay = relativeDistance;
			tempDecision.dAction = whiteAction;
			playerDecisionsList.push(tempDecision);
		}

		tempDecision = null;

		// Execute Decisions
		executeDecisionsList = [];
		for (var i=0; i<playerDecisionsList.length; i++){
			playerDecisionsList[i].dDelay--;
			if (playerDecisionsList[i].dDelay<=0){
				executeDecisionsList.push(playerDecisionsList[i]);
				playerDecisionsList.splice(i, 1);
				i--;
			}
		}
		
		// Calculate Round
		roundAdvantage = 0;

		var whiteBlock = 0;
		var blackBlock = 0;
		var whiteCounter = 0;
		var blackCounter = 0;
		for (var j=0; j<executeDecisionsList.length; j++){
			tempDecision = executeDecisionsList[j];
			if (tempDecision.dAction == 'block'){
				if (tempDecision.dTarget == 'black'){
					blackBlock = 1;
				}
				if (tempDecision.dTarget == 'white'){
					whiteBlock = 1;
				}
			}
			if (tempDecision.dAction == 'counter'){
				if (tempDecision.dTarget == 'black'){
					blackCounter = 1;
				}
				if (tempDecision.dTarget == 'white'){
					whiteCounter = 1;
				}
			}
		}

		// black negative, white positive.
		for (var k=0; k<executeDecisionsList.length; k++){
			tempDecision = executeDecisionsList[k];
			console.log(tempDecision.dAction);
			if (tempDecision.dAction == 'quick'){
				if (tempDecision.dTarget == 'black'){
					if(blackBlock == 1){
						roundAdvantage -= 0.75;

					} else {
						roundAdvantage += 0.50;
					}
				}
				if (tempDecision.dTarget == 'white'){
					if(whiteBlock == 1){
						roundAdvantage += 0.75;
					} else {
						roundAdvantage -= 0.50;
					}
				}
			}
			if (tempDecision.dAction == 'powerful'){
				if (tempDecision.dTarget == 'black'){
					if(blackCounter == 1){
						roundAdvantage -= 1.50;
					} else {
						roundAdvantage += 1.00;
					}
				}
				if (tempDecision.dTarget == 'white'){
					if(whiteCounter == 1){
						roundAdvantage += 1.50;
					} else {
						roundAdvantage -= 1.00;
					}
				}
			}
		}

		// Resolve Resultant
		pointAdvantage += roundAdvantage;

		// Clear Player Actions And Movements
		whiteAction = "";
		blackAction = "";
		whiteMovement = "";
		blackMovement = "";
	};


	// View - Loader
	var loaderView = function () {

	}


	// View - Main Menu
	var mainmenuView = function () {
		var mainMenuImageSources = {
			"background": "file://localhost/Users/xythum/Documents/WebDev/img/mainmenu/background.png",
			"startButton": "file://localhost/Users/xythum/Documents/WebDev/img/mainmenu/startButton.png"
		};
		convertSourcesToImages(mainMenuImageSources);
		var cropRect = new Rect2d(new Point2d(0, 0), 1024, 576);
		var boundRect = new Rect2d(new Point2d(0, 0), 1024, 576);
		instanceCanvasDisplay.addImageToCanvas(imageList.background, cropRect, boundRect);

		var cropRect = new Rect2d(new Point2d(342, 400), 340, 55);
		var boundRect = new Rect2d(new Point2d(0, 0), 340, 55);
		var imageStartButton = instanceCanvasDisplay.addImageToCanvas(imageList.startButton, cropRect, boundRect);

		var intervalCallback = instanceCanvasLoop.addIntervalCallback(function () {
			imageStartButton.posRect.xPos ++;
		});

		var active = false;
        var ci = instanceCanvasInput.addMouseDownCallback(cropRect, function () {
			if (active == false){
				active = true;
	        	instanceCanvasDisplay.removeAllImagesFromCanvas();
	        	instanceCanvasInput.removeMouseDownCallback(ci);
	        	instanceCanvasLoop.removeIntervalCallback(intervalCallback);
	        	gameplayView();
	        }
        });

		var rectBound = new Rect2d();
        rectBound.setRectWithValues(100, 100, 100, 100);
        var ci = instanceCanvasInput.addMouseDownCallback(rectBound, function () {
        	instanceCanvasLoop.removeIntervalCallback(intervalCallback);	
        });

	};

	var gameplayView = function (){
		// Put in background
		var gameplayImageSources = {
			"background": "",
			"actionBlock": "file://localhost/Users/xythum/Documents/WebDev/img/gameplay/actionBlock_48x48.png",
			"actionCounter": "file://localhost/Users/xythum/Documents/WebDev/img/gameplay/actionCounter_48x48.png",
			"actionQuick": "file://localhost/Users/xythum/Documents/WebDev/img/gameplay/actionQuick_48x48.png",
			"actionStrong": "file://localhost/Users/xythum/Documents/WebDev/img/gameplay/actionStrong_48x48.png"
		};
		convertSourcesToImages(gameplayImageSources);


		//instanceCanvasDisplay.addImageToCanvas(imageList.background, 0,0);
		instanceCanvasLoop.addIntervalCallback(function(){
			if (instanceCanvasLoop.getFrameCount()%60 == 0){
				console.log("calculate");
			}



		});

		var player1Action = "";

		// Keypress Player 1 "w"
		instanceCanvasInput.addKeyDownCallback(65, function(){
			player1Action = "w";
		});

		// Keypress Player 1 "a"
		instanceCanvasInput.addKeyDownCallback(65, function(){
			player1Action = "a";
		});



		


		/*
		var active = false;
		instanceCanvasInput.addKeyDownCallback(65, function(){
			if (active == false){
				active = true;
				console.log("pressedA");
				var lastingCount = 20;
				var cropRect = new Rect2d(new Point2d(0, 0), 48, 48);
				var posRect = new Rect2d(new Point2d(0, 0), 48, 48);
				var img = instanceCanvasDisplay.addImageToCanvas(imageList.actionQuick, posRect, cropRect);
				instanceCanvasLoop.addIntervalCallback(function(){
					if (instanceCanvasLoop.getFrameCount()%10 == 0){
						var origin = img.posRect.getRectOrigin();
						origin.setX((origin.getX())+1);
						lastingCount--;
					}
					if (lastingCount == 0){
						instanceCanvasDisplay.removeImageFromCanvas(img);
						active = false;
					}
				});
			}
		});
		*/

	};

	var convertSourcesToImages = function (imageSources){
		for(var key in imageSources){
            var imageName = key;
            var imageSource = imageSources[key];
            var imageObject = new Image();
            imageObject.src = imageSource;
            imageList[imageName] = imageObject;
        }
	};

	//// Public ////
	return {
		canvasGameInit: canvasGameInit
	};
};



/*

To switch from one place to another page should be a new class because:
- if you want to organise each one, it would be easy to find the relative modules to do what they need to do.
- follows the MVC movement well.

Not using it
- If you want to do the state machine flow.
- Can get quite disorganized, but get things done.
- Might be good in this state where functions are thrown around like dolls



*/