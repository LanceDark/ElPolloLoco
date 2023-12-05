let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false;
let fullScreen = false;

/**
 * starting screen, inits backgroundimg and a button to start the game
 */
function startScreen() {
  let canvas = document.getElementById("playground");
  let ctx = canvas.getContext("2d");
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

async function init() {
  canvas = document.getElementById("playground");
  world = new World(canvas, keyboard);
  deleteButton();
  deleteStory();
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
  getNewBackground();
  deleteButton();
  openPepeStory();
}

function openPepeStory() {
  story();
}

function gameOverScreen() {
  let end = document.getElementById("game-over-screen");
  end.style.display = "flex";
}

function fullscreen() {
  let content = document.getElementById("content-main");
  let canvas = document.getElementById("playground");

  if (!fullScreen) {
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    applyFullscreen(content);
    fullScreen = true;
  } else {
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
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

function musicToggle() {
  if (isMuted) {
    isMuted = false;
    console.log(isMuted);
  } else {
    isMuted = true;
    console.log(isMuted);
    document.querySelectorAll("audio").forEach(function (audioElement) {
      audioElement.muted = isMuted;
    });
  }
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
