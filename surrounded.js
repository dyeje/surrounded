var canvas;
var ctx;
var dx = 5;
var dy = 5;
var x = 300;
var y = 300;
var WIDTH = 600;
var HEIGHT = 600;
var enemies = [];
var player = {}

player.draw = function () {
  rect(x, y, 10, 10);
}

var cardinalDirections = {
  north: 1,
  south: 2,
  east: 3,
  west: 4
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomCardinalDirection() {
  return getRandomInt(1, 4);
}

function randomSpeed(direction) {
  var speed = getRandomInt(2, 35);
  if (direction === cardinalDirections.south || direction === cardinalDirections.west) {
    return speed * -1;
  } else {
    return speed;
  }
}

function randomSize() {
  return getRandomInt(10, 40);
}

function randomStartingCoordinates(cardinalDirection) {
  if (cardinalDirection === cardinalDirections.north) {
    return {x: getRandomInt(0, WIDTH), y: 0};
  } else if (cardinalDirection === cardinalDirections.south) {
    return {x: getRandomInt(0, WIDTH), y: HEIGHT};
  } else if (cardinalDirection === cardinalDirections.east) {
    return {x: 0, y: getRandomInt(0, HEIGHT)};
  } else if (cardinalDirection === cardinalDirections.west) {
    return {x: WIDTH, y: getRandomInt(0, HEIGHT)};
  }
} 

function initializeEnemy(id) {
  var enemy = {
    id: id,
    direction: randomCardinalDirection(),
    size: randomSize()
  }

  var startingCoordinates = randomStartingCoordinates(enemy.direction);

  enemy.x = startingCoordinates.x;
  enemy.y = startingCoordinates.y;
  enemy.speed = randomSpeed(enemy.direction);

  return enemy;
}

function enemyMove(enemy) {
  if (enemy.direction === cardinalDirections.east || enemy.direction === cardinalDirections.west) {
    enemy.x = enemy.x + enemy.speed;
  } else {
    enemy.y = enemy.y + enemy.speed;
  }

  if (enemy.x < 0 || enemy.x > WIDTH || enemy.y < 0 || enemy.y > HEIGHT) {
    enemies[enemy.id] = initializeEnemy(enemy.id);
  }
}

function enemyDraw(enemy) {
  rect(enemy.x, enemy.y, enemy.size, enemy.size);
} 

for (var i = 0; i < 20; i++) {
  enemies.push(initializeEnemy(i));
} 

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  setInterval(drawEnemies, 75);
}

function rect(x, y, w, h) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.closePath();
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.stroke();
}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function drawEnemies() {
  clear();
  player.draw();
  for (i = 0; i < enemies.length; ++i) {
    enemyMove(enemies[i]);
    enemyDraw(enemies[i]);
  }
}

function keyDown(e) {
  e.preventDefault();
  switch (e.keyCode) {
  case 38:
    /* Up arrow was pressed */
    if (y - dy > 0) {
      y -= dy;
    }
    break;
  case 40:
    /* Down arrow was pressed */
    if (y + dy < HEIGHT) {
      y += dy;
    }
    break;
  case 37:
    /* Left arrow was pressed */
    if (x - dx > 0) {
      x -= dx;
    }
    break;
  case 39:
    /* Right arrow was pressed */
    if (x + dx < WIDTH) {
      x += dx;
    }
    break;
  }
}

init();
window.addEventListener('keydown', keyDown, true);