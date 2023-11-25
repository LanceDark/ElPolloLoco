class Endboss extends MoveableObject {
  IMAGES_SPAWN = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    'img/4_enemie_boss_chicken/2_alert/G12.png'
  ];
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png"
  ];
  currentImage = 0;
  height = 500;
  width = 300;
  y = -38;
  speed = 0.2;
  hp = 50;

  constructor() {
    super().loadImage('./img/4_enemie_boss_chicken/2_alert/G5.png');
    this.loadImages(this.IMAGES_SPAWN);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 2500;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animateEndboss();
  }

  animateEndboss(){
    setInterval(() =>{
        this.playAnimation(this.IMAGES_WALKING);
    }, 200)
    setInterval(() => {
      this.moveLeft()
    },1000 / 60)
  }
}
