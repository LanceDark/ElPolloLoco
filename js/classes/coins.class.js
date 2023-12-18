class Coin extends MoveableObject {
  IMAGES_COINS = ["./img/8_coin/coin_1.png", "./img/8_coin/coin_2.png"];
  isCollected = false;

  constructor(x, y) {
    super().loadImage("./img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COINS);
    this.x = x;
    this.y = y;
    this.animateCoins();
  }

  /**
   * Animation for Coin
   */
  animateCoins() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
      this.adjustHitbox();
    }, 200);
  }

  /**
   * get a various Hitbox to allow different Situations and make it more correct to hit object
   */
  adjustHitbox() {
    this.hitbox = {
      x: this.x + 40,
      y: this.y + 20,
      width: this.width - 70,
      height: this.height - 70,
    };
  }

  /**
   * @param {*} character
   * @returns true or false to see if i can collect or not
   */
  isCollectedBy(character) {
    if (!this.isCollected && character.isColliding(this)) {
      this.isCollected = true;
      return true;
    }
    return false;
  }
}
