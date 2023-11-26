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

  constructor(x, y) {
    super();
    this.loadImage(this.IMAGES_BOTTLE);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.throwBottleInterval = null;
  }

  isCollectedBy(character) {
    if (!this.isCollected && character.isColliding(this)) {
      this.isCollected = true;
      return true;
    }
    return false;
  }

  isCollidingBoss(boss) {
    return (
      this.x < boss.x + boss.width &&
      this.x + this.width > boss.x &&
      this.y < boss.y + boss.height &&
      this.y + this.height > boss.y
    );
  }

  splashAnimation() {
    console.log("Splash Animation wird abgespielt");
    this.stopAnimation();
    this.playAnimation(this.IMAGES_SPLASH);
  }
}
