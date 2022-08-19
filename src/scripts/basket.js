import Mobile from "./mobile";
import MoveState from "./movestate";
import basketImgSrc from './assets/images/basket128.png';
import Egg from "./egg";

export default class Basket extends Mobile {
    constructor(x,y,src = basketImgSrc,deltaX,deltaY){
        super(x,y,src,deltaX,deltaY);
        this.moving = MoveState.NONE;
        this.eggs = [];
    }

    

    getUp() {
        return this.moving === MoveState.UP;
    }
    
    getDown() {
        return this.moving === MoveState.DOWN;
    }

    getRight() {
        return this.moving === MoveState.RIGHT;
    }

    getLeft(){
        return this.moving === MoveState.LEFT;
    }
    
    moveUp() {
        this.deltaY = -10;
        this.moving = MoveState.UP;
    }
    
    moveDown() {
        this.deltaY = 10;
        this.moving = MoveState.DOWN;
    }

    moveLeft(){
        this.deltaX = -10;
        this.moving = MoveState.LEFT;
    }

    moveRight(){
        this.deltaX = 10;
        this.moving = MoveState.RIGHT;
    }
    stopMoving() {
        this.moving = MoveState.NONE;
        
    }

    move(canvas) {
        if (this.getUp()) {
          this.y = Math.max(0, this.y + this.deltaY);
        }
        if (this.getDown()) {
          this.y = Math.min(canvas.height - this.image.height, this.y + this.deltaY);
        }
        if (this.getLeft()) {
            this.x = Math.max(0, this.x + this.deltaX);
        }
        if (this.getRight()) {
            this.x = Math.min(canvas.width - this.image.width, this.x + this.deltaX);
        }
    }
    

    
}   