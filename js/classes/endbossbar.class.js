class Endbosshp extends DrawableObject {
  IMAGES_ENDBOSS_HP_BAR = [
    "./img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];
  bosshp = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES_ENDBOSS_HP_BAR);
    this.setPercentage(100);
    this.x = 460;
    this.y = 1;
    this.height = 75;
    this.width = 250;
  }

  endbossHit(damage) {
    this.bosshp -= damage;
    if (this.bosshp < 0) {
      this.bosshp = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // difference in ms
    timePassed = timePassed / 1000; // difference in sec.
    return timePassed < 1;
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_ENDBOSS_HP_BAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}