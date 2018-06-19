class Tower {
	constructor(x, y, stuck, test) {
		this.gridx = Gridsize / 2 + x * Gridsize;
		this.gridy = Gridsize / 2 + y * Gridsize;
		this.target = [Gridsize / 2 + 5 * Gridsize,Gridsize / 2 + 6 * Gridsize]
		this.stuck = stuck;
		this.test = test
		this.hover = false;
		this.locked = false;
		this.xOffset = 0.0;
		this.yOffset = 0.0;
	}

	update() {
		if (this.locked) {
			this.gridx = mouseX-this.xOffset
			this.gridy = mouseY-this.yOffset
		}
	}

	show() {
		stroke(0);
		strokeWeight(2);
		fill(0, 0, 200)
		rectMode(CORNER);
		angleMode(DEGREES);
		push();
		translate(this.gridx, this.gridy)
		var a = atan2(this.target[1] - this.gridy, this.target[0]  - this.gridx);
		rotate(a)
		rect(0, -10, Gridsize * 0.6, 20);
		pop();
		fill(200, 200, 255)
		ellipse(this.gridx, this.gridy, Gridsize * 0.75)
	}
}
