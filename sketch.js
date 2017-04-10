const KEY_A  = 65;
const KEY_Z = KEY_A + 25;
const SPACE = 32;
const backgroundColor = 200;
const diameter = 20;
let mouseDown = false;

const scale = .05;
const margin = 50;

const Letters = (function() {
	
	const coordinates = {};

	let currentLetter = 'A';
	let currentX = margin;
	let currentY = margin;

	const getNextLetter = function(c) {
		return String.fromCharCode(c.charCodeAt(0) + 1);
	}

	const getCurrentLetter = function() {
		return currentLetter;
	}

	const letterFromCode = function(c) {
		return String.fromCharCode('A'.charCodeAt(0) + c - KEY_A);
	}

	const updateLetter = function() {
		currentLetter = getNextLetter(currentLetter);
	}

	const init = function() {
		let letter = 'A';
		for (let i = 0; i < 26; i++) { 
			coordinates[letter] = {
				xs: [],
				ys: []
			};;
			letter = getNextLetter(letter);
		}
	};

	const pushPoint = function(x, y) {
		coordinates[currentLetter].xs.push(x);
		coordinates[currentLetter].ys.push(y);
	};

	const drawLetters = function() {
		let xs = coordinates[currentLetter].xs;
		let ys = coordinates[currentLetter].ys;
		for (let i = 0; i < xs.length; i++) {
			ellipse(xs[i], ys[i], diameter, diameter);
		}
	};

	const nextSpace = function() {
		if (currentX < width - margin - (width * scale)) {
			currentX += width * scale;
		} else {
			nextLine();
		}
	}

	const nextLine = function() {
		currentX = margin;
		currentY += height * scale;
	}

	const drawLetter = function(c) {
		let xs = coordinates[c].xs;
		let ys = coordinates[c].ys;
		for (let i = 0; i < xs.length; i++) {
			ellipse(currentX + xs[i] * scale, 
				currentY + ys[i] * scale, 
				diameter * scale, 
				diameter * scale);
		}

		nextSpace();
	};

	const drawNewLine = function() {
		nextLine();
	}


	const drawSpace = function() {
		nextSpace();
	}

	const lettersFinished = function() {
		return currentLetter > 'Z';
	}

	return {	
		init: init,
		pushPoint: pushPoint,
		drawLetters: drawLetters,
		getCurrentLetter: getCurrentLetter,
		updateLetter: updateLetter,
		lettersFinished: lettersFinished,
		drawLetter: drawLetter,
		drawNewLine: drawNewLine,
		drawSpace: drawSpace,
		letterFromCode: letterFromCode,
	};

})();

Letters.init();



function setup() {
	createCanvas(500, 500);
	background(backgroundColor);
	fill(0, 0, 0);
}

function draw() {

	if (Letters.lettersFinished()) {
		
	} else {
		text(Letters.getCurrentLetter(), 50, 50);
		if (mouseIsPressed) {
			Letters.pushPoint(mouseX, mouseY);
			Letters.drawLetters();
		} 
	}
	
}

function keyPressed() {

	if (Letters.lettersFinished()) {
		if (keyCode >= KEY_A && keyCode <= KEY_Z) {
	 		Letters.drawLetter(Letters.letterFromCode(keyCode));
		} else if (keyCode === ENTER) {
			Letters.drawNewLine();
		} else if (keyCode === SPACE) {
			Letters.drawSpace();
		}	
	} else {
		if (keyCode === ENTER) {
			background(backgroundColor);
			Letters.updateLetter();
 		} 
	}
	
}