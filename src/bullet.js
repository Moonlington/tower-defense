class Bullet {
    constructor(x, y, heading) {
        this.speed = 10;
        this.velocity = createVector(this.speed, 0);
        this.velocity.rotate(heading)
        this.location = createVector(x, y);
        this.location.add(this.velocity)
        this.location.add(this.velocity)
    }

    update() {
        this.location.add(this.velocity)
    }

    show() {
        stroke(0);
        strokeWeight(2);
        fill(255, 0, 255)
        ellipse(this.location.x, this.location.y, Gridsize * 0.3)
    }
}