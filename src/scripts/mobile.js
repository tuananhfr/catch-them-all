
export default class Mobile {



  static MOBILE_HEIGHT = 36;
  static MOBILE_WIDTH = 48;

    constructor(x, y, src, deltaX = 0, deltaY = 0){
      this.x = x;
      this.y = y;
      this.src = src;
      this.image = this.createImage();
      this.deltaX = deltaX;
      this.deltaY = deltaY;
      
    }
  
    createImage() {
      const img = new Image();
      img.src = this.src;
      return img;
    }
  
    draw(context) {
      context.drawImage(this.image, this.x, this.y);
    }
  
    move(canvas) {
      this.x += this.deltaX;
      this.y += this.deltaY;
    }
    
    collisionWith(egg) {
      let b2x = egg.x + Mobile.MOBILE_WIDTH;
      let b2y = egg.y + Mobile.MOBILE_HEIGHT;
  
      let p1x = Math.max(this.x, egg.x );
      let p1y = Math.max(this.y, egg.y );
  
      let p2x = Math.min(this.x + Mobile.MOBILE_WIDTH, b2x);
      let p2y = Math.min(this.y + Mobile.MOBILE_HEIGHT, b2y);
  
      return ((p1x < p2x) && (p1y < p2y));
  }

  
}
  