class World {
  character = new Character();
  statusbar = new StatusBar();
  coinbar = new CoinBar();
  bottlebar = new BottleBar();
  endbossbar = new Endbosshp();
  throwableObject = [];
  bottleCount = 0;
  lowEnemy = level1.lowEnemy;
  endboss = level1.endboss;
  cloud = level1.cloud;
  background = level1.background;
  coin = level1.coin;
  bottle = level1.bottle;
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  isAbove = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Intervals which are working all game long to check several Events
   */
  run() {
    setInterval(() => {
      this.checkEndbossHealth();
      this.checkBossCollision();
      this.checkEndbossCollision();
      this.checkThrowObjects();
    }, 250);

    setInterval(() => {
      this.checkCollisions();
      this.checkHealth();
      this.checkCollect();
      this.checkBottleCollect();
    }, 20);
  }

  /**
   * Boss Collision
   */
  checkBossCollision() {
    if (this.endboss && this.endboss.length > 0) {
      this.throwableObject.forEach((bottle) => {
        if (
          this.endboss[0].isCollidingBoss(bottle) &&
          !bottle.bottleIsCollidingBoss
        ) {
          this.handleCollidingBottle(bottle);
        }
      });
    }
  }

  /**
   * All events after get hit by Endboss
   */
  checkEndbossCollision() {
    let endboss = this.endboss[0];
    if (endboss.isColliding(this.character)) {
      this.character.hit();
      this.statusbar.setPercentage(this.character.energy);
      this.character.coin -= 10;
      this.coinbar.coinReduce(this.character.coin);
    }
  }

  /**
   * Endboss health update
   */
  checkEndbossHealth() {
    this.endboss[0].checkBossHp();
  }

  /**
   * All Events when endboss got hit by a Bottle of Player
   * @param {*} bottle
   */
  handleCollidingBottle(bottle) {
    bottle.bottleIsCollidingBoss = true;
    if (bottle.isPlayingAnimation) {
      this.handleAnimation(bottle);
      this.endbossbar.endbossHit(20);
      this.endboss[0].endbossHitDamage(20);
      this.endboss[0].enbossMoveBoost();
      this.endbossbar.setPercentage(this.endbossbar.bosshp);
      let bottleHitBossSound = new Audio("./music/bottleexplode.wav");
      bottleHitBossSound.addEventListener("canplaythrough", () => {
        bottleHitBossSound.play();
      });
      bottleHitBossSound.play();
    }
  }

  /**
   * Animation of Bottle, when Hit boss. Splash
   * @param {*} bottle
   */
  handleAnimation(bottle) {
    bottle.stopAnimation();
    bottle.splashAnimation();
    this.bossCollision = setTimeout(() => {
      this.removeObject(bottle);
    }, 500);
  }

  /**
   * check Condiditons so that bottle Start to fly, and reduce the Bottle amount of Player
   * @returns
   */
  checkThrowObjects() {
    if (
      this.keyboard.D &&
      this.character.bottle > 0 &&
      !this.character.isAboveGround()
    ) {
      if (!this.throwableObject) {
        return;}
      let bottle = new Bottle(this.character.x + 100, this.character.y + 100);
      this.throwableObject.push(bottle);
      this.character.bottle -= 10;
      this.bottlebar.earnBottle(this.character.bottle);
      bottle.throw();
    }
  }

  /**
   * Collision Tracker with chickens and return events of lower HP, Coins
   */
  checkCollisions() {
    this.level.lowEnemy.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (this.playerIsAboveGround()) {
          this.handleJumpOnEnemy(enemy);
        } else if (!enemy.isDead && !this.playerIsAboveGround()) {
          this.character.hit();
          this.statusbar.setPercentage(this.character.energy);
          this.character.coin -= 10;
          this.coinbar.coinReduce(this.character.coin);
        }
      }
    });
  }

  /**
   * Kill Enemy on Jumps and Play Music for it aswell
   * @param {*} enemy
   */
  handleJumpOnEnemy(enemy) {
    if (enemy instanceof miniChicken) {
      this.killMiniChicken(enemy);
    } else if (enemy instanceof LowEnemy) {
      this.killLowEnemy(enemy);
    }
  }

  killMiniChicken(enemy) {
    let jumpSound = new Audio("./music/jump_player.wav");
    jumpSound.addEventListener("canplaythrough", () => {
      jumpSound.play();
    });
    jumpSound.play();
    enemy.updateImage("./img/3_enemies_chicken/chicken_small/2_dead/dead.png");
    enemy.removeChicken();
  }

  killLowEnemy(enemy) {
    let jumpSound = new Audio("./music/jump_player.wav");
    jumpSound.addEventListener("canplaythrough", () => {
      jumpSound.play();
    });
    jumpSound.play();
    enemy.updateImage("./img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
    enemy.removeChicken();
  }

  /**
   * @returns if Player is above y.
   */
  playerIsAboveGround() {
    return this.character.isAboveGround();
  }

  /**
   *  Check Collect of the Coin and add Sound to it aswell, Old coin get deleted
   */
  checkCollect() {
    this.level.coin.forEach((coin, index) => {
      if (coin.isCollectedBy(this.character) && this.character.coin < 100) {
        this.character.coinCollect();
        this.coinbar.earnCoin(this.character.coin);
        let coinMusic = new Audio("./music/coin_player.wav");
        coinMusic.addEventListener("canplaythrough", () => {
          coinMusic.play();
        });
        coinMusic.play();
        this.level.coin.splice(index, 1);
      }
    });
  }

  /**
   * Check Collect of the bottle and add Sound to it aswell, Old bottle get deleted
   */
  checkBottleCollect() {
    this.level.bottle.forEach((bottle) => {
      if (bottle.isCollectedBy(this.character) && this.character.bottle < 100) {
        this.character.bottleCollect();
        this.bottlebar.earnBottle(this.character.bottle);
        let index = this.level.bottle.indexOf(bottle);
        if (index !== 1) {
          this.level.bottle.splice(index, 1);
        }
      }
    });
  }

  /**
   * Check Player health to control death screen
   * @returns
   */
  checkHealth() {
    if (this.character.energy <= 0) {
      gameOverScreen();
      this.endAnimations();
    } else return;
  }

  /**
   * delete a object from Canvas
   * @param {} objectToRemove
   */
  removeObject(objectToRemove) {
    let i = this.throwableObject.indexOf(objectToRemove);
    if (i !== -1) {
      this.throwableObject.splice(i, 1);
    }
  }

  /**
   * set world to work with
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * end all Intervals, important to end Game
   */
  endAnimations() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }

  /**
   * Draw all object to Canvas
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.background);
    this.addObjectsToMap(this.coin);
    this.addObjectsToMap(this.bottle);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.cloud);
    this.addObjectsToMap(this.level.lowEnemy);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.throwableObject);

    this.ctx.translate(-this.camera_x, 0);
    // fixed Objects here
    this.addToMap(this.statusbar);
    this.addToMap(this.coinbar);
    this.addToMap(this.bottlebar);
    this.addToMap(this.endbossbar);

    this.ctx.translate(this.camera_x, 0);

    this.ctx.translate(-this.camera_x, 0);

    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Add Objects to the Canvas+
   * @param {*} objects
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Possibility charakter can walk backwards and turn the image
   * @param {*} moveableObject
   */
  addToMap(moveableObject) {
    if (moveableObject.otherDirection) {
      this.flipImage(moveableObject);
    }
    moveableObject.draw(this.ctx);
    //moveableObject.drawFrame(this.ctx);
    if (moveableObject.otherDirection) {
      this.flipImageBack(moveableObject);
    }
  }

  /**
   * Possibility charakter can walk backwards and turn the image
   * @param {*} moveableObject
   */
  flipImage(moveableObject) {
    this.ctx.save();
    this.ctx.translate(moveableObject.width, 0);
    this.ctx.scale(-1, 1);
    moveableObject.x = moveableObject.x * -1;
  }

  /**
   * Possibility charakter can walk backwards and turn the image
   * @param {*} moveableObject
   */
  flipImageBack(moveableObject) {
    moveableObject.x = moveableObject.x * -1;
    this.ctx.restore();
  }
}
