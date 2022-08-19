import Mobile from "./mobile";
import  EggImgSrc from './assets/images/blue-egg64.png';
export default class Egg extends Mobile{

    // static EGG_HEIGHT = 36;
    // static EGG_WIDTH = 48;
    constructor(x,y,src=EggImgSrc,deltaX=0,deltaY=4){
        super(x,y,src,deltaX,deltaY);
        this.deleted = false;
    }

   


    move(canvas) {
        this.y = Math.max(0, this.y + this.deltaY);
        if (this.y > this.width) {this.deleted = true;}
    }

    

}