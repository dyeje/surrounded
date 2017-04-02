function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomCardinalDirection() {
  return getRandomInt(1, 4);
}

function randomSpeed(direction) {
  var speed = getRandomInt(2, 5);
  speed = speed / 2;
  if (direction === DIRECTIONS.down || direction === DIRECTIONS.left) {
    return speed * -1;
  } else {
    return speed;
  }
}

function randomSize() {
  return getRandomInt(2, MAX_ENEMY_SIZE);
}

function randomStartingCoordinates(cardinalDirection, enemySize) {
  if (cardinalDirection === DIRECTIONS.up) {
    return {x: getRandomInt(0, SIDE_LENGTH), y: (0 - enemySize)};
  } else if (cardinalDirection === DIRECTIONS.down) {
    return {x: getRandomInt(0, SIDE_LENGTH), y: SIDE_LENGTH};
  } else if (cardinalDirection === DIRECTIONS.right) {
    return {x: (0 - enemySize), y: getRandomInt(0, SIDE_LENGTH)};
  } else if (cardinalDirection === DIRECTIONS.left) {
    return {x: SIDE_LENGTH, y: getRandomInt(0, SIDE_LENGTH)};
  }
}
