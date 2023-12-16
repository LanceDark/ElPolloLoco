class DrawableObject {
  imageCache = [];
  currentImage = 0;
  img;
  x = 120;
  y = 280;
  height = 150;
  width = 100;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   *
   * @param {Array} array - ['img/image1.png', 'img/image/2.ong', ...]
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      img.style = "transform: scaleX(-1)";
      this.imageCache[path] = img;
    });
  }

//  drawFrame(ctx) {
//  if (this.hitbox) {
//      ctx.beginPath();
//     ctx.lineWidth = "3";
//     ctx.strokeStyle = "blue";
//     ctx.rect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height);
//     ctx.stroke();
//    }
//  }

}
