class Enemy {
  constructor(shape, color) {
    this.speed = 4;
	this.shape = shape
    for (i = 0; i < grid.length; i++) {
      for (j = 0; j < grid[i].length; j++) {
        if (grid[i][j].begin) {
          var outside = this.checkOutside(i, j)
          this.x = outside[0];
          this.y = outside[1];
          this.gridx = Gridsize / 2 + outside[0] * Gridsize;
          this.gridy = Gridsize / 2 + outside[1] * Gridsize;
          break;
        }
      }
    }
    this.walkAmount = Gridsize;
	this.color = color ? color : random(0,255);
  }
  
  isUndefined(x, y) {
	  if (typeof grid[x] == 'undefined' || typeof grid[x][y] == 'undefined') {
		  return true
	  }
	  return false
  }

  checkOutside(x, y) {
    if (this.isUndefined(x-1,y)) {
      this.nextGrid = "RIGHT"
      return [x - 1, y]
    } else if (this.isUndefined(x+1,y)) {
      this.nextGrid = "LEFT"
      return [x + 1, y]
    } else if (this.isUndefined(x,y-1)) {
      this.nextGrid = "DOWN"
      return [x, y - 1]
    } else if (this.isUndefined(x,y+1)) {
      this.nextGrid = "UP"
      return [x, y + 1]
    }
  }

  checkNextGrid() {
    if (!this.isUndefined(this.x-1,this.y)&&grid[this.x - 1][this.y].clicked && grid[this.x - 1][this.y] != this.previousGrid) {
      return "LEFT"
    } else if (!this.isUndefined(this.x+1,this.y)&&grid[this.x + 1][this.y].clicked && grid[this.x + 1][this.y] != this.previousGrid) {
      return "RIGHT"
    } else if (!this.isUndefined(this.x,this.y-1)&&grid[this.x][this.y - 1].clicked && grid[this.x][this.y - 1] != this.previousGrid) {
      return "UP"
    } else if (!this.isUndefined(this.x,this.y+1)&&grid[this.x][this.y + 1].clicked && grid[this.x][this.y + 1] != this.previousGrid) {
      return "DOWN"
    }
  }

  update() {
    switch (this.nextGrid) {
      case "UP":
        this.gridy -= this.speed
        this.walkAmount -= this.speed;
        if (this.walkAmount == 0) {
          this.previousGrid = grid[this.x][this.y]
          this.y--
		  if (this.isUndefined(this.x, this.y)){
			  var index = enemies.indexOf(this);
			  if (index > -1) {
				enemies.splice(index, 1);
			  }
			  break;
		  }
          this.currentGrid = grid[this.x][this.y]
          if (!this.currentGrid.end) {
            this.nextGrid = this.checkNextGrid()
          }
          this.walkAmount = Gridsize
        }
        break;
      case "DOWN":
        this.gridy += this.speed
        this.walkAmount -= this.speed;
        if (this.walkAmount == 0) {
          this.previousGrid = grid[this.x][this.y]
          this.y++
		  if (this.isUndefined(this.x, this.y)){
			  var index = enemies.indexOf(this);
			  if (index > -1) {
				enemies.splice(index, 1);
			  }
			  break;
		  }
          this.currentGrid = grid[this.x][this.y]
          if (!this.currentGrid.end) {
            this.nextGrid = this.checkNextGrid()
          }
          this.walkAmount = Gridsize
        }
        break;
      case "LEFT":
        this.gridx -= this.speed
        this.walkAmount -= this.speed;
        if (this.walkAmount == 0) {
          this.previousGrid = grid[this.x][this.y]
          this.x--
		  if (this.isUndefined(this.x, this.y)){
			  var index = enemies.indexOf(this);
			  if (index > -1) {
				enemies.splice(index, 1);
			  }
			  break;
		  }
          this.currentGrid = grid[this.x][this.y]
          if (!this.currentGrid.end) {
            this.nextGrid = this.checkNextGrid()
          }
          this.walkAmount = Gridsize
        }
        break;
      case "RIGHT":
        this.gridx += this.speed
        this.walkAmount -= this.speed;
        if (this.walkAmount == 0) {
		  if (!this.isUndefined(this.x, this.y)) this.previousGrid = grid[this.x][this.y];
          this.x++
		  if (this.isUndefined(this.x, this.y)){
			  var index = enemies.indexOf(this);
			  if (index > -1) {
				enemies.splice(index, 1);
			  }
			  break;
		  }
          this.currentGrid = grid[this.x][this.y]
          if (!this.currentGrid.end) {
            this.nextGrid = this.checkNextGrid()
          }
          this.walkAmount = Gridsize
        }
        break;

    }
  }

  show() {
    fill(this.color, 200, 255)
    strokeWeight(3);
	if (this.shape == "SQUARE") {
		rectMode(CENTER);
		rect(this.gridx, this.gridy, Gridsize*0.75, Gridsize*0.75);
	} else if (this.shape == "CIRCLE") {
		ellipse(this.gridx, this.gridy, Gridsize * 0.75)
	}
  }
}
