class MoveableObject extends DrawableObject {
  otherDirection = false;
  speed = 0.15;
  speedY = 0;
  acceleration = 2.7;
  energy = 100;
  lastHit = 0;
  coin = 0;
  bottle = 0;
  bosshp = 100

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    }
    return this.y < 140;
  }


  // character.isColliding.chicken()
  isColliding(MoveableObject) {
    return (
      this.x + this.width > MoveableObject.x &&
      this.y + this.height > MoveableObject.y &&
      this.x < MoveableObject.x &&
      this.y < MoveableObject.y + MoveableObject.height
    );
  }

  isJumpingOnChicken(MoveableObject, lowEnemy) {
    return (
      MoveableObject.y + MoveableObject.height < lowEnemy.y &&
      MoveableObject.x + MoveableObject.width > lowEnemy.x &&
      MoveableObject.x < lowEnemy.x + lowEnemy.width
    );
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; // let i = 0 % 6; % = Mathematischer Rest. Resetted den Rest Wert auf 0. - 0,1,2,3,4,5, 0!!!
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 25;
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isDead() {
    return this.energy === 0;    
  }

  coinCollect() {
    if (this.coin < 100) {
      this.coin += 20;
    } else {
      return;
    }
  }

  bottleCollect() {
    if (this.bottle < 100) {
      this.bottle += 20;
    } else {
      return;
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // difference in ms
    timePassed = timePassed / 1000; // difference in sec.
    return timePassed < 1;
  }
}
