class Tower {
	constructor(x, y) {
		this.gridx = Gridsize / 2 + x * Gridsize;
		this.gridy = Gridsize / 2 + y * Gridsize;
	}

	update() {

	}

	show() {
		stroke(0);
		strokeWeight(2);
		fill(0, 0, 200)
		rectMode(CORNER);
		angleMode(DEGREES);
		push();
		translate(this.gridx, this.gridy)
		var a = atan2(mouseY - this.gridy, mouseX - this.gridx);
		rotate(a)
		rect(0, -10, Gridsize * 0.6, 20);
		pop();
		fill(200, 200, 255)
		ellipse(this.gridx, this.gridy, Gridsize * 0.75)
	}
}
