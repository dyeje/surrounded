var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    keys = [],
    friction,
    enemies,
    player,
    gameOver,
    updateInterval,
    alphaTimer,
    deathTimer;

//constants
var VELOCITY_INTERVAL = 0.36,
    INITIAL_FRICTION = 0.88,
    FRICTION_INTERVAL = 0.04,
    INITIAL_UPDATE_INTERVAL = 10,
    INITIAL_ALPHA_TIMER = 100,
    INITIAL_DEATH_TIMER = 85,
    SIDE_LENGTH = 600,
    PLAYER_SPEED = 10,
    INITIAL_PLAYER_SIZE = 8,
    //keys
    UP_ARROW = 38,
    DOWN_ARROW = 40,
    LEFT_ARROW = 37,
    RIGHT_ARROW = 39,
    SPACE_BAR = 32;

canvas.width = canvas.height = SIDE_LENGTH;

var cardinalDirections = {
  north: 1,
  south: 2,
  east: 3,
  west: 4
}

function pushEnemies(quantity) {
  for (var i = 0; i < quantity; i++) {
    enemies.push(initializeEnemy(i));
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomCardinalDirection() {
  return getRandomInt(1, 4);
}

function randomSpeed(direction) {
  var speed = getRandomInt(2, 5);
  speed = speed / 2;
  if (direction === cardinalDirections.south || direction === cardinalDirections.west) {
    return speed * -1;
  } else {
    return speed;
  }
}

function randomSize() {
  return getRandomInt(2, 60);
}

function randomStartingCoordinates(cardinalDirection, enemySize) {
  if (cardinalDirection === cardinalDirections.north) {
    return {x: getRandomInt(0, SIDE_LENGTH), y: (0 - enemySize)};
  } else if (cardinalDirection === cardinalDirections.south) {
    return {x: getRandomInt(0, SIDE_LENGTH), y: SIDE_LENGTH};
  } else if (cardinalDirection === cardinalDirections.east) {
    return {x: (0 - enemySize), y: getRandomInt(0, SIDE_LENGTH)};
  } else if (cardinalDirection === cardinalDirections.west) {
    return {x: SIDE_LENGTH, y: getRandomInt(0, SIDE_LENGTH)};
  }
} 

function initializeEnemy(id) {
  var enemy = {
    id: id,
    size: randomSize(),
    direction: randomCardinalDirection()
  }

  var startingCoordinates = randomStartingCoordinates(enemy.direction, enemy.size);
  enemy.x = startingCoordinates.x;
  enemy.y = startingCoordinates.y;

  enemy.speed = randomSpeed(enemy.direction);

  return enemy;
}

function enemyPlayerCollision(enemy) {
  var playerRadius = player.size/2;
  var enemyCenterX = enemy.x + enemy.size/2;
  var enemyCenterY = enemy.y + enemy.size/2;

  var circleDistance = {};
  circleDistance.x = Math.abs(player.x - enemyCenterX);
  circleDistance.y = Math.abs(player.y - enemyCenterY);

  if (circleDistance.x > (enemy.size/2 + playerRadius)) { return false; }
  if (circleDistance.y > (enemy.size/2 + playerRadius)) { return false; }

  if (circleDistance.x <= (enemy.size/2)) { return true; } 
  if (circleDistance.y <= (enemy.size/2)) { return true; }

  cornerDistanceSquared = ((circleDistance.x - enemy.size/2)^2) + ((circleDistance.y - enemy.size/2)^2);

  return (cornerDistanceSquared <= (playerRadius^2));
}

function enemyMove(enemy) {
  if (enemy.direction === cardinalDirections.east || enemy.direction === cardinalDirections.west) {
    enemy.x = enemy.x + enemy.speed;
  } else {
    enemy.y = enemy.y + enemy.speed;
  }

  if (!gameOver && enemyPlayerCollision(enemy)) {
    if (enemy.size < player.size) {
      enemies[enemy.id] = initializeEnemy(enemy.id);
      player.size += 1
    } else {
      gameOver = true;
    }
  }

  if ((enemy.x + enemy.size) < 0 || enemy.x > SIDE_LENGTH || (enemy.y + enemy.size) < 0 || enemy.y > SIDE_LENGTH) {
    enemies[enemy.id] = initializeEnemy(enemy.id);
  }
}

function enemyDraw(enemy) {
  ctx.beginPath();
  ctx.rect(enemy.x, enemy.y, enemy.size, enemy.size);
  ctx.closePath();
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.stroke();
}

function initializePlayer() {
  player = {
    velocityX: 0,
    velocityY: 0,
    x: SIDE_LENGTH/2,
    y: SIDE_LENGTH/2,
    size: INITIAL_PLAYER_SIZE,
    speed: PLAYER_SPEED
  }
}

function playerDraw() {
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.size/2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = 'red';
  ctx.fill();
}

function playerMove() {
  if (!gameOver) {
    if (keys[UP_ARROW]) {
      console.log(38);
      if (player.velocityY > -player.speed) {
        player.velocityY -= VELOCITY_INTERVAL;
      }
    }

    if (keys[DOWN_ARROW]) {
      console.log(40);
      if (player.velocityY < player.speed) {
        player.velocityY += VELOCITY_INTERVAL;
      }
    }

    if (keys[LEFT_ARROW]) {
      console.log(37);
      if (player.velocityX > -player.speed) {
        player.velocityX -= VELOCITY_INTERVAL;
      }
    }

    if (keys[RIGHT_ARROW]) {
      console.log(39);
      if (player.velocityX < player.speed) {
        player.velocityX += VELOCITY_INTERVAL;
      }
    }
  }

  player.velocityY *= friction;
  player.y += player.velocityY;

  player.velocityX *= friction;
  player.x += player.velocityX;

  playerRadius = player.size/2

  if (player.x >= (SIDE_LENGTH - playerRadius)) {
    player.x = (SIDE_LENGTH - playerRadius);
  } else if (player.x <= playerRadius) {
    player.x = playerRadius;
  }

  if (player.y > (SIDE_LENGTH - playerRadius)) {
    player.y = (SIDE_LENGTH - playerRadius);
  } else if (player.y <= playerRadius) {
    player.y = playerRadius;
  }
}

function drawText(text, alpha, alignment, x, y) {
  ctx.fillStyle = "rgba(0, 0, 0, " + alpha + ")";
  ctx.font = "20pt Helvetica";
  ctx.textAlign = alignment; 
  ctx.fillText(text, x, y);
}

function fadeInGameOverText() {
  if (deathTimer <= 50) {
    drawText("You've been surrounded!", (1.0 - (alphaTimer * 0.01)), "center", SIDE_LENGTH/2, 275);
    drawText("Press the space bar to try again.", (1.0 - (alphaTimer * 0.01)), "center", SIDE_LENGTH/2, 305);
    alphaTimer -= 2;
  }
}

function setupGame() {
  enemies = [];
  pushEnemies(20);

  updateInterval = INITIAL_UPDATE_INTERVAL;
  alphaTimer = INITIAL_ALPHA_TIMER;
  deathTimer = INITIAL_DEATH_TIMER;
  friction = INITIAL_FRICTION;

  gameOver = false;

  initializePlayer();

  update();
}

function update() {
  ctx.clearRect(0, 0, SIDE_LENGTH, SIDE_LENGTH);
  playerMove();
  playerDraw();

  for (i = 0; i < enemies.length; i++) {
    enemyMove(enemies[i]);
    enemyDraw(enemies[i]);
  }

  if (gameOver) {
    fadeInGameOverText()

    if (friction < 0.96) {
      friction += FRICTION_INTERVAL;
    }

    deathTimer -= 1;
    pushEnemies(20);
    updateInterval += 5.0/deathTimer;
  }

  if (deathTimer > 0) {
    window.setTimeout(update, updateInterval);
  }
}

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;

    if (gameOver && keys[SPACE_BAR]) {
      setupGame();
    }
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

setupGame();