let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false;
let fullScreen = false;
let backgroundMusic = new Audio("./music/background-music.mp3");
backgroundMusic.muted = true;
backgroundMusic.volume = 0.1;

document.addEventListener("DOMContentLoaded", startBackgroundMusic);

function startBackgroundMusic() {
  backgroundMusic.muted = false;
  backgroundMusic.play();
}

/**
 * starting screen, inits backgroundimg and a button to start the game
 */
function startScreen() {
  let localCanvas = document.getElementById("playground");
  let ctx = localCanvas.getContext("2d");
  let img = new Image();
  img.src = "./img/9_intro_outro_screens/start/startscreen_1.png";

  img.onload = function () {
    let maxWidth = 720;
    let maxHeight = 480;

    let width = Math.min(maxWidth, img.width);
    let height = Math.min(maxHeight, img.height);

    ctx.drawImage(img, 0, 0, width, height);
  };
}

function refBack() {
  window.location.href = "index.html";
}

function init() {
  initLevel();
  canvas = document.getElementById("playground");
  world = new World(canvas, keyboard);
  deleteButton();
  deleteStory();
  touchPanels();
  turnScreen();
}

function deleteStory() {
  let storyContent = document.getElementById("story-container");
  storyContent.style.display = "none";
}

function deleteButton() {
  let menuButtons = document.getElementById("menu");
  menuButtons.style.display = "none";
}

function openSettings() {
  let contents = document.getElementById("story-container");
  contents.style.display = "flex";
  getNewBackground();
  deleteButton();
  openSetting();
}

function getNewBackground() {
  let canvas = document.getElementById("playground");
  let ctx = canvas.getContext("2d");
  let img = new Image();
  img.src = "./img/polloBG.jpg";

  img.onload = function () {
    let maxWidth = 720;
    let maxHeight = 480;

    let width = Math.min(maxWidth, img.width);
    let height = Math.min(maxHeight, img.height);

    ctx.drawImage(img, 0, 0, width, height);
  };
}

function pepeStory() {
  let content = document.getElementById("story-container");
  content.style.display = "flex";
  getNewBackground();
  deleteButton();
  openPepeStory();
}

function openPepeStory() {
  story();
}

function openLevelSelect() {
  let content = document.getElementById("story-container");
  content.style.display = "flex";
  getNewBackground();
  deleteButton();
  openLevel();
}

function gameOverScreen() {
  let end = document.getElementById("game-over-screen");
  end.style.display = "flex";
}

function fullscreen() {
  let content = document.getElementById("content");
  let canvas = document.getElementById("playground");
  let helper = document.getElementById("changeScreen");
  let fullscreenDiv = document.getElementById("fullScreen");
  fullscreenDiv.innerHTML = "";

  if (!fullScreen) {
    fullscreenDiv.innerHTML += "Fullscreen";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    helper.style.display = "none";
    applyFullscreen(content);
    fullScreen = true;
  } else {
    fullscreenDiv.innerHTML += "No Fullscreen";
    canvas.style.width = "720px";
    canvas.style.height = "480px";
    endFullScreen();
    fullScreen = false;
  }
}

function applyFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

function endFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

function musicToggle() {
  let soundButton = document.getElementById("soundButton");
  soundButton.innerHTML = "";
  if (isMuted) {
    isMuted = false;
    soundButton.innerHTML += `Sound On`;
    backgroundMusic.muted = false;
  } else {
    soundButton.innerHTML += `Sound Off`;
    isMuted = true;
    backgroundMusic.muted = true;
    document.querySelectorAll("audio").forEach(function (audioElement) {
      audioElement.muted = isMuted;
    });
  }
}

function turnScreen() {
  window.addEventListener("orientationchange", function () {
    if (window.matchMedia("(orientation: portrait)").matches) {
      document.getElementById("changeScreen").style.display = "flex";
    } else {
      document.getElementById("changeScreen").style.display = "none";
    }
  });
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});

function touchPanels() {
  let leftMove = document.getElementById("leftMove");
  let rightMove = document.getElementById("rightMove");
  let jumpMove = document.getElementById("jumpMove");
  let throwMove = document.getElementById("throwMove");

  leftMove.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });

  leftMove.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  rightMove.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });

  rightMove.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  jumpMove.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });

  jumpMove.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });

  throwMove.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.D = true;
  });

  throwMove.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.D = false;
  });
}
