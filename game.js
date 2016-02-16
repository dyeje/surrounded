var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    gameOver = true,
    keys = [],
    friction,
    enemies,
    player,
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
  W_KEY = 87;
  DOWN_ARROW = 40,
  S_KEY = 83
  LEFT_ARROW = 37,
  A_KEY = 65,
  RIGHT_ARROW = 39,
  D_KEY = 68,
  SPACE_BAR = 32;

canvas.width = canvas.height = SIDE_LENGTH;

function drawText(text, alpha, alignment, x, y, size) {
  ctx.fillStyle = "#f2f2f2";
  ctx.globalAlpha = (1.0 - (alphaTimer * 0.01));
  ctx.font = size + "pt unlearne";
  ctx.textAlign = alignment;
  ctx.fillText(text, x, y);
  ctx.globalAlpha = 1;
}

function fadeInGameOverText() {
  if (deathTimer <= 50) {
    drawText("surrounded!", 100, "center", SIDE_LENGTH/2, 275, 30);
    drawText("press space to try again.", (1.0 - (alphaTimer * 0.01)), "center", SIDE_LENGTH/2, 305, 30);
    alphaTimer -= 2;
  }
}

function drawInstructions() {
  drawText("this is you.", 100, "center", SIDE_LENGTH/2, 50, 28);
  initializePlayer();
  player.x = SIDE_LENGTH/2;
  player.y = 90;
  playerDraw();

  drawText("this is an enemy.", 100, "center", SIDE_LENGTH/2, 175, 28);
  var instructionsEnemy = {x: (SIDE_LENGTH/2) - 10, y: 212, size: 20, color: enemyColors[2]}
  enemyDraw(instructionsEnemy);

  drawText("eat enemies smaller than you.", 100, "center", SIDE_LENGTH/2, 300, 28);
  player.size = 30;
  player.x = (SIDE_LENGTH/2) - 20;
  player.y = 350;
  playerDraw();
  instructionsEnemy.size = 10
  instructionsEnemy.x = (SIDE_LENGTH/2) + 20
  instructionsEnemy.y = 344
  enemyDraw(instructionsEnemy);

  drawText("press space to start!", 100, "center", SIDE_LENGTH/2, 500, 38);
  setInterval(function () {
    ctx.clearRect(0, 400, SIDE_LENGTH, SIDE_LENGTH);
    setTimeout(function () {
      drawText("press space to start!", 100, "center", SIDE_LENGTH/2, 500, 38);
    }, 200)
  }, 2400)
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
  console.log(e.keyCode);
    keys[e.keyCode] = true;

    if (gameOver && keys[SPACE_BAR]) {
      setupGame();
    }
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

setTimeout(drawInstructions, 1); //let's the custom font load