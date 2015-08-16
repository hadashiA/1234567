'use strict';

import 'processing-js';
import sketches from './lib/sketches';

(function(callback) {
  if (document.readyState != 'loading'){
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
})(function() {
  const sketch = sketches[location.pathname.split('/')[1]];
  if (sketch) {
    let canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    window.processing = new Processing(canvas, sketch);

  } else {
    for (let name of Object.keys(sketches)) {
      let canvas = document.createElement('canvas');
      document.body.appendChild(canvas);
      let processing = new Processing(canvas, sketches[name]);

      setTimeout(() => {
        processing.noLoop();
      }, 100);

      canvas.addEventListener('mouseenter', (e) => {
        processing.loop();
      }, false);

      canvas.addEventListener('mouseleave', (e) => {
        processing.noLoop();
      }, false);
    }
  }
});
