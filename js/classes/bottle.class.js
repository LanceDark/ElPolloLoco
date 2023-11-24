class Bottle extends MoveableObject {
  IMAGES_BOTTLE = ["img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"];
  isCollected = false;

  constructor(x, y) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = x;
    this.y = y;
  }

  isCollectedBy(character) {
    if (!this.isCollected && character.isColliding(this)) {
      this.isCollected = true;
      return true;
    }
    return false;
  }
}
