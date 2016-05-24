var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    gameOver = true,
    victory = false,
    keys = [],
    score = 0,
    friction,
    enemies,
    player,
    updateInterval,
    instructionsInterval,
    alphaTimer,
    deathTimer,
    gameTimeout;


var //constants 
  PLAYER_COLOR = "#F2CE44",
  MAX_ENEMY_SIZE = 80,
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

function setupGame() {
  clearTimeout(gameTimeout);
  clearInterval(instructionsInterval);

  victory = false;
  gameOver = false;

  enemies = [];
  pushEnemies(18);

  updateInterval = INITIAL_UPDATE_INTERVAL;
  alphaTimer = INITIAL_ALPHA_TIMER;
  deathTimer = INITIAL_DEATH_TIMER;
  friction = INITIAL_FRICTION;
  score = 0;

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
    if (friction < 0.96) {
      friction += FRICTION_INTERVAL;
    }

    if (!victory) {
      pushEnemies(20);
    } else {
      playerDraw();
      player.size += 2;
    }

    deathTimer -= 1;
    updateInterval += 5.0/deathTimer;
    fadeInGameOverText();
  }

  scoreDraw();

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

window.onload = function() {
  setTimeout(drawInstructions, 100);
};
