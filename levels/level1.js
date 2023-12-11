let level1;

function initLevel() {
  level1 = new Level(
    [
      new LowEnemy(),
      new LowEnemy(),
      new miniChicken(),
      new miniChicken(),
      new LowEnemy(),
      new LowEnemy(),
      new miniChicken(),
      new miniChicken(),
      new LowEnemy(),
      new LowEnemy(),
    ],
    [(new Cloud(), new Cloud())],
    [
      new Background("./img/5_background/layers/air.png", -719, 0),
      new Background("./img/5_background/layers/3_third_layer/2.png", -719, 80),
      new Background(
        "./img/5_background/layers/2_second_layer/2.png",
        -719,
        80
      ),
      new Background("./img/5_background/layers/1_first_layer/2.png", -719, 80),
      new Background("./img/5_background/layers/air.png", 0, 0),
      new Background("./img/5_background/layers/3_third_layer/1.png", 0, 80),
      new Background("./img/5_background/layers/2_second_layer/1.png", 0, 80),
      new Background("./img/5_background/layers/1_first_layer/1.png", 0, 80),
      new Background("./img/5_background/layers/air.png", 719, 0),
      new Background("./img/5_background/layers/3_third_layer/2.png", 719, 80),
      new Background("./img/5_background/layers/2_second_layer/2.png", 719, 80),
      new Background("./img/5_background/layers/1_first_layer/2.png", 719, 80),
      new Background("./img/5_background/layers/air.png", 719 * 2, 0),
      new Background(
        "./img/5_background/layers/3_third_layer/1.png",
        719 * 2,
        80
      ),
      new Background(
        "./img/5_background/layers/2_second_layer/1.png",
        719 * 2,
        80
      ),
      new Background(
        "./img/5_background/layers/1_first_layer/1.png",
        719 * 2,
        80
      ),
      new Background("./img/5_background/layers/air.png", 719 * 3, 0),
      new Background(
        "./img/5_background/layers/3_third_layer/2.png",
        719 * 3,
        80
      ),
      new Background(
        "./img/5_background/layers/2_second_layer/2.png",
        719 * 3,
        80
      ),
      new Background(
        "./img/5_background/layers/1_first_layer/2.png",
        719 * 3,
        80
      ),
    ],
    [
      new Coin(225, 175),
      new Coin(300, 100),
      new Coin(375, 175),
      new Coin(225 + 700, 175),
      new Coin(300 + 700, 250),
      new Coin(375 + 700, 175),
    ],
    [
      new Bottle(600, 250),
      new Bottle(1300, 250),
      new Bottle(1500, 250),
      new Bottle(2000, 100),
      new Bottle(300, 300),
    ],
    [new Endboss()]
  );
}
