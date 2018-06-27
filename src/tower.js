class Tower {
	constructor(x, y, test) {
		this.gridx = Gridsize / 2 + x * Gridsize;
		this.gridy = Gridsize / 2 + y * Gridsize;
		this.target = [Gridsize / 2 + 5 * Gridsize, Gridsize / 2 + 6 * Gridsize]
		this.test = test
		this.hover = false;
		this.locked = false;
		this.xOffset = 0.0;
		this.yOffset = 0.0;
		this.range = (Gridsize / 2) * 4
	}

	update() {
		if (this.locked) {
			this.gridx = mouseX - this.xOffset
			this.gridy = mouseY - this.yOffset
		}
		for (var i = 0; i < enemies.length; i++) {
			if (dist(this.gridx, this.gridy, enemies[i].gridx, enemies[i].gridy) < this.range) {
				this.target = [enemies[i].gridx, enemies[i].gridy];
				bullets.push(new Bullet(this.gridx, this.gridy, atan2(this.target[1] - this.gridy, this.target[0] - this.gridx)));
				break;
			}
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
		var a = atan2(this.target[1] - this.gridy, this.target[0] - this.gridx);
		rotate(a)
		rect(0, -10, Gridsize * 0.6, 20);
		pop();
		fill(200, 200, 255)
		ellipse(this.gridx, this.gridy, Gridsize * 0.75)
	}
}