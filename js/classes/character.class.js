class Character extends MoveableObject {
  height = 300;
  width = 150;
  y = 140;
  x = 50;
  speed = 5;
  IMAGES_WALKING = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMP = [
    "./img/2_character_pepe/3_jump/J-31.png",
    "./img/2_character_pepe/3_jump/J-32.png",
    "./img/2_character_pepe/3_jump/J-33.png",
    "./img/2_character_pepe/3_jump/J-34.png",
    "./img/2_character_pepe/3_jump/J-35.png",
    "./img/2_character_pepe/3_jump/J-36.png",
    "./img/2_character_pepe/3_jump/J-37.png",
    "./img/2_character_pepe/3_jump/J-38.png",
    "./img/2_character_pepe/3_jump/J-39.png",
  ];
  IMAGES_DEAD = [
    "./img/2_character_pepe/5_dead/D-51.png",
    "./img/2_character_pepe/5_dead/D-52.png",
    "./img/2_character_pepe/5_dead/D-53.png",
    "./img/2_character_pepe/5_dead/D-54.png",
    "./img/2_character_pepe/5_dead/D-55.png",
    "./img/2_character_pepe/5_dead/D-56.png",
    "./img/2_character_pepe/5_dead/D-57.png",
  ];
  IMAGES_HURT = [
    "./img/2_character_pepe/4_hurt/H-41.png",
    "./img/2_character_pepe/4_hurt/H-42.png",
    "./img/2_character_pepe/4_hurt/H-43.png",
  ];
  IMAGES_IDLE = [
    "./img/2_character_pepe/1_idle/idle/I-1.png",
    "./img/2_character_pepe/1_idle/idle/I-2.png",
    "./img/2_character_pepe/1_idle/idle/I-3.png",
    "./img/2_character_pepe/1_idle/idle/I-4.png",
    "./img/2_character_pepe/1_idle/idle/I-5.png",
    "./img/2_character_pepe/1_idle/idle/I-6.png",
    "./img/2_character_pepe/1_idle/idle/I-7.png",
    "./img/2_character_pepe/1_idle/idle/I-8.png",
    "./img/2_character_pepe/1_idle/idle/I-9.png",
    "./img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_IDLE_LONG = [
    "./img/2_character_pepe/1_idle/long_idle/I-11.png",
    "./img/2_character_pepe/1_idle/long_idle/I-12.png",
    "./img/2_character_pepe/1_idle/long_idle/I-13.png",
    "./img/2_character_pepe/1_idle/long_idle/I-14.png",
    "./img/2_character_pepe/1_idle/long_idle/I-15.png",
    "./img/2_character_pepe/1_idle/long_idle/I-16.png",
    "./img/2_character_pepe/1_idle/long_idle/I-17.png",
    "./img/2_character_pepe/1_idle/long_idle/I-18.png",
    "./img/2_character_pepe/1_idle/long_idle/I-19.png",
    "./img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  IMAGES_PEPE_DEAD = [
    "./img/9_intro_outro_screens/game_over/oh no you lost!.png",
  ];
  currentImage = 0;
  world;
  walking_sound = new Audio("./music/Walking.mp3");
  gameover_sound = new Audio("./music/lost_player.wav");
  dead = false;
  hitboxOffsetX = 10;
  hitboxOffsetWidth = 50;
  hitboxOffsetHeight = 110;

  constructor() {
    super().loadImage("./img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMP);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_IDLE_LONG);
    this.loadImage(this.IMAGES_PEPE_DEAD);
    this.animateCharacter();
    this.applyGravity();
  }

  /**
   * get a various Hitbox to allow different Situations and make it more correct to hit object
   */
  adjustHitbox() {
    this.hitbox = {
      x: this.x + this.hitboxOffsetX,
      y: this.y + 110,
      width: this.width - this.hitboxOffsetWidth,
      height: this.height - this.hitboxOffsetHeight,
    };
  }

  /**
   * All Animations for the Character
   */
  animateCharacter() {
    this.adjustHitbox();
    setInterval(() => this.moveCharacter(), 1000 / 60);
    setInterval(() => this.playCharacter(), 100);
  }

  playCharacter() {
    if (this.isDead() && this.dead === false) {
      this.deadAnimation = 0;
      this.pepeDead();
      this.gameover_sound.play();
      this.dead = true;
    } else if (this.isHurt()) {
      this.idleTimeout = 0;
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAboveGround()) {
      this.idleTimeout = 0;
      this.playAnimation(this.IMAGES_JUMP);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.idleTimeout = 0;
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      this.playIdle();
    }
  }

  moveCharacter() {
    this.walking_sound.pause();
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
    }
    if (this.world.keyboard.LEFT && this.x > -200) {
      this.moveLeft();
    }
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.adjustHitbox();
      this.jump();
    }
    this.adjustHitbox();
    this.world.camera_x = -this.x + 70;
  }

  moveRight() {
    super.moveRight();
    this.otherDirection = false;
    if (!isMuted) {
      this.walking_sound.play();
    }
    this.adjustHitbox();
  }

  moveLeft() {
    super.moveLeft();
    this.otherDirection = true;
    if (!isMuted) {
      this.walking_sound.play();
    }
    this.adjustHitbox();
  }

  /**
   * Dead Animation for Character
   */
  pepeDead() {
    this.playAnimation(this.IMAGES_DEAD);
    this.deadAnimation += 100;
    if (this.deadAnimation >= 200) this.playAnimation(this.IMAGES_PEPE_DEAD);
  }

  /**
   * Idle Animation for Character
   */
  playIdle() {
    this.playAnimation(this.IMAGES_IDLE);
    this.idleTimeout += 150;
    if (this.idleTimeout >= 5000) {
      this.playAnimation(this.IMAGES_IDLE_LONG);
    }
  }
}
