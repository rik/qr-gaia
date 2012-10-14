'use strict';

window.addEventListener('load', function installLoad(evt) {
  function install() {
    var manifestUrl = window.location + '/manifest.webapp';
    var request = window.navigator.mozApps.install(manifestUrl);
    request.onsuccess = function() {
      var appRecord = this.result;
      window.alert('Installation successful!');
    };
    request.onerror = function() {
      // Display the error information from the DOMError object
      log('Install failed, error: ' + this.error.name);
    };
  }

  var request = navigator.mozApps.getSelf();
  request.onsuccess = function() {
    if (request.result) {
      // we're installed, nothing to do
    } else {
      var button = document.getElementById('install-app');
      button.addEventListener('click', install);
      button.hidden = false;
    }
  };
  request.onerror = function() {
    log('Error checking installation status: ' + this.error.message);
  };
});
