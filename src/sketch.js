var Gridsize = 60;
let grid = [];
let enemies = [];
let towers = [];
let bullets = [];
var mapcreator = true;
var debug = true;
towers.push(new Tower(0, 11, true))

function setup() {
  colorMode(HSB, 255);
  createCanvas(840, 720);
  for (i = 0; i < width / Gridsize; i++) {
    grid.push([])
    for (j = 0; j < (height / Gridsize) - 1; j++) {
      grid[i].push(new Gridblock(i, j, Gridsize - 5))
    }
  }
  exportmapbutton = createButton('Export Map');
  exportmapbutton.position(width + 10, 10)
  exportmapbutton.mousePressed(exportMap)

  importmapbutton = createButton('Import Map');
  importmapbutton.position(width + 10, 40)
  importmapbutton.mousePressed(importMap)

  mapcode = createInput('1-1,1-2,1-3,1-4,1-5,1-6,1-7,1-8,1-9,B1-10,2-1,3-1,3-2,3-3,3-5,3-6,3-7,3-8,3-9,4-3,4-5,4-9,5-1,5-2,5-3,5-5,5-7,5-8,5-9,6-1,6-5,6-7,7-1,7-5,7-7,7-8,7-9,8-1,8-2,8-3,8-4,8-5,8-9,9-9,10-1,10-2,10-3,10-4,10-5,10-6,10-7,10-8,10-9,11-1,12-1,12-2,12-3,12-4,12-5,12-6,E13-6', "text")
  mapcode.position(width + 10, 70)

  if (mapcode.value != "") {
    importMap();
  }

  creabutton = createButton('Create Map');
  creabutton.position(width + 10, 100)
  creabutton.mousePressed(createMap)

  if (debug) {
    sendSquareButton = createButton('Send Square')
    sendSquareButton.position(width + 10, 40)
    sendSquareButton.mousePressed(() => {
      enemies.push(new Enemy("SQUARE"))
    })
    sendCircleButton = createButton('Send Circle')
    sendCircleButton.position(width + 10, 70)
    sendCircleButton.mousePressed(() => {
      enemies.push(new Enemy("CIRCLE"))
    })
    mapcreatorButton = createButton('MapCreator');
    mapcreatorButton.position(width + 10, 10)
    mapcreatorButton.mousePressed(() => {
      mapcreator = true
      enemies = [];
      exportmapbutton.show()
      importmapbutton.show()
      mapcode.show()
      creabutton.show()
      mapcreatorButton.hide()
      sendSquareButton.hide()
      sendCircleButton.hide()
    })
  }
  sendSquareButton.hide()
  sendCircleButton.hide()
  mapcreatorButton.hide()
}

function exportMap() {
  xport = []
  for (i = 0; i < grid.length; i++) {
    for (j = 0; j < grid[i].length; j++) {
      if (grid[i][j].clicked) {
        if (grid[i][j].begin) {
          xport.push("B" + i + "-" + j)
        } else if (grid[i][j].end) {
          xport.push("E" + i + "-" + j)
        } else {
          xport.push(i + "-" + j)
        }
      }
    }
  }
  mapcode.value(xport)
}

function importMap() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j].clicked = false;
      grid[i][j].begin = false;
      grid[i][j].end = false;
    }
  }
  imported = mapcode.value();
  if (imported != "") {
    imported = imported.split(',');
    for (let i = 0; i < imported.length; i++) {
      crds = imported[i].split('-')
      if (crds[0].startsWith('B')) {
        crds[0] = crds[0].slice(1)
        grid[crds[0]][crds[1]].begin = true
      } else if (crds[0].startsWith('E')) {
        crds[0] = crds[0].slice(1)
        grid[crds[0]][crds[1]].end = true
      }
      grid[crds[0]][crds[1]].clicked = true
    }
  }
}

function createMap() {
  mapcreator = false
  exportmapbutton.hide()
  importmapbutton.hide()
  mapcode.hide()
  creabutton.hide()
  if (debug) {
    mapcreatorButton.show();
    sendSquareButton.show();
    sendCircleButton.show();
  }
}

function mousePressed() {
  if (mapcreator) {
    for (i = 0; i < grid.length; i++) {
      for (j = 0; j < grid[i].length; j++) {
        grid[i][j].isclicked(mouseX, mouseY);
      }
    }
  }
  for (i = 0; i < towers.length; i++) {
    if (towers[i].hover) {
      if (towers[i].test) {
        newt = new Tower(0, 11, false)
        newt.hover = true
        newt.locked = true
        newt.xOffset = mouseX - newt.gridx;
        newt.yOffset = mouseY - newt.gridy;
        towers.push(newt)
      } else {
        towers[i].locked = true;
      }
    } else {
      towers[i].locked = false;
    }
    towers[i].xOffset = mouseX - towers[i].gridx;
    towers[i].yOffset = mouseY - towers[i].gridy;
  }
}

function mouseReleased() {
  for (i = 0; i < towers.length; i++) {
    towers[i].locked = false;
  }
}

function draw() {
  background(0, 0, 180);
  if (mapcreator) {
    for (i = 0; i < grid.length; i++) {
      for (j = 0; j < grid[i].length; j++) {
        grid[i][j].show()
      }
    }
  } else {
    fill(255)
    rectMode(CENTER);
    noStroke();
    for (i = 0; i < grid.length; i++) {
      for (j = 0; j < grid[i].length; j++) {
        if (grid[i][j].clicked) {
          rect(grid[i][j].gridx, grid[i][j].gridy, Gridsize, Gridsize)
        }
      }
    }
    stroke(0);
    for (var i = 0; i < enemies.length; i++) {
      enemies[i].update();
      if (typeof enemies[i] != 'undefined') {
        enemies[i].show()
      }
    }
  }
  noStroke();
  rectMode(CORNER);
  fill(0, 0, 150)
  rect(0, height - Gridsize, width, Gridsize)
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].update();
    bullets[i].show();
  }
  for (i = 0; i < towers.length; i++) {
    if (dist(mouseX, mouseY, towers[i].gridx, towers[i].gridy) < Gridsize * 0.75) {
      towers[i].hover = true;
    } else {
      towers[i].hover = false;
    }
    if (!towers[i].test) {
      towers[i].update()
    }
    towers[i].show()
  }
}

class Gridblock {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.gridx = Gridsize / 2 + x * Gridsize;
    this.gridy = Gridsize / 2 + y * Gridsize;
    this.r = r;
    this.clicked = false;
    this.begin = false;
    this.end = false;
  }

  isclicked(px, py) {
    let d = dist(px, py, this.gridx, this.gridy);
    if (d < this.r / 2) {
      if (this.clicked) {
        this.clicked = false;
        this.begin = false;
        this.end = false;
      } else {
        if (keyIsDown(17)) {
          this.begin = true
        } else if (keyIsDown(16)) {
          this.end = true
        }
        this.clicked = true;
      }
    }
  }

  show() {
    if (mapcreator) {
      rectMode(CENTER);
      stroke(0);
      if (this.clicked) {
        if (this.begin) {
          fill('orangered')
        } else if (this.end) {
          fill('RoyalBlue')
        } else {
          fill('White')
        }
      } else {
        fill('Gray')
      }
      rect(this.gridx, this.gridy, this.r, this.r);
    }
  }
}