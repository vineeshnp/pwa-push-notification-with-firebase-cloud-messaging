'use strict';

//Checking if browser supports serviceWorker
if ('serviceWorker' in navigator) {
  console.log('Service Worker is supported on this browser');

  navigator.serviceWorker.register('sw.js').then(function() {
    return navigator.serviceWorker.ready;
  }).then(function(reg) {
    console.log('Service Worker is ready to go!', reg);
    reg.pushManager.subscribe(
      {
        userVisibleOnly: true
      }
    ).then(function(sub) {
      console.log(JSON.stringify(sub));
    });
  }).catch(function(error) {
    console.log('Service Worker failed to boot', error);
  });
}
