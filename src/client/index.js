'use strict';

// import Rx from 'rx';
import 'processing-js';
import ca from './sketches/ca';

(function(callback) {
  if (document.readyState != 'loading'){
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
})(function() {
  const name = location.pathname.split('/')[1];
  let sketch = function(){};

  switch (name) {
  case 'ca':
    sketch = ca;
    break;
  }
  window.processing = new Processing('stage', sketch);
});
