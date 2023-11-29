let canvas;
let world;
let keyboard = new Keyboard();

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


function init() {
  canvas = document.getElementById("playground");
  world = new World(canvas, keyboard);
  console.log("My Character is", world.character);
  deleteButton();
}

function  deleteButton(){
  let menuButtons = document.getElementById("menu")
  menuButtons.style.display = "none"
}

function openSettings(){
  getNewBackground();
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

