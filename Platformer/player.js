import { ctx, rightKey, upKey, downKey, leftKey, borders } from './index.js'
import checkIntersection from "./index.js"

function Player(x, y) {
	//Player variable
	this.x = x;
	this.y = y;
	this.xspeed = 0;
	this.yspeed = 0;
	this.friction = 0.7;
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

