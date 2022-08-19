import Basket from "./basket";
import Rocket from "./rocket";
import Egg from "./egg";
import Mobile from "./mobile";

export default class Game {
    constructor(canvas) {
        this.canvas=canvas;
        this.context = canvas.getContext('2d');
        this.request = null;
        this.basket = new Basket(this. canvas.width/2,this.canvas.height/2)
        this.eggs = [];
        this.rockets= [];
        this.score =0;
        this.infinit = -1;
        this.interval;
        this.infinitegg =  Math.floor(Math.random() * 3);     
        this.life = 3;
    }
    infinityEgg(){
      
      if(this.infinitegg ===0) {this.interval = clearInterval(this.interval);}
      else {this.interval = setInterval(() => {this.addEgg()}, 1000);}

      
    }
     infinityRocket() {
       this.infinit = -this.infinit;
       if (this.infinit === 1) {this.interval = setInterval(() => {this.addRocket()}, 1000);}
       else {this.interval = clearInterval(this.interval);}
     }

     addEgg() {
       let x = Math.floor(Math.random()*(this.canvas.width - Mobile.MOBILE_WIDTH));
       this.eggs.push(new Egg(x,0));
     }

     addRocket() {
       let y = Math.floor(Math.random()*(this.canvas.height - Mobile.MOBILE_HEIGHT));
       this.rockets.push(new Rocket(0,y));
     }

    moveAndDraw() {
      if (this.life ===0 ) {
        
        alert("Perdu !")
      }
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.basket.draw(this.context);
        this.moveAndDrawEgg();
        this.moveAndDrawRockets();
        this.deleteRocket();
        
        this.rockets = this.rockets.filter(rocket => rocket.deleted !== true);
        this.eggs = this.eggs.filter(egg => egg.deleted !== true);
        this.basket.move(this.canvas);
        this.request = window.requestAnimationFrame(() => {this.moveAndDraw()});
        
    }
    

    moveAndDrawRockets() {
      
        let del = [];
        del[0] = null;
        this.rockets.forEach((rocket, i) => {
          rocket.move(this.canvas);
          this.eggs.forEach((egg) => {  
            if (egg.collisionWith(rocket)) {del[0] = i;}
          });
          rocket.draw(this.context);
        });
        
        if (del[0] !== null) {
          delete this.eggs[del[0]];
        }
      

    }

    deleteRocket(){
      let del =[];
      del[0] = null;
      this.rockets.forEach((rocket, i) => {
        if (rocket.collisionWith(this.basket)) {
          del[0] = i;
        }
      });
      
      if (del[0] !== null) {
        delete this.rockets[del[0]];
        this.addScore(-500);
        document.getElementById("life-"+this.life).style.display='none';
        this.life -=1;
        if (this.life ===0) {
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
      }
    }
     
  
   
    
 
    moveAndDrawEgg() {
      let del = [];
      del[0] = null;
      this.eggs.forEach((egg, i) => {
        egg.move(this.canvas);
        if (egg.collisionWith(this.basket)) {del[0] = i;}
        egg.draw(this.context);
      });
      
      if (del[0] !== null) {
        delete this.eggs[del[0]];
        this.addScore();
      }

    }
    
    addScore(added = 100) {
      this.score += added;
      document.getElementById("score").textContent = this.score;
    }

  

    startAndStop() {
        if(this.request === null){
          this.request = window.requestAnimationFrame(() => {this.moveAndDraw()});
        }
    
        else{
          window.cancelAnimationFrame(this.request);
          this.request = null;
        }
        document.getElementById("stopAndStartGame").blur();
    }


    keyDownActionHandler(event) {
        switch (event.key) {
          case "ArrowUp":
          case "Up":
            this.basket.moveUp();
            break;
          case "ArrowDown":
          case "Down":
            this.basket.moveDown();
            break;
          case "ArrowLeft":
          case "Left":
            this.basket.moveLeft();
            break;
          case "ArrowRight":
          case "Right":
            this.basket.moveRight();
            break;
          default: return;
       }
       event.preventDefault();
      }
    
      keyUpActionHandler(event) {
        switch (event.key) {
            case "ArrowUp":
            case "Up":
                if (!this.basket.getDown()) {this.basket.stopMoving();}
                break;
            case "ArrowDown":
            case "Down":
                if (!this.basket.getUp()) {this.basket.stopMoving();}
                break;
            case "ArrowLeft":
            case "Left":
                if (this.basket.getLeft()) {this.basket.stopMoving();}
                break;
            case "ArrowRight":
            case "Right":
                if (this.basket.getRight()) {this.basket.stopMoving();}
                break;
            default: return;
        }
        event.preventDefault();
      }

}



