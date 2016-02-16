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
  ctx.fillStyle = PLAYER_COLOR;
  ctx.fill();
}

function playerMove() {
  if (!gameOver) {
    if (keys[UP_ARROW] || keys[W_KEY]) {
      if (player.velocityY > -player.speed) {
        player.velocityY -= VELOCITY_INTERVAL;
      }
    }

    if (keys[DOWN_ARROW] || keys[S_KEY]) {
      if (player.velocityY < player.speed) {
        player.velocityY += VELOCITY_INTERVAL;
      }
    }

    if (keys[LEFT_ARROW] || keys[A_KEY]) {
      if (player.velocityX > -player.speed) {
        player.velocityX -= VELOCITY_INTERVAL;
      }
    }

    if (keys[RIGHT_ARROW] || keys[D_KEY]) {
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