function toggleMusic() {
  var audioPlayer = document.getElementById("audio");
  if (audioPlayer.paused) {
    audioPlayer.play();
  } else {
    audioPlayer.pause();
  }
}

function musicToggleText() {
  var audioPlayer = document.getElementById("audio");
  return audioPlayer.paused ? "Off" : "On";
}

function mouseInBottomRightCorner(e) {
  var canvasRect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var x = e.clientX - canvasRect.left - root.scrollLeft;
  var y = e.clientY - canvasRect.top - root.scrollTop;
  var bottomRightCorner = {
    x: SIDE_LENGTH - 57,
    y: SIDE_LENGTH - 30
  }

  return x > bottomRightCorner.x && y > bottomRightCorner.y;
}

function musicToggleHandler() {
  canvas.addEventListener('mousemove', function(e) {
    canvas.classList.toggle('clickable', mouseInBottomRightCorner(e));
  }, false);

  canvas.addEventListener('click', function(e) {
    if (mouseInBottomRightCorner(e)) toggleMusic();
  }, false);
}