class miniChicken extends MoveableObject {
  y = 390;
  height = 50;
  speed = 0.2;
  isDead = false;
  velocityY = 4;
  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  IMAGES_DEAD = [
    "./img/3_enemies_chicken/chicken_small/2_dead/dead.png"
  ]

  constructor(imageUrl) {
    super().loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 350 + Math.random() * 2000;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animateChicken();
    this.imageUrl = imageUrl;
  }

  adjustHitbox() {
    this.hitbox = {
      x: this.x + 0,
      y: this.y + 10,
      width: this.width + 0,
      height: this.height - 20,
    };
  }

  animateChicken() {
    setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
        this.adjustHitbox()
      }
      this.updatePosition();
      this.adjustHitbox()
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
    this.adjustHitbox();
  }

  updateImage(newImageUrl) {
    if (!this.isDead) {
      this.img = this.imageCache[newImageUrl];
    }
  }

  removeChicken() {
    if (!this.isDead) {
      this.isDead = true;
      this.updateImage(this.IMAGES_DEAD[0]);
    }
  }

  updatePosition() {
    if (this.isDead) {
      this.y += this.velocityY; // Bewegung der "toten" Hühner nach unten
    }
  }
}
