class Endboss extends MoveableObject {
  IMAGES_SPAWN = [
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G11.png",
    './img/4_enemie_boss_chicken/2_alert/G12.png'
  ];
  IMAGES_WALKING = [
    "./img/4_enemie_boss_chicken/1_walk/G1.png",
    "./img/4_enemie_boss_chicken/1_walk/G2.png",
    "./img/4_enemie_boss_chicken/1_walk/G3.png",
    "./img/4_enemie_boss_chicken/1_walk/G4.png"
  ];
  IMAGES_ANGRY = [
    "./img/4_enemie_boss_chicken/4_hurt/G21.png",
    "./img/4_enemie_boss_chicken/4_hurt/G22.png",
    "./img/4_enemie_boss_chicken/4_hurt/G23.png"
  ];
  IMAGES_DEAD = [
    "./img/4_enemie_boss_chicken/5_dead/G24.png",
    "./img/4_enemie_boss_chicken/5_dead/G25.png",
    "./img/4_enemie_boss_chicken/5_dead/G26.png"
  ];
  IMAGES_ANGRY_WALK = [
    "./img/4_enemie_boss_chicken/3_attack/G13.png",
    "./img/4_enemie_boss_chicken/3_attack/G14.png",
    "./img/4_enemie_boss_chicken/3_attack/G15.png",
    "./img/4_enemie_boss_chicken/3_attack/G16.png",
    "./img/4_enemie_boss_chicken/3_attack/G17.png",
    "./img/4_enemie_boss_chicken/3_attack/G18.png",
    "./img/4_enemie_boss_chicken/3_attack/G19.png",
    "./img/4_enemie_boss_chicken/3_attack/G20.png"
  ]
  currentImage = 0;
  height = 500;
  width = 300;
  y = -38;
  speed = 0.2;

  constructor() {
    super().loadImage('./img/4_enemie_boss_chicken/2_alert/G5.png');
    this.loadImages(this.IMAGES_SPAWN);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ANGRY);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ANGRY_WALK);
    this.x = 2500;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animateEndboss();
  }

  adjustHitbox() {
    this.hitbox = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }

  animateEndboss(){
    setInterval(() =>{
        this.playAnimation(this.IMAGES_WALKING);
    }, 200)
    setInterval(() => {
      this.moveLeft()
    },1000 / 60)
  }

  isCollidingBoss(boss) {
    let collision = 
      this.x < boss.x + boss.width &&
      this.x + this.width > boss.x &&
      this.y < boss.y + boss.height &&
      this.y + this.height > boss.y;

      this.bottleIsCollidingBoss = 0;

      return collision;
  }

  animateAngryBoss(){
    setInterval(()=>{
      this.playAnimation(this.IMAGES_ANGRY);
    }, 400)
  }

  animateAngryMoveBoss(){
    setInterval(()=>{
      this.playAnimation(this.IMAGES_ANGRY_WALK);
    }, 400)
  }

  animateDeadBoss(){
    setInterval(()=>{
      this.playAnimation(this.IMAGES_DEAD);
    }, 2000)
  }

}
