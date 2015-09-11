var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    keys = [],
    friction,
    enemies,
    player,
    gameOver,
    updateInterval,
    alphaTimer,
    deathTimer,
    gameTimeout;


var //constants 
  PLAYER_COLOR = "#F2CE44"
  VELOCITY_INTERVAL = 0.36,
  INITIAL_FRICTION = 0.90,
  FRICTION_INTERVAL = 0.03,
  SIDE_LENGTH = 600,
  PLAYER_SPEED = 10,
  DIRECTIONS = {
    up: 1,
    down: 2,
    right: 3,
    left: 4
  },
  //initial values
  INITIAL_UPDATE_INTERVAL = 10,
  INITIAL_PLAYER_SIZE = 8,
  INITIAL_ALPHA_TIMER = 100,
  INITIAL_DEATH_TIMER = 85,
  INITIAL_FRICTION = 0.88,
  //keys
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  LEFT_ARROW = 37,
  RIGHT_ARROW = 39,
  SPACE_BAR = 32;

canvas.width = canvas.height = SIDE_LENGTH;

function drawText(text, alpha, alignment, x, y) {
  ctx.fillStyle = "rgba(240, 240, 240, " + alpha + ")";
  ctx.font = "30pt unlearne";
  ctx.textAlign = alignment;
  ctx.fillText(text, x, y);
}

function fadeInGameOverText() {
  if (deathTimer <= 50) {
    drawText("surrounded!", (1.0 - (alphaTimer * 0.01)), "center", SIDE_LENGTH/2, 275);
    drawText("press space to try again.", (1.0 - (alphaTimer * 0.01)), "center", SIDE_LENGTH/2, 305);
    alphaTimer -= 2;
  }
}

function setupGame() {
  clearTimeout(gameTimeout);
  gameOver = false;

  enemies = [];
  pushEnemies(20);

  updateInterval = INITIAL_UPDATE_INTERVAL;
  alphaTimer = INITIAL_ALPHA_TIMER;
  deathTimer = INITIAL_DEATH_TIMER;
  friction = INITIAL_FRICTION;

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
    gameTimeout = window.setTimeout(update, updateInterval);
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