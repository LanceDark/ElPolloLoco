class LowEnemy extends MoveableObject {
  y = 355;
  height = 90;
  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGES_CHICKEN_DEAD = [
    "./img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
  ];
  currentImage = 0;
  speed = 0.2;
  isDead = false;
  velocityY = 4;

  constructor(imageUrl) {
    super().loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_CHICKEN_DEAD);
    this.x = 350 + Math.random() * 2000;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animateChicken();
    this.imageUrl = imageUrl;
    this.hitbox = this.adjustHitbox();
  }

  /**
   * get a various Hitbox to allow different Situations and make it more correct to hit object
   */
  adjustHitbox() {
    this.hitbox = {
      x: this.x + 0,
      y: this.y + 10,
      width: this.width + 0,
      height: this.height - 20,
    };
  }

  /**
   * Update image so dead chicken get showed up
   * @param {*} newImageUrl 
   */
  updateImage(newImageUrl) {
    if (!this.isDead) {
      this.img = this.imageCache[newImageUrl];
    }
  }

  /**
   * Delete Chicken if Dead
   */
  removeChicken() {
    if (!this.isDead) {
      this.isDead = true;
      this.updateImage(this.IMAGES_CHICKEN_DEAD[0]);
    }
  }

  /**
   * All Animations for the Chicken
   */
  animateChicken() {
    setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
        this.adjustHitbox();
      }
      this.updatePosition();
      this.adjustHitbox();
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
    this.adjustHitbox();
  }

  /**
   * Track Postition of chicken
   */
  updatePosition() {
    if (this.isDead) {
      this.y += this.velocityY; // Bewegung der "toten" Hühner nach unten
    }
  }
}
