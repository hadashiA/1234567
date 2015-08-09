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

  let strokeColorStep = -1;
  let strokeColor = 254;
  
  let angle = -Math.PI * 0.5;
  let angNoise, radiusNoise, xNoise, yNoise;
  
  p.setup = () => {
    p.size(w, h);
    p.smooth();
    p.background(255);
    p.noFill();
    p.strokeWeight(1);

    angNoise    = p.random(10);
    radiusNoise = p.random(10);

    xNoise = p.random(10);
    yNoise = p.random(10);
  };

  p.draw = () => {
    radiusNoise += 0.005;
    let radius = p.noise(radiusNoise) * 550 + 1;

    angNoise += 0.005;
    angle += p.noise(angNoise) * 6 - 3;

    if (angle > 360) {
      angle -= 360;
    }
    if (angle < 0) {
      angle += 360;
    }

    xNoise += 0.01;
    yNoise += 0.01;
    let centerX = w * 0.5 + (p.noise(xNoise) * 100) - 50;
    let centerY = h * 0.5 + (p.noise(yNoise) * 100) - 50;
    let rad = p.radians(angle);
    let x1 = centerX + (radius * p.cos(rad));
    let y1 = centerY + (radius * p.sin(rad));
    let opprad = rad + Math.PI;
    let x2 = centerX + (radius * p.cos(opprad));
    let y2 = centerY + (radius * p.sin(opprad));
    strokeColor += strokeColorStep;
    if (strokeColor > 254) {
      strokeColorStep = -1;
    }
    if (strokeColor < 0) {
      strokeColorStep = +1;
    }

    p.stroke(strokeColor, 60);
    p.line(x1, y1, x2, y2);
  };
}

