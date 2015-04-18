enemyColors = {
  1: "#F27331",
  2: "#D94B2B",
  3: "#BF3636"
}

function pushEnemies(quantity) {
  for (var i = 0; i < quantity; i++) {
    enemies.push(initializeEnemy(i));
  }
}

function initializeEnemy(id) {
  var enemy = {
    id: id,
    size: randomSize(),
    direction: randomCardinalDirection(),
    color: enemyColors[getRandomInt(1, 3)]
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
  if (enemy.direction === DIRECTIONS.right || enemy.direction === DIRECTIONS.left) {
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
  ctx.fillStyle = enemy.color;
  ctx.fill();
}