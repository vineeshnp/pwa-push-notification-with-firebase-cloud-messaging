const webpush = require('web-push');

// VAPID keys should only be generated only once.
const vapidKeys = webpush.generateVAPIDKeys();

//console.log(vapidKeys)

//remove `{{  }}` when you are providing keys

webpush.setGCMAPIKey('{{your Firebase Cloud messaging key}}');
//Above is obtained from https://console.firebase.google.com/project/push-notification-web-d0beb/settings/cloudmessaging

webpush.setVapidDetails(
  'mailto:{{your mail id}}',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// This is the same output of calling JSON.stringify on a PushSubscription

// TODO the keys are to be obtained yourself and filled out
const pushSubscription = {
  endpoint: 'https://android.googleapis.com/gcm/send/{{client subscription id}}',
  keys: {
    auth: 'zR1............1w==',
    p256dh: 'BGM................................................................U0='
  }
};

console.log(vapidKeys.publicKey)

webpush.sendNotification(pushSubscription, 'The server remembers!')
.then(function(result){
  console.log(result)
}).catch(function(error){
  console.log('error', error)
})
