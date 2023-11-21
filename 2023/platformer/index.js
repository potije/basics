canvas = document.getElementById("canvas");
canvas.width = 400;
canvas.height = 400;
const ctx = canvas.getContext("2d");

class Character {

	constructor(x, y) {
		this.pos = {x: x, y: y};
		this.vel = {x: 0, y: 0};
		this.acc = {x: 0.0, y: 0.0};
		this.mxv = {x: 5, y: 5};
	}

	update() {
		this.vel.x = (this.vel.x+this.acc.x);
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
		// stop once 0 is reached
		console.log(this.vel.x, this.acc.x);
		if (this.vel.x.toFixed(2) == 0) this.acc.x = 0;
	}

	keydown(event) {
		// to make it fire only once
		if (event.repeat) return;
		switch(event.key) {
		case "ArrowRight":
			console.log("start")
			this.vel.x = 2;
			this.acc.x = 0.5;
			break;
		}
	}

	keyup(event) {
		switch(event.key) {
		case "ArrowRight":
			console.log("stop");
			this.acc.x = -0.5;
			break;
		}
	}

	draw() {
		ctx.fillRect(this.pos.x, this.pos.y, 20, 20)
	}
}

let c = new Character(100,100);

function cycle() {
	ctx.clearRect(0,0,canvas.width, canvas.height);
	c.update();
	c.draw();
	window.requestAnimationFrame(cycle);
}

function keydown(event) { c.keydown(event); }
function keyup(event) { c.keyup(event); }

window.addEventListener("keydown", this.keydown);
window.addEventListener("keyup", this.keyup);
window.requestAnimationFrame(cycle);