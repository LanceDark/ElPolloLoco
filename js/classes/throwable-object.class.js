class ThrowableObject extends MoveableObject {
  IMAGES_THROW_BOTTLE = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  groundBottle = ["img/6_salsa_bottle/1_salsa_bottle_on_ground.png"];
  throwBottleInterval;

  constructor(x, y) {
    super();
    this.loadImages(this.IMAGES_THROW_BOTTLE);
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 50;
    this.throwBottleInterval = null;
    this.speedY = 0;
    this.acceleration = 2.7;
    this.throw();
  }

  throw() {
    this.loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.speedY = 30;
    if (this.y > 200 && this.y < 350) {
      this.animateBottle();
    } else {
      clearInterval(this.throwBottleInterval);
      this.playGroundAnimation();
      this.speedY = 0;
    }
    this.applyGravityForBottle();
    this.throwBottleInterval = setInterval(() => {
      this.x += 10;
    }, 25);
  }

  animateBottle() {
    if (this.y < 350) {
      this.throwBottleInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_THROW_BOTTLE);
        this.applyGravityForBottle();
        this.checkBottlePosition()
      }, 30);
    } else {
      clearInterval(this.throwBottleInterval);
      return;
    }
  }

  applyGravityForBottle() {
    if (!(this.y >= 350)) {
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }
  }

  checkBottlePosition() {
    if (this.y >= 350) {
      console.log("Bottle is at y=350!");
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
