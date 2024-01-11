import { ctx, rightKey, upKey, downKey, leftKey, borders } from './index.js'
import checkIntersection from "./index.js"

function Player(x, y) {
	//Player variable
	this.x = x;
	this.y = y;
	this.xspeed = 0;
	this.yspeed = 0;
	this.friction = 0.7;import Player from "./player.js"
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
var obsticle
var tempBorder;

// Runs once the page has loaded
window.onload = function() {
	// Assign canvas and context variables
	canvas = document.getElementById("game-canvas");
	ctx = canvas.getContext("2d");

	//Setup key listeners
	setupInputs();

	//Create Player
	player = new Player(100, 0, 50, 100);
	player.step();

	//Create Borders
	for (let i = 0; i <= 6; i++) {
		borders.push(new Border(0 + 100 * i, 550, 600, 50, 1));
	}
	for (let i = 0; i < 3; i++) {
		//obsticle = borders.push(new Border(300, 400 + 100 * i, 5, 200, 1));
		//borders.push(new Border(300, 400 + 100 * i, 5, 200, 1));
		tempBorder = new Border(300, 400 + 100 * i, 5, 200, 1);
		borders.push(tempBorder);
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

} // end of setInputs[]

// Check intersection is currently not woeking. Tried two different methods.

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

//alert("In checkIntersection");
//alert("r1.x = " + r1.x);



	if (r1.x + r1.width >= r2.x && r1.x <= r2.x + r2.width) {
		return true;
	}
	if (r1 + r1.height >= r2.y && r1.y <= r2.y + r2.height) {
		return true;
	}

}



export default checkIntersection

export { ctx, rightKey, upKey, downKey, leftKey, borders };



	this.maxSpeed = 10;
	this.width = 100;
	this.height = 100;
	this.active = true;

	var horizontalRect
	var borderRect

	this.step = function() {
		//Movement
		if (this.active) {
			//Horizontal Movement
				if (!leftKey && !rightKey || leftKey && rightKey) {
					//Slow down
					this.xspeed *= this.friction;
				} else if (rightKey) {
					//Move right
					this.xspeed++;
				} else if (leftKey) {
					this.xspeed--;
				}
			//Vertical Movement
			if (upKey) {
				//Check if on the ground
				this.yspeed -= 15;
			}

			//Apply Gravity
			this.yspeed += 5;

			//Correct Speed
			if (this.xspeed > this.maxSpeed) {
				this.xspeed = this.maxSpeed
			} else if (this.xspeed < -this.maxSpeed) {
				this.xspeed = -this.maxSpeed
			}
			if (this.yspeed > this.maxSpeed) {
				this.yspeed = this.maxSpeed
			} else if (this.yspeed < -this.maxSpeed) {
				this.yspeed = -this.maxSpeed
			}
			

			if (this.xspeed > 0) {
				this.xspeed = Math.floor(this.xspeed)
			} else {
				this.xspeed = Math.ceil(this.xspeed)
			}
			if (this.yspeed > 0) {
				this.yspeed = Math.floor(this.yspeed)
			} else {
				this.yspeed = Math.ceil(this.yspeed)
			}

			//Horizontal Collision Rect
			horizontalRect = {
				x: this.x + this.xspeed,
				y: this.y,
				width: this.width,
				height: this.height
			}

			//Vertical Collision Rect
			var verticalRect = {
				x: this.x,
				y: this.y + this.yspeed,
				width: this.width,
				height: this.height
			}

			// We're not sure if we should have added this borders.length > 0 check
			if (borders.length > 0) {
				//Check for intersections
				for (let i = 0; i < borders.length; i++) {
					borderRect = {
						x: borders[i].x,
						y: borders[i].y,
						width: borders[i].width,
						height: borders[i].height
					}
				}
			
			// ******* BEGIN TESTING *********
			if (checkIntersection(horizontalRect, borderRect)) 
			//{
				//alert("checkIntersection returned true.")

				while (checkIntersection(horizontalRect, borderRect)) 
				{
					horizontalRect.x -= Math.sign(this.xspeed);
				}
			
				//this.xspeed = 0;
			// ******* END TESTING *********


			//}

			// alert("borders is: " + borders.length);

			this.x += this.xspeed;
			this.y += this.yspeed;

			
		}
	
		}

		// We hope is inisde step()
		//alert("x is: " + this.x);
		//alert("horizontalRect is: " + horizontalRect.x);


	}

	this.draw = function() {
		ctx.fillStyle = "green";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	
	/*if (checkIntersection(horizontalRect, borderRect)) {
		while (checkIntersection(horizontalRect, borderRect)) {
			horizontalRect.x -= Math.sign(this.xspeed);
		}
		
		//this.xspeed = 0;
	} */
	

	
}

// Gets rid of no defult export error. Lets index use Player
export default Player

