class Endbosshp extends DrawableObject {

    IMAGES_ENDBOSS_HP_BAR = [
        "./img/7_statusbars/2_statusbar_endboss/green.png",
        "./img/7_statusbars/2_statusbar_endboss/blue.png"
    ]

    constructor(){
        super();
        this.loadImages(this.IMAGES_ENDBOSS_HP_BAR);
        this.setPercentage(100);
        this.x = 460;
        this.y = 1;
        this.height = 75;
        this.width = 250;
    }

    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMAGES_ENDBOSS_HP_BAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(){
        if (this.percentage == 100) {
            return 0
        } else if (this.percentage > 80) {
            return 1
        } else if (this.percentage > 60){
            return 0
        } else if (this.percentage > 40){
            return 1
        } else if (this.percentage > 20){
            return 0 
        }else {
            return 1
        }
    }
}