// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");
importScripts("localforage.min.js");

self.addEventListener("notificationclick", (event) => {
  console.log(event);
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === "/" && "focus" in client) return client.focus();
        }
        if (clients.openWindow)
          localforage.getItem("email").then((value) => {
            fetch(
              "https://tatasurat-notification-server.herokuapp.com/v1/updateStatus/" +
                value,
              {
                method: "PUT",
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  Accept: "*/*",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  appName: "TataSurat",
                  title: event.notification.title,
                  body: event.notification.body,
                  route: event.notification.data.url,
                }),
              }
            )
              .catch((error) => {
                console.error(error);
              });
          });
        return clients.openWindow(event.notification.data.url);
      })
  );
});

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDyZ_mfNwUg04WOB_Mx31_WPid68L5zCxE",
  authDomain: "automatic-notification-ac140.firebaseapp.com",
  projectId: "automatic-notification-ac140",
  storageBucket: "automatic-notification-ac140.appspot.com",
  messagingSenderId: "480772017633",
  appId: "1:480772017633:web:f2919b8e442f0a106cd6a0",
  measurementId: "G-5LQSKNYK3M",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "../logo.png",
    data: {
      url: payload.data.click_action,
    },
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
