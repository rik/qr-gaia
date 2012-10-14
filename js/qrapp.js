'use strict';

var QRReader = {
  pick: function qrreader_pick(e) {
    var activity = new MozActivity({
      name: 'pick',
      data: {type: 'image/jpeg'}
    });
    activity.onsuccess = (function onSuccess() {
      this.reopenSelf();
      if (!activity.result.url)
        return;
      qrcode.decode(activity.result.url);
    }).bind(this);
    activity.onerror = (function onError() {
      this.reopenSelf();
      // Don't know how the activity can fail
      log('pick failed!');
    }).bind(this);
  },

  handleData: function qrreader_handleData(data) {
    log('handleData ' + data);
    if (data.startsWith('http')) {
      log('HTTP !');
      // XXX : Browser does not handle this activity properly :(
      // Should take a look at browser.js#handleActivity
      this.confirmActivity({
        name: 'view',
        data: { type: 'url', url: data }
      });
    } else if (data.startsWith('TEL:')) {
      var number = data.substr(4);
      log('TEL -> ' + number)
      new MozActivity({
        name: 'dial',
        data: {type: 'webtelephony/number', number: number}
      });
    } else if (data.startsWith('MAILTO:')) {
      new MozActivity({
        name: 'new',
        data: {type: 'mail', URI: data}
      });
    } else {
      this.confirmUnknownData(data);
      log('unknown data');
    }
  },

  confirmActivity: function qrreader_confirmActivity(activity) {
    var dialog = document.getElementById('confirm-url');
    var url_placeholder = document.getElementById('url-placeholder');
    url_placeholder.innerHTML = "";
    url_placeholder.appendChild(document.createTextNode(activity.data.url));
    dialog.hidden = false;
    dialog.onsubmit = function yup() {
      new MozActivity(activity);
      dialog.hidden = true;
      return false;
    };
    dialog.onreset = function cancel() {
      dialog.hidden = true;
      return false;
    };
  },

  confirmUnknownData: function qrreader_confirmUnknownData(data) {
    var dialog = document.getElementById('unknown-data');
    var data_placeholder = document.getElementById('data-placeholder');
    data_placeholder.innerHTML = "";
    data_placeholder.appendChild(document.createTextNode(data));
    dialog.hidden = false;
    dialog.onsubmit = function yup() {
      dialog.hidden = true;
      return false;
    };
  },

  // Copied from wallpaper.js because after selecting an image, we don't get the focus
  // Crashes the galery app sometimes
  // Doesn't work inside the browser
  reopenSelf: function qrreader_reopenSelf() {
    navigator.mozApps.getSelf().onsuccess = function getSelfCB(evt) {
      var app = this.result;
      if (app) {
        app.launch();
      }
    };
  },


  init: function qrreader_init() {
    var picker = document.getElementById('picker');
    picker.addEventListener('click', this.pick.bind(this));

    qrcode.callback = function(data) {
      log(data);
    };
    qrcode.callback = this.handleData.bind(this);
  }
};

window.addEventListener('load', function qrLoad(evt) {
  QRReader.init();
});
