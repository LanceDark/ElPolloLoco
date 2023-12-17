class Endboss extends MoveableObject {
  IMAGES_SPAWN = [
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G11.png",
    "./img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_WALKING = [
    "./img/4_enemie_boss_chicken/1_walk/G1.png",
    "./img/4_enemie_boss_chicken/1_walk/G2.png",
    "./img/4_enemie_boss_chicken/1_walk/G3.png",
    "./img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_ANGRY = [
    "./img/4_enemie_boss_chicken/4_hurt/G21.png",
    "./img/4_enemie_boss_chicken/4_hurt/G22.png",
    "./img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_DEAD = [
    "./img/4_enemie_boss_chicken/5_dead/G24.png",
    "./img/4_enemie_boss_chicken/5_dead/G25.png",
    "./img/4_enemie_boss_chicken/5_dead/G26.png",
  ];
  IMAGES_ANGRY_WALK = [
    "./img/4_enemie_boss_chicken/3_attack/G13.png",
    "./img/4_enemie_boss_chicken/3_attack/G14.png",
    "./img/4_enemie_boss_chicken/3_attack/G15.png",
    "./img/4_enemie_boss_chicken/3_attack/G16.png",
    "./img/4_enemie_boss_chicken/3_attack/G17.png",
    "./img/4_enemie_boss_chicken/3_attack/G18.png",
    "./img/4_enemie_boss_chicken/3_attack/G19.png",
    "./img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  currentImage = 0;
  height = 500;
  width = 300;
  y = -38;
  speed = 0.2;
  angryInterval;
  bosshp = 100;
  moveInterval;
  deadBoss = new Audio("./music/win_player.wav");
  deadBossPlayed = false;

  constructor() {
    super().loadImage("./img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_SPAWN);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ANGRY);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ANGRY_WALK);
    this.x = 2500;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animateEndboss();
    this.bosshp = 100;
    this.angryInterval = null;
    this.moveInterval = null;
    this.deadBossPlayed = false;
  }

  /**
   * get a various Hitbox to allow different Situations and make it more correct to hit object
   */
  adjustHitbox() {
    this.hitbox = {
      x: this.x + 45,
      y: this.y + 70,
      width: this.width - 35,
      height: this.height - 70,
    };
  }

  /**
   * Check if Endboss got a hit and reset it to get mutiple hits in a short time
   * @param {*} damage
   */
  endbossHitDamage(damage) {
    this.bosshp -= damage;
    if (this.bosshp < 0) {
      this.bosshp = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Animation of Endboss
   * @returns
   */
  animateEndboss() {
    if (this.bosshp > 0) {
      this.moveInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
      }, 200);
      this.moveIntervalId = setInterval(() => {
        this.moveLeft();
        this.adjustHitbox();
      }, 1000 / 60);
    } else return;
  }

  /**
   * Check if Object hit the Endboss
   * @param {*} boss
   * @returns collision true or false
   */
  isCollidingBoss(boss) {
    let collision =
      this.hitbox.x < boss.x + boss.width &&
      this.hitbox.x + this.hitbox.width > boss.x &&
      this.hitbox.y < boss.y + boss.height &&
      this.hitbox.y + this.hitbox.height > boss.y;

    this.bottleIsCollidingBoss = 0;

    return collision;
  }

  /**
   * Animations after boss on 0 HP, stop intervals and play a dead interval
   */
  checkBossHp() {
    if (this.bosshp === 0) {
      clearInterval(this.angryInterval);
      clearInterval(this.moveInterval);
      clearInterval(this.angryInterval2);
      clearInterval(this.moveIntervalId);
      this.animateDeadBoss();
      if (this.deadBossPlayed === false) {
        this.deadBoss.play();
      }
      this.deadBossPlayed = true;
      setTimeout(() => {
        world.endAnimations();
      }, 900);
    }
  }

  /**
   * animation for Boss
   */
  animateAngryBoss() {
    if (this.bosshp > 0) {
      this.angryInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_ANGRY);
      }, 600);
    }
  }

  /**
   * animation for Boss
   */
  animateAngryMoveBoss() {
    if (this.bosshp > 0) {
      this.angryInterval2 = setInterval(() => {
        this.playAnimation(this.IMAGES_ANGRY_WALK);
      }, 400);
    }
  }

  /**
   * animation for Boss
   */
  animateDeadBoss() {
    if (this.bosshp === 0) {
      this.updateImage("./img/4_enemie_boss_chicken/5_dead/G24.png");
      this.playAnimation(this.IMAGES_DEAD);
      this.y += 100;
      setTimeout(() => {
        gameOverScreen();
      }, 300);
    }
  }

  /**
   * Update the Image Chache to put new img in
   */
  updateImage(newImageUrl) {
    this.img = this.imageCache[newImageUrl];
  }

  /**
   * Various Movementspeed for Endboss
   */
  enbossMoveBoost() {
    this.speed = 1.5;
    this.animateAngryMoveBoss();
  }
}
