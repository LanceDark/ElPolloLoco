class BottleBar extends DrawableObject {
    IMAGES_BOTTLE = [
        "./img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
        "./img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
        "./img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
        "./img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
        "./img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
        "./img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png"
    ];

    constructor(){
        super().loadImage('./img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 10;
        this.y = 105;
        this.height = 70;
        this.width = 250;
    }

    earnBottle(percentage){
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(){
        if (this.percentage === 100) {
            return 5
        } else if (this.percentage >=80) {
            return 4
        } else if (this.percentage >= 60){
            return 3
        } else if (this.percentage >= 40){
            return 2
        } else if (this.percentage >= 20){
            return 1 
        } 
        return 0 ;


    }
}
