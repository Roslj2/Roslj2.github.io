import Player from "./player.js"
import Border from "./border.js"

// Create drawing variables
var canvas;
var ctx;

// Create intput variables
var upKey;
var rightKey;
var downKey;
var leftKey;

// Create game variables
var gameLoop;
var player;
var borders = [];

// Runs once the page has loaded
window.onload = function() {
	// Assign canvas and context variables
	canvas = document.getElementById("game-canvas");
	ctx = canvas.getContext("2d");

	//Setup key listeners
	setupInputs();

	//Create Player
	player = new Player(450, 0, 100, 100);
	player.step();

	//Create Borders
	for (let i = 0; i <= 6; i++) {
		borders.push(new Border(0 + 100 * i, 500, 200, 100, 1));
	}
	borders.push(new Border(0, 400, 100, 100, 2));
	for (let i = 0; i < 3; i++) {
		borders.push(new Border(700, 300 + 100 * i, 100, 200, 2));
	}

	//Start game loop
	gameLoop = setInterval(step, 1000 / 30);
}

function step() {
	//Step player
	player.step();

	//Draw everything
	draw();
}

function draw() {
	//Clear the canvas
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 1100, 600);

	//Draw the player
	player.draw();

	//Draw the borders
	for (let i = 0; i < borders.length; i++) {
		borders[i].draw();
	}

}

function setupInputs() {
	document.addEventListener("keydown", function(event) {
		if (event.key === "w" || event.key === "ArrowUp") {
			upKey = true;
		}
		else if (event.key === "a" || event.key === "ArrowLeft") {
			leftKey = true;
		}
		else if (event.key === "s" || event.key === "ArrowDown") {
			downKey = true;
		}
		else if (event.key === "d" || event.key === "ArrowRight") {
			rightKey = true;
		}

	});

		document.addEventListener("keyup", function(event) {
		if (event.key === "w" || event.key === "ArrowUp") {
			upKey = false;
		}
		else if (event.key === "a" || event.key === "ArrowLeft") {
			leftKey = false;
		}
		else if (event.key === "s" || event.key === "ArrowDown") {
			downKey = false;
		}
		else if (event.key === "d" || event.key === "ArrowRight") {
			rightKey = false;
		}

	
	});
}

function checkIntersection(r1, r2) {

	// BEGIN TESTING
	//alert("r1.y is: " + r1.y + " and r1.height is: " + r1.height + " and r2.y is: " + r2.y);
	// END TESTING

	if (r1.x >= r2.x + r2.width) {
		return false;
	} else if (r1.x + r1.width <= r2.x) {
		return false;
	} else if (r1.y >= r2.y + r2.width) {
		return false;
	} else if (r1.y + r1.width <= r2.y) {
		return false;
	} else {
		return true;
	}

/*
	if (r1.x >= r2.x + r2.width) {
		return false;
	} else if (r1.x + r1.width <= r2.x) {
		return false;
	} else if (r1.y >= r2.y + r2.height) {
		return false;
	} else if (r1.y + r1.height <= r2.y) {
		return false;
	} else {
		return true;
	}
*/
}



export default checkIntersection

export { ctx, rightKey, upKey, downKey, leftKey, borders };


