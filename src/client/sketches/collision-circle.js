import Circle from '../lib/circle';
import world from '../lib/world';
import Color from '../lib/color';

export default function sketch(p) {
  let circles = [];
  for (let i = 0; i < 4; i++) {
    let x = p.random(world.w);
    let y = p.random(world.h);
    let r = p.random(100) + 10;
    let circle = new Circle(r, x, y);

    circle.moveX       = p.random(10) - 5;
    circle.moveY       = p.random(10) - 5;
    circle.strokeColor = new Color(p.random(255), p.random(255), p.random(255));
    // circle.fillColor   = new Color(p.random(255), p.random(255), p.random(255));
    circle.alpha       = p.random(255);
    circles.push(circle);
  }
  
  p.setup = () => {
    p.size(world.w, world.h, p.OPENGL);
    p.smooth();
    p.frameRate(24);
  };
  
  p.draw = () => {
    p.background(255);

    for (let circle of circles) {
      for (let otherCircle of circles) {
        if (otherCircle === circle) {
          continue;
        }

        const distanceSquare =  Math.pow(otherCircle.x - circle.x, 2) + Math.pow(otherCircle.y - circle.y, 2);
        const distance = Math.pow(distanceSquare, 0.5);
        const overlap = distance - circle.r - otherCircle.r;
        
        if (overlap < 0) {
          const midX = (circle.x + otherCircle.x) * 0.5;
          const midY = (circle.x + otherCircle.y) * 0.5;

          p.stroke(0);
          p.fill(0);
          // p.noFill();
          // p.ellipse(midX, midY, -overlap, -overlap);
          p.textSize(-overlap);
          p.text('よさそう', midX, midY);
        }
      }

      circle.update();
      circle.draw(p);
    }
  };
}
