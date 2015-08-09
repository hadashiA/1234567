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

function drawPoint(p, x, y, noiseFactor) {
  const len = 10 * noiseFactor;
  p.rect(x, y, len, len);
}

function sketch(p) {
  window.p = p;

  const h = 300;
  const w = 300;
  
  p.setup = () => {
    p.size(w, h);
    p.smooth();
    p.background(255);
    const xStart = p.random(10);
    let xNoise = xStart;
    let yNoise = p.random(10);

    for (let y = 0; y <= h; y += 5) {
      yNoise += 0.1;
      
      xNoise = xStart;
      for (let x = 0; x <= w; x += 5) {
        xNoise += 0.1;

        drawPoint(p, x, y, p.noise(xNoise, yNoise));
      }
    }
  };
  
  p.draw = () => {
  };
}
