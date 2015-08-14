'use strict';

// import Rx from 'rx';
import 'processing-js';
import world from './lib/world';
import CellMatrix from './lib/cell-matrix';

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

  const cellSize = 10;
  const cols = Math.floor(world.w / cellSize);
  const rows = Math.floor(world.h / cellSize);
  let cellMatrix = new CellMatrix(cols, rows, cellSize);
  
  p.setup = () => {
    p.size(world.w, world.h, p.OPENGL);
    p.smooth();
    p.frameRate(24);
  };
  
  p.draw = () => {
    p.background(255);

    cellMatrix.nextTick();
    cellMatrix.draw(p);
  };
}
