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
  img.src = "img/9_intro_outro_screens/start/startscreen_1.png";

  img.onload = function () {
    let maxWidth = 720;
    let maxHeight = 480;

    let width = Math.min(maxWidth, img.width);
    let height = Math.min(maxHeight, img.height);

    ctx.drawImage(img, 0, 0, width, height);
    addStartButtonDraw(canvas, ctx);
  };
}

/**
 * startingButton added which is starting init (means the full Game starts on this click)
 * @param {*} canvas
 * @param {*} ctx
 */

function addStartButtonDraw(canvas, ctx) {
  designForButton(ctx);
  canvas.addEventListener("click", function (event) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;

    if (mouseX >= 300 && mouseX <= 450 && mouseY >= 50 && mouseY <= 100) {
      init();
    }
  });
}

/**
 * design for the Button
 * @param {*} ctx
 */

function designForButton(ctx) {
  ctx.fillStyle = "orange";
  ctx.fillRect(300, 50, 150, 50);

  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  ctx.strokeRect(300, 50, 150, 50);

  ctx.fillStyle = "black"; // color
  ctx.font = "20px Arial"; // font
  ctx.fillText("Spiel starten", 318, 83);
}

function init() {
  canvas = document.getElementById("playground");
  world = new World(canvas, keyboard);
  console.log("My Character is", world.character);
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

function gameOverScreen() {
  let canvas = document.getElementById("playground");
  let ctx = canvas.getContext("2d");
  let img = new Image();
  img.src = "img/9_intro_outro_screens/game_over/oh no you lost!.png";

  img.onload = function () {
    let maxWidth = 720;
    let maxHeight = 480;

    let width = Math.min(maxWidth, img.width);
    let height = Math.min(maxHeight, img.height);

    ctx.drawImage(img, 0, 0, width, height);
  };
}
