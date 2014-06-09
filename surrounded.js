var canvas;
var ctx;
var dx = 5;
var dy = 5;
var x = 300;
var y = 300;
var WIDTH = 600;
var HEIGHT = 600;

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  return setInterval(draw, 10);
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

function draw() {
  clear();
  rect(x, y, 10, 10);
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