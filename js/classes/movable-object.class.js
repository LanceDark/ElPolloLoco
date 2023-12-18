class MoveableObject extends DrawableObject {
  otherDirection = false;
  speed = 0.15;
  speedY = 0;
  acceleration = 2.7;
  energy = 100;
  lastHit = 0;
  coin = 0;
  bottle = 0;
  bosshp = 100;

  /**
   * Gravity for Objects in the Canvas
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   *
   * @returns if a Object is above y = 140
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    }
    return this.y < 140;
  }

  /**
   * Check Collision of an Object with an other Object. ALERT with HITBOX!
   * @param {*} MoveableObject
   * @returns
   */
  isColliding(MoveableObject) {
    if (this.hitbox && MoveableObject.hitbox) {
      return (
        this.hitbox.x + this.hitbox.width > MoveableObject.hitbox.x &&
        this.hitbox.y + this.hitbox.height > MoveableObject.hitbox.y &&
        this.hitbox.x < MoveableObject.hitbox.x + MoveableObject.hitbox.width &&
        this.hitbox.y < MoveableObject.hitbox.y + MoveableObject.hitbox.height
      );
    }
  }

  /**
   * Check if it is Above a Chicken to hit it
   * @param {*} MoveableObject
   * @param {*} lowEnemy
   * @returns true/false
   */
  isAboveChicken(MoveableObject, lowEnemy) {
    const isAbove =
      MoveableObject.hitbox.y + MoveableObject.hitbox.height ===
      lowEnemy.hitbox.y;

    return isAbove;
  }

  /**
   * play Animations with images of the current ImageChache
   * @param {*} images
   */
  playAnimation(images) {
    let i = this.currentImage % images.length; // let i = 0 % 6; % = Mathematischer Rest. Resetted den Rest Wert auf 0. - 0,1,2,3,4,5, 0!!!
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * movement on x right side
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * movement on x left side
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * movement on y top
   */
  jump() {
    this.speedY = 25;
  }

  /**
   * Hit from Enemys to character reduce energy of Character
   */
  hit() {
    let hitSound = new Audio("./music/hurt.mp3");
    hitSound.addEventListener("canplaythrough", () => {
      hitSound.play();
    });
    hitSound.play();
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * check Enegery
   * @returns dead
   */
  isDead() {
    return this.energy === 0;
  }

  /**
   * increase player coins when collect
   * @returns
   */
  coinCollect() {
    if (this.coin < 100) {
      this.coin += 20;
    } else {
      return;
    }
  }

  /**
   * increase player bottle when collect
   * @returns
   */
  bottleCollect() {
    if (this.bottle < 100) {
      this.bottle += 20;
    } else {
      return;
    }
  }

  /**
   * default hurt function. Check time when last time get hurted to avoid errors of multiple hits on same second
   * @returns
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // difference in ms
    timePassed = timePassed / 1000; // difference in sec.
    return timePassed < 1;
  }
}
