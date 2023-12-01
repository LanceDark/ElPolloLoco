class Bottle extends ThrowableObject {
  IMAGES_BOTTLE = ["img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"];
  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];
  isCollected = false;
  throwBottleInterval;
  width = 70;
  height = 80;

  constructor(x, y) {
    super();
    this.loadImage(this.IMAGES_BOTTLE);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.adjustHitbox()
    this.throwBottleInterval = null;
  }

  adjustHitbox() {
    this.hitbox = {
      x: this.x + 10 ,
      y: this.y + 10,
      width: this.width - 20,
      height: this.height -15,
    };
  }

  isCollectedBy(character) {
    if (!this.isCollected && character.isColliding(this)) {
      this.isCollected = true;
      return true;
    }
    return false;
  }

  splashAnimation() {
    console.log("Splash Animation wird abgespielt");
    this.playAnimation(this.IMAGES_SPLASH);
    setTimeout(() =>{
      this.isPlayingAnimation = false;
    }, this.IMAGES_SPLASH.length * 400);
  }
}
