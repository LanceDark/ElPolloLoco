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
  bottleHitBossSound = new Audio("./music/bottleexplode.wav");
  jumpSound = new Audio("./music/jump_player.wav");
  coinMusic = new Audio("./music/coin_player.wav");

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  run() {
    setInterval(() => {
      this.checkEndbossHealth();
      this.checkBossCollision();
      this.checkHealth();
      this.checkEndbossCollision();

      this.checkCollect();
      this.checkThrowObjects();
      this.checkBottleCollect();
    }, 250);

    setInterval(() =>{
      this.checkCollisions();
    }, 20);
  }

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

  checkEndbossCollision() {
    let endboss = this.endboss[0];
    if (endboss.isColliding(this.character)) {
      this.character.hit();
      this.statusbar.setPercentage(this.character.energy);
      this.character.coin -= 10;
      this.coinbar.coinReduce(this.character.coin);
    }
  }

  checkEndbossHealth() {
    this.endboss[0].checkBossHp();
  }

  handleCollidingBottle(bottle) {
    bottle.bottleIsCollidingBoss = true;
    if (bottle.isPlayingAnimation) {
      this.handleAnimation(bottle);
      this.endbossbar.endbossHit(20);
      this.endboss[0].endbossHitDamage(20);
      this.endboss[0].enbossMoveBoost();
      this.endbossbar.setPercentage(this.endbossbar.bosshp);
      this.bottleHitBossSound.play();
    }
  }

  handleAnimation(bottle) {
    bottle.stopAnimation();
    bottle.splashAnimation();
    this.bossCollision = setTimeout(() => {
      this.removeObject(bottle);
    }, 500);
  }

  checkThrowObjects() {
    if (
      this.keyboard.D &&
      this.character.bottle > 0 &&
      !this.character.isAboveGround()
    ) {
      if (!this.throwableObject) {
        return;
      }
      let bottle = new Bottle(this.character.x + 100, this.character.y + 100);
      this.throwableObject.push(bottle);
      this.character.bottle -= 10;
      this.bottlebar.earnBottle(this.character.bottle);
      bottle.throw();
    }
  }

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

  handleJumpOnEnemy(enemy) {
    console.log("if ausgeführt");
    if (enemy instanceof miniChicken) {
        this.jumpSound.play();
        enemy.updateImage(
            "./img/3_enemies_chicken/chicken_small/2_dead/dead.png"
        );
        enemy.removeChicken();
    } else if (enemy instanceof LowEnemy) {
        console.log("LowEnemy branch executed");
        enemy.updateImage(
            "./img/3_enemies_chicken/chicken_normal/2_dead/dead.png"
        );
        enemy.removeChicken();
    }
}


  playerIsAboveGround() {
    return this.character.isAboveGround();
  }

  checkCollect() {
    this.level.coin.forEach((coin) => {
      if (coin.isCollectedBy(this.character) && this.character.coin < 100) {
        this.character.coinCollect();
        this.coinbar.earnCoin(this.character.coin);
        this.coinMusic.play();
        let i = this.level.coin.indexOf(coin);
        if (i !== 1) {
          this.level.coin.splice(i, 1);
        }
      }
    });
  }

  checkBottleCollect() {
    this.level.bottle.forEach((bottle) => {
      if (bottle.isCollectedBy(this.character) && this.character.bottle < 100) {
        this.character.bottleCollect();
        this.bottlebar.earnBottle(this.character.bottle);
        console.log("bla" + this.character.bottle);
        let index = this.level.bottle.indexOf(bottle);
        if (index !== 1) {
          this.level.bottle.splice(index, 1);
        }
      }
    });
  }

  checkHealth() {
    if (this.character.energy <= 0) {
      gameOverScreen();
    } else return;
  }

  removeObject(objectToRemove) {
    let i = this.throwableObject.indexOf(objectToRemove);
    if (i !== -1) {
      this.throwableObject.splice(i, 1);
    }
  }

  setWorld() {
    this.character.world = this;
  }

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

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(moveableObject) {
    if (moveableObject.otherDirection) {
      this.flipImage(moveableObject);
    }
    moveableObject.draw(this.ctx);
    moveableObject.drawFrame(this.ctx);
    if (moveableObject.otherDirection) {
      this.flipImageBack(moveableObject);
    }
  }

  flipImage(moveableObject) {
    this.ctx.save();
    this.ctx.translate(moveableObject.width, 0);
    this.ctx.scale(-1, 1);
    moveableObject.x = moveableObject.x * -1;
  }

  flipImageBack(moveableObject) {
    moveableObject.x = moveableObject.x * -1;
    this.ctx.restore();
  }
}
