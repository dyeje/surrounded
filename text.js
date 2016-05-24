function fadeInAlpha() {
  return (1.0 - (alphaTimer * 0.01))
}

function startGameText() {
  drawText("press space to start!", 500, 38);
}

function scoreDraw() {
  ctx.globalAlpha = 1.0;
  ctx.fillStyle = "#f2f2f2";
  ctx.font = "22pt unlearne";
  ctx.textAlign = "right";
  ctx.fillText(score, 590, 28);
  ctx.globalAlpha = 1.0;
}

function drawText(text, y, size, alpha) {
  alpha = alpha !== undefined ? alpha : 1.0;

  ctx.globalAlpha = alpha;
  ctx.fillStyle = "#f2f2f2";
  ctx.font = size + "pt unlearne";
  ctx.textAlign = "center";
  ctx.fillText(text, SIDE_LENGTH/2, y);
  ctx.globalAlpha = 1.0;
}

function fadeInGameOverText() {
  if (deathTimer <= 50) {
    var gameOverText = victory ? "victory!" : "surrounded!";
    drawText(gameOverText, 275, 30, fadeInAlpha());
    drawText("press space to try again.", 305, 30, fadeInAlpha());
    alphaTimer -= 2;
  }
}

function drawInstructions() {
  drawText("this is you.", 50, 28);
  initializePlayer();
  player.x = SIDE_LENGTH/2;
  player.y = 90;
  playerDraw();

  drawText("this is an enemy.", 175, 28);
  var instructionsEnemy = {x: (SIDE_LENGTH/2) - 10, y: 212, size: 20, color: enemyColors[2]}
  enemyDraw(instructionsEnemy);

  drawText("eat enemies smaller than you.", 300, 28);
  player.size = 30;
  player.x = (SIDE_LENGTH/2) - 20;
  player.y = 350;
  playerDraw();
  instructionsEnemy.size = 10
  instructionsEnemy.x = (SIDE_LENGTH/2) + 20
  instructionsEnemy.y = 344
  enemyDraw(instructionsEnemy);

  startGameText();
  instructionsInterval = setInterval(function () {
    ctx.clearRect(0, 400, SIDE_LENGTH, SIDE_LENGTH);
    setTimeout(startGameText, 200)
  }, 2200)
}