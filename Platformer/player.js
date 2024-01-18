import { ctx, rightKey, upKey, downKey, leftKey, bordersArray, tempBorder, verticleBorder, intersectionType } from './index.js'
import checkIntersection from "./index.js"
import checkWhichIntersection from "./index.js"


function Player(x, y, width, height) {
	//Player variable
	this.x = x;
	this.y = y;
	this.xspeed = 0;
	this.yspeed = 0;
	this.friction = 0.2;
	this.maxSpeed = 25;
	this.width = width;
	this.height = height;
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
				this.yspeed -=35;
			}

			//Apply Gravity
			this.yspeed += 6;

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

			//Check for intersections
			for (let i = 0; i < bordersArray.length; i++) {
				borderRect = {
					x: bordersArray[i].x,
					y: bordersArray[i].y,
					width: bordersArray[i].width,
					height: bordersArray[i].height
				}

/*				if (checkIntersection(this, verticleBorder)) {
				
					if (rightKey) {
						this.xspeed = 0;
					} 
					if (upKey == false) {
						this.yspeed = 0;
					}
				} // end if statement
*/
				if (checkWhichIntersection(this, verticleBorder)) {
					alert("Inside player.js, intersectionType = " + intersectionType);
				}

			} // end of for loop

			this.x += this.xspeed;
			this.y += this.yspeed;

			//Stops player if on the ground
			if (this.y >= 500) {
				this.y = 500;
			} else if (this.y <= 0) {
				this.y = 0	
			}

			if (this.x >= 1050) {
				this.x = 1050
			} else if (this.x <= 0) {
				this.x = 0
			}
		} // end ifActive

/*		if (checkIntersection(horizontalRect, borderRect)) {
			while (checkIntersection(horizontalRect, borderRect)) {
				horizontalRect.x -= Math.sign(this.xspeed);
		} 

		// The issue is that borderRect is undefined. But, this (player) is defined!

		if (checkIntersection(this, borderRect)) {
			while (checkIntersection(this, borderRect)) {
				horizontalRect.x -= Math.sign(this.xspeed);
			} // end while loop

			this.xspeed = 0;

		} // end if statement
*/
	}

	this.draw = function() {
		ctx.fillStyle = "green";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	
}

// Gets rid of no defult export error. Lets index use Player
export default Player

