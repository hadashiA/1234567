'use strict';

import 'processing-js';
import ca from './sketches/ca';
import circle from './sketches/collision-circle';
import yanagi from './sketches/yanagi';

(function(callback) {
  if (document.readyState != 'loading'){
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
})(function() {
  const sketches = {
    ca:     ca,
    circle: circle,
    yanagi: yanagi
  };
  const name = location.pathname.split('/')[1];

  window.processing = new Processing('stage', sketches[name] || function(){});
});
