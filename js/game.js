let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false;
let fullScreen = false;
let backgroundMusic = new Audio("./music/background-music.mp3");
backgroundMusic.muted = true;
backgroundMusic.volume = 0.1;
document.addEventListener("DOMContentLoaded", startBackgroundMusic);

/**
 * start for Background Music after webpage is fully loaded
 */
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

/**
 * return to landing page
 */
function refBack() {
  window.location.href = "index.html";
}

/**
 * start game and delete all other HTML witch are not neccessary
 */
function init() {
  initLevel();
  canvas = document.getElementById("playground");
  world = new World(canvas, keyboard);
  deleteButton();
  deleteStory();
  touchPanels();
  turnScreen();
}

/**
 * delete HTML
 */
function deleteStory() {
  let storyContent = document.getElementById("story-container");
  storyContent.style.display = "none";
}

/**
 * delete HTML
 */
function deleteButton() {
  let menuButtons = document.getElementById("menu");
  menuButtons.style.display = "none";
}

/**
 * open HTML template for Settings
 */
function openSettings() {
  let contents = document.getElementById("story-container");
  contents.style.display = "flex";
  getNewBackground();
  deleteButton();
  openSetting();
}

/**
 * put on start Background to canvas
 */
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

/**
 * open html pepe Story
 */
function pepeStory() {
  let content = document.getElementById("story-container");
  content.style.display = "flex";
  getNewBackground();
  deleteButton();
  openPepeStory();
}

/**
 * open HTML
 */
function openPepeStory() {
  story();
}

/**
 * open how to play
 */
function openLevelSelect() {
  let content = document.getElementById("story-container");
  content.style.display = "flex";
  getNewBackground();
  deleteButton();
  openLevel();
}

/**
 * open game over html
 */
function gameOverScreen() {
  let end = document.getElementById("game-over-screen");
  end.style.display = "flex";
}

/**
 * add fullscreen
 */
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

/**
 * help function to open fullscreen
 * @param {} element
 */
function applyFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

/**
 * close Fullscreen
 */
function endFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * function to mute music or unmute Music
 */
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

/**
 *  Function to show that you have to change screen orientation
 */
function turnScreen() {
  window.addEventListener("orientationchange", function () {
    if (window.matchMedia("(orientation: portrait)").matches) {
      document.getElementById("changeScreen").style.display = "flex";
    } else if (window.matchMedia("(orientation: landscape)").matches) {
      document.getElementById("changeScreen").style.display = "none";
    }
  });
}

/**
 * events for Keydowns
 */
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
