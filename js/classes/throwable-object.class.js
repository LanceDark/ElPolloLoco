class ThrowableObject extends MoveableObject {
  IMAGES_THROW_BOTTLE = [
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  groundBottle = ["./img/6_salsa_bottle/1_salsa_bottle_on_ground.png"];
  throwBottleInterval;
  bottleIsCollidingBoss = false;
  isPlayingAnimation = false;

  constructor(x, y, acceleration) {
    super();
    this.loadImages(this.IMAGES_THROW_BOTTLE);
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 50;
    this.throwBottleInterval = null;
    this.speedY = 0;
    this.acceleration = acceleration;
  }

  throw() {
    clearInterval(this.throwBottleInterval);
    this.loadImage(
      "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.speedY = 30;
    this.bottleIsCollidingBoss = false;
    if (this.y > 200 && this.y < 350 && !this.bottleIsCollidingBoss) {
      this.animateBottle();
    } else {
      this.playGroundAnimation();
      this.speedY = 0;
    }
    this.throwBottleInterval = setInterval(() => {
      this.x += 10;
      if (this.y >= 350) {
        clearInterval(this.throwBottleInterval);
        this.playGroundAnimation();
      }
    }, 25);
  }

  stopAnimation() {
    clearInterval(this.throwBottleInterval);
    this.isPlayingAnimation = false;
  }

  animateBottle() {
    this.bottleIsCollidingBoss = false;
    this.isPlayingAnimation = true;
    if (this.y < 350 && !this.bottleIsCollidingBoss) {
      this.throwBottleInterval = setInterval(() => {
        if (!this.bottleIsCollidingBoss) {
          this.playAnimation(this.IMAGES_THROW_BOTTLE);
          this.applyGravityForBottle();
          this.checkBottlePosition();
          if (this.y >= 350) {
            clearInterval(this.throwBottleInterval);
            this.playGroundAnimation();
            this.isPlayingAnimation = false;
          }
        }
      }, 30);
    } else {
      clearInterval(this.throwBottleInterval);
      this.playGroundAnimation();
      this.isPlayingAnimation = false;
      return;
    }
  }

  applyGravityForBottle() {
    if (!(this.y >= 350) && !this.bottleIsCollidingBoss) {
      this.y -= this.speedY;
      this.speedY -= 2.7;
    } else if (this.bottleIsCollidingBoss) {
      this.y = this.y;
      this.speedY = 0;
    }
  }

  checkBottlePosition() {
    if (this.y >= 350) {
      clearInterval(this.throwBottleInterval);
      this.playGroundAnimation();
    }
  }

  playGroundAnimation() {
    this.updateImageBottle(this.groundBottle[0]);
  }

  updateImageBottle(newImageUrl) {
    if (this.imageCache[newImageUrl]) {
      this.img = this.imageCache[newImageUrl];
    } else {
      let newImage = new Image();
      newImage.src = newImageUrl;
      this.imageCache[newImageUrl] = newImage;
      this.img = newImage;
    }
  }
}
