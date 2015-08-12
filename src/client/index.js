'use strict';

// import Rx from 'rx';
import 'processing-js';
import Circle from './lib/circle';
import world from './lib/world';
console.log(world);

(function(callback) {
  if (document.readyState != 'loading'){
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
})(function() {
  window.processing = new Processing('stage', sketch);
});

function drawPoint(p, x, y, noiseFactor) {
  const len = 10 * noiseFactor;
  p.rect(x, y, len, len);
}

function sketch(p) {
  window.p = p;

  let circles = [];
  for (let i = 0; i < 10; i++) {
    let x = p.random(world.w);
    let y = p.random(world.h);
    let r = p.random(100) + 10;
    let circle = new Circle(r, x, y);

    circle.moveX       = p.random(10) - 5;
    circle.moveY       = p.random(10) - 5;
    circle.strokeColor = p.color(p.random(255), p.random(255), p.random(255));
    circle.fillColor   = p.color(p.random(255), p.random(255), p.random(255));
    circle.alpha       = p.random(255);
    circles.push(circle);
  }
  
  p.setup = () => {
    p.size(world.w, world.h);
    p.smooth();
    p.frameRate(24);
  };
  
  p.draw = () => {
    p.background(255);

    for (let circle of circles) {
      circle.update();
      circle.draw(p);
    }
  };
}
