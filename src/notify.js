var { messaging } = require("./config/firebaseInit");

const sendNotificationToClient = (tokens, data) => {
  return new Promise((resolve, reject) => {
    messaging
      .sendMulticast({
        tokens:tokens,
        data:{
          title: data.title,
          body: data.body,
          click_action: data.route
        },
        android: {
          priority: 'high'
        },
        apns: {
          payload: {
            aps: {
              contentAvailable: true
            }
          }
        }
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = sendNotificationToClient;
