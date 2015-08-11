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
  // const len = 10 * noiseFactor;
  // p.rect(x, y, len, len);
  p.pushMatrix();
  p.translate(x, y);
  p.rotate(noiseFactor * p.radians(540));
  
  let edgeSize = noiseFactor * 35;
  let grey     = 150 + noiseFactor * 120;
  let alpha    = 150 + noiseFactor * 120;
  p.noStroke();
  p.fill(grey, alpha);
  p.textSize(24);
  // p.ellipse(0, 0, edgeSize, edgeSize * 0.5);
  p.popMatrix();
}

function sketch(p) {
  window.p = p;

  const h = 300;
  const w = 300;

  let xStart = p.random(10);
  let yStart = p.random(10);
  let xStartNoise = p.random(20);
  let yStartNoise = p.random(20);
  
  p.setup = () => {
    p.size(w, h);
    p.smooth();
    p.background(255);
    p.frameRate(24);
  };
  
  p.draw = () => {
    xStartNoise += 0.01;
    yStartNoise += 0.01;

    xStart += p.noise(xStartNoise) * 0.5 - 0.25;
    yStart += p.noise(yStartNoise) * 0.5 - 0.25;

    let xNoise = xStart;
    let yNoise = yStart;

    p.background(0);

    for (let y = 0; y <= h; y += 5) {
      yNoise += 0.1;
      
      xNoise = xStart;
      for (let x = 0; x <= w; x += 5) {
        xNoise += 0.1;

        drawPoint(p, x, y, p.noise(xNoise, yNoise));
      }
    }
  };
}
