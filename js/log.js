'use strict';

function log(msg) {
  console.log(msg);
  var p = document.createElement('p');
  p.appendChild(document.createTextNode('LOG: ' + msg));
  document.getElementById('log').appendChild(p);
}
