class Cloud extends MoveableObject {
    y = 25;
    width = 500;
    height = 300;
    speed = 0.1;

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 0 + Math.random() * 500;
        this.animation();

    }

    animation() {
        this.moveLeft();
    }
    
}
