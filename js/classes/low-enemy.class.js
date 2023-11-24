class LowEnemy extends MoveableObject {
  y = 340;
  height = 90;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGES_CHICKEN_DEAD = [
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
  ];
  currentImage = 0;
  speed = 0.2;
  isDead = false;
  velocityY = 4;

  constructor(imageUrl) {
    super().loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_CHICKEN_DEAD);
    this.x = 200 + Math.random() * 2000;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animateChicken();
    this.imageUrl = imageUrl;
  }

  updateImage(newImageUrl) {
    if (!this.isDead) {
      this.img = this.imageCache[newImageUrl];
    }
  }

  removeChicken() {
    if (!this.isDead) {
      this.isDead = true;
      // this.speed = 0; // Entferne diese Zeile, um die Geschwindigkeit beizubehalten
      this.updateImage(this.IMAGES_CHICKEN_DEAD[0]);
    }
  }

  animateChicken() {
    setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
      }
      this.updatePosition();
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }

  updatePosition() {
    if (this.isDead) {
      this.y += this.velocityY; // Bewegung der "toten" Hühner nach unten
    }
  }

  resolveImageIndex() {
    if (this.percentage === 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    }
    return 0;
  }
}
