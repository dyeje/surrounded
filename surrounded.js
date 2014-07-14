var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  sideLength = 600,
  speed = 2,
  friction = 0.97,
  keys = [],
  currentEnemySet = 1,
  enemies = [];

canvas.width = canvas.height = sideLength;

var cardinalDirections = {
  north: 1,
  south: 2,
  east: 3,
  west: 4
}

var player = {
  velocityX: 0,
  velocityY: 0,
  x: (sideLength / 2),
  y: (sideLength / 2)
}

function rect(x, y, w, h) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.closePath();
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.stroke();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomCardinalDirection() {
  return getRandomInt(1, 4);
}

function randomSpeed(direction) {
  var speed = getRandomInt(2, 6);
  speed = speed / 2;
  if (direction === cardinalDirections.south || direction === cardinalDirections.west) {
    return speed * -1;
  } else {
    return speed;
  }
}

function randomSize() {
  return getRandomInt(2, 50);
}

function randomStartingCoordinates(cardinalDirection, enemySize) {
  if (cardinalDirection === cardinalDirections.north) {
    return {x: getRandomInt(0, sideLength), y: (0 - enemySize)};
  } else if (cardinalDirection === cardinalDirections.south) {
    return {x: getRandomInt(0, sideLength), y: sideLength};
  } else if (cardinalDirection === cardinalDirections.east) {
    return {x: (0 - enemySize), y: getRandomInt(0, sideLength)};
  } else if (cardinalDirection === cardinalDirections.west) {
    return {x: sideLength, y: getRandomInt(0, sideLength)};
  }
} 

function initializeEnemy(id) {
  var enemy = {
    id: id,
    direction: randomCardinalDirection(),
    size: randomSize()
  }

  var startingCoordinates = randomStartingCoordinates(enemy.direction, enemy.size);

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

  if ((enemy.x + enemy.size) < 0 || enemy.x > sideLength || (enemy.y + enemy.size) < 0 || enemy.y > sideLength) {
    enemies[enemy.id] = initializeEnemy(enemy.id);
  }
}

function enemyDraw(enemy) {
  rect(enemy.x, enemy.y, enemy.size, enemy.size);
}

for (var i = 0; i < 15; i++) {
  enemies.push(initializeEnemy(i));
} 

function update() {

  if (keys[38]) {
    if (player.velocityY > -speed) {
      player.velocityY--;
    }
  }
  
  if (keys[40]) {
    if (player.velocityY < speed) {
      player.velocityY++;
    }
  }
  if (keys[39]) {
    if (player.velocityX < speed) {
      player.velocityX++;
    }
  }
  if (keys[37]) {
    if (player.velocityX > -speed) {
      player.velocityX--;
    }
  }

  player.velocityY *= friction;
  player.y += player.velocityY;
  player.velocityX *= friction;
  player.x += player.velocityX;

  if (player.x >= (sideLength - 5)) {
    player.x = (sideLength - 5);
  } else if (player.x <= 5) {
    player.x = 5;
  }

  if (player.y > (sideLength - 5)) {
    player.y = (sideLength - 5);
  } else if (player.y <= 5) {
    player.y = 5;
  }

  ctx.clearRect(0, 0, 600, 600);
  ctx.beginPath();
  ctx.arc(player.x, player.y, 5, 0, Math.PI * 2);
  ctx.fill();

  for (i = 0; i < enemies.length; ++i) {
    enemyMove(enemies[i]);
    enemyDraw(enemies[i]);
  }

  setTimeout(update, 10);
}

update();

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});