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

function sketch(p) {
  let w = 500;
  let h = 500;
  let diam = 10;
  let cx = w * 0.5;
  let cy = h * 0.5;

  p.setup = () => {
    p.frameRate(24);
    p.size(w, h);
    p.smooth();
    p.background(230);
  };

  p.draw = () => {
    if (diam <= 400) {
      p.background(180);
      p.ellipse(cx, cy, diam, diam);;
      diam += 10;
    }
  };
}

