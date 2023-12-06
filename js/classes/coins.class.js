class Coin extends MoveableObject {
  IMAGES_COINS = [
    "./img/8_coin/coin_1.png",
    "./img/8_coin/coin_2.png"
  ];
  isCollected = false;

  constructor(x, y) {
    super().loadImage("./img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COINS);
    this.x = x;
    this.y = y;
    this.animateCoins();
  }

  animateCoins(){
    setInterval(() =>{
      this.playAnimation(this.IMAGES_COINS);
      this.adjustHitbox();
    }, 200)
  }

  adjustHitbox() {
    this.hitbox = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }

  isCollectedBy(character) {
    if (!this.isCollected && character.isColliding(this)) {
      this.isCollected = true;
      return true;
    }
    return false;
  }

}
