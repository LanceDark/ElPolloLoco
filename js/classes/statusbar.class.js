class StatusBar extends DrawableObject {
  IMAGES_BAR = [
    "./img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES_BAR);
    this.setPercentage(100);
    this.x = 10;
    this.y = 1;
    this.height = 75;
    this.width = 250;
  }

  /**
   * Percentage for switching between Index pictures, to show right Value
   * @param {Number} percentage
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_BAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Returns Picture of various Endbosslife %
   * @returns
   */
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
