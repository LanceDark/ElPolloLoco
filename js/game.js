let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false;

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

function refBack(){
  window.location.href = "index.html"
}

async function init() {
  canvas = document.getElementById("playground");
  world = new World(canvas, keyboard);
  deleteButton();
  deleteStory();
}

function deleteStory(){
  let storyContent = document.getElementById("story-container") 
  storyContent.style.display = "none"
}

function  deleteButton(){
  let menuButtons = document.getElementById("menu")
  menuButtons.style.display = "none"
}

function openSettings(){
  getNewBackground();
  deleteButton()
  openSetting();
}

function getNewBackground(){
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

function pepeStory(){
  getNewBackground();
  deleteButton()
  openPepeStory()
}

function openPepeStory(){
  story();
}

function gameOverScreen(){
  let canvas = document.getElementById("playground");
  let ctx = canvas.getContext("2d");
  let img = new Image();
  img.src = "./img/9_intro_outro_screens/game_over/game over!.png";

  img.onload = () => {
    console.log("img geladen")
    console.log(img)
    let maxWidth = 720;
    let maxHeight = 480;

    let width = Math.min(maxWidth, img.width);
    let height = Math.min(maxHeight, img.height);

    ctx.drawImage(img, 0, 0, 720, 480);
  };
}

function musicToggle(){
  if (isMuted) {
    isMuted = false;
    console.log(isMuted)
} else {
    isMuted = true;
    console.log(isMuted)
    document.querySelectorAll('audio').forEach(function (audioElement) {
      audioElement.muted = isMuted;
})}
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

