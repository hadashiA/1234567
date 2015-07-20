'use strict';

// import Rx from 'rx';
import 'processing-js';

(function(callback) {
  if (document.readyState != 'loading'){
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
})(function() {
  window.processing = new Processing('stage', sketch);
});

function customRandom(p) {
  return 1 - p.pow(p.random(1), 2);
};


function sketch(p) {
  window.p = p;
  
  let w = 500;
  let h = 500;
  let diam = 10;
  let cx = w * 0.5;
  let cy = h * 0.5;

  let radius = 100;

  p.setup = () => {
    p.frameRate(24);
    p.size(w, h);
    p.smooth();
    p.background(255);

    p.stroke(0, 30);
    p.strokeWeight(0.5);
    p.noFill();
    p.ellipse(cx, cy, radius * 2, radius * 2);

    p.stroke(20, 50, 70);

    // let r2 = 10;
    let radiusNoise = p.random(10);
    let lastX, lastY;
    for (let angle = 0; angle <= 1440; angle += 5) {
      // radiusNoise += 0.05;
      let r2 = radius + (p.noise(radiusNoise + angle) * 200) - 100;

      let rad = p.radians(angle);
      let x = cx + p.cos(rad) * r2;
      let y = cy + p.sin(rad) * r2;
      if (lastX && lastY) {
        p.line(x, y, lastX, lastY);
      }
      lastX = x;
      lastY = y;
      r2 += 0.5;
    }
  };

  p.draw = () => {
  };
}

