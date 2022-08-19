import Mobile from "./mobile";
import RocketImgSrc from './assets/images/rocket128.png';
import Egg from "./egg";
export default class Rocket extends Mobile {
    constructor(x,y,src = RocketImgSrc,deltaX=6,deltaY=0){
        super(x,y,src,deltaX,deltaY);
        this.eggs = [];
    }


    move(canvas) {
        this.x = Math.max(0, this.x + this.deltaX);
        if (this.x > canvas.width) {this.deleted = true;}
      }
}