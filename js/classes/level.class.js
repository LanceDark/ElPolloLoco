class Level {
  lowEnemy;
  cloud;
  background;
  coin;
  bottle;
  endboss;
  level_end_x = 2200;

  constructor(lowEnemy, cloud, background, coin, bottle, endboss) {
    this.lowEnemy = lowEnemy;
    this.cloud = cloud;
    this.background = background;
    this.coin = coin;
    this.bottle = bottle;
    this.endboss = endboss;
  }
}
