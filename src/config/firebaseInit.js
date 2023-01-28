var admin = require("firebase-admin");

var serviceAccount = require("./automatic-notification-ac140-firebase-adminsdk-g75xz-990baa45a5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();
var messaging = admin.messaging();
var timestamp = admin.firestore.Timestamp

module.exports = { db, messaging, timestamp };
