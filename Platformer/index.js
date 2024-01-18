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
var bordersArray = [];
var obsticle
var tempBorder;
var verticleBorder;
var intersectionType;

// Runs once the page has loaded
window.onload = function() {
	// Assign canvas and context variables
	canvas = document.getElementById("game-canvas");
	ctx = canvas.getContext("2d");

	//Setup key listeners
	setupInputs();

	//Create Player
	player = new Player(100, 0, 50, 50);
	player.step();

	//Create Borders
	for (let i = 0; i <= 0; i++) {
		bordersArray.push(new Border(0 + 100 * i, 550, 600, 50, 1));
	}
	for (let i = 0; i < 1; i++) {
		//borders.push(new Border(300, 400 + 100 * i, 5, 200, 1));
		tempBorder = new Border(300, 500 + 100 * i, 5, 300, 1);
		bordersArray.push(tempBorder);

		verticleBorder = new Border(450, 500 + 100 * i, 100, 5, 1);
		bordersArray.push(verticleBorder);
	}

	//Start game loop
	gameLoop = setInterval(step, 1000 / 30);

	//alert("tempBorder.y = " + tempBorder.y);

	if (tempBorder.x == player.x) {
		alert("x = x");
	}

} // End of onLoad

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
	for (let i = 0; i < bordersArray.length; i++) {
		bordersArray[i].draw();
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

} // end of setInputs[]

// Check intersection is currently not working. Tried two different methods.

/*function checkIntersection(r1, r2) {
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
}
*/


function checkIntersection(r1, r2) {

	/*console.log("r1.x is: " + r1.x);
	console.log("r1.width is: " + r1.width);
	console.log("r1.y is: " + r1.y);
	console.log("r1.height is: " + r1.height);

	console.log("r2.x is: " + r2.x);
	console.log("r2.width is: " + r2.width);
	console.log("r2.y is: " + r2.y);
	console.log("r2.height is: " + r2.height); */


	/*if (r1.x >= r2.x + r2.width) {
		return false;
	} else if (r1.x + r1.width <= r2.x) {
		return false;
	} else if (r1.y >= r2.y + r2.height) {
		return false;
	} else if (r1.y + r1.height <= r2.y) {
		return false;
	} else {
		return true;
	}*/

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


} // end of checkIntersection

// Test function to see if we can return true when there's an intersection,
// and specifically which type of intersection occurred
export function checkWhichIntersection(r1, r2) {

	// 4 types of intersections: right, left, top, bottom
	intersectionType = "";

	if ((r1.x + r1.width) == r2.x) {
		intersectionType = "right";
		alert("intersectionType = " + intersectionType);
		return true;
	}
	else if (r1.x == (r2.x + r2.width)) {
		intersectionType = "left";
		alert("intersectionType = " + intersectionType);
		return true;
	}
	else if ((r1.y + r1.height) == r2.y) {
		intersectionType = "bottom";
		alert("intersectionType = " + intersectionType);
		return true;
	}
	else if (r1.y == (r2.y + r2.height)) {
		intersectionType = "top";
		alert("intersectionType = " + intersectionType);
		return true;
	}
}



export default checkIntersection

export { ctx, rightKey, upKey, downKey, leftKey, bordersArray, tempBorder, verticleBorder, intersectionType };


