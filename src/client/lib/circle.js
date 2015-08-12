import world from './world';

export default class Circle {
  constructor(r, x, y) {
    this.r           = r;
    this.x           = x;
    this.y           = y;
    this.strokeColor = null;
    this.fillColor   = null;
    this.alpha       = 0;
    this.moveX       = 0;
    this.moveY       = 0;
  }

  update() {
    this.x += this.moveX;
    this.y += this.moveY;

    let r = this.r;
    if (this.x > world.w + r) {
      this.x = -r;
    }
    if (this.x < -r) {
      this.x = world.w + r;
    }
    if (this.y > world.h + r) {
      this.y = -r;
    }
    if (this.y < -r) {
      this.y = world.h + r;
    }
  }

  draw(processing) {
    if (this.strokeColor) {
      let {r, g, b} = this.strokeColor;
      processing.stroke(r, g, b, this.alpha);
    } else {
      processing.noStroke();
    }

    if (this.fillColor) {
      let {r, g, b} = this.fillColor;
      processing.fill(r, g, b, this.alpha);
    } else {
      processing.noFill();
    }

    processing.ellipse(this.x, this.y, this.r, this.r);
    // processing.textSize(24);
    // processing.text('よさそう', this.x, this.y);
  }

  contactFor(circle) {
    if (this === circle) {
      return false;
    }
    let distanceSquare = Math.pow(circle.x - this.x, 2) + Math.pow(circle.y - this.y, 2);
    return distanceSquare <= Math.pow(this.r, 2);
  }
};

