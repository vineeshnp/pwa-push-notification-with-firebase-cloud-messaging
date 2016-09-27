'use strict';

console.log('Service Worker Started', self);

self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Service Worker Installed', event);
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker Activated', event);
});

self.addEventListener('push', function(event) {
  console.log('Service Worker recived a push message', event.data.text());

  var title = 'Click to open push message';
  event.waitUntil(
    self.registration.showNotification(title, {
      'body': event.data.text(),
      'icon': 'images/icon.png'
    }));
});

self.addEventListener('notificationclick', function(event) {
  console.log('Notification click: tag', event.notification.tag);
  event.notification.close();
  var url = 'http://www.vineeshnp.com';
  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
    .then(function(windowClients) {
      console.log('WindowClients', windowClients);
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        console.log('WindowClient', client);
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
