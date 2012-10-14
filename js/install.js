'use strict';

(function() {
var request = navigator.mozApps.getSelf();
request.onsuccess = function() {
  if (request.result) {
    // we're installed
  } else {
    var manifestUrl = 'http://localhost:8001/manifest.webapp';
    request = window.navigator.mozApps.install(manifestUrl);
    request.onsuccess = function() {
      // Save the App object that is returned
      var appRecord = this.result;
      window.alert('Installation successful!');
    };
    request.onerror = function() {
      // Display the error information from the DOMError object
      window.alert('Install failed, error: ' + this.error.name);
    };
  }
};
request.onerror = function() {
  window.alert('Error checking installation status: ' + this.error.message);
};
})();
