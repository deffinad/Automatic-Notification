import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { updateToken } from "./api";
import {detectMob} from '../Pages/Login/session'

const firebaseConfig = {
  apiKey: "AIzaSyDyZ_mfNwUg04WOB_Mx31_WPid68L5zCxE",
  authDomain: "automatic-notification-ac140.firebaseapp.com",
  projectId: "automatic-notification-ac140",
  storageBucket: "automatic-notification-ac140.appspot.com",
  messagingSenderId: "480772017633",
  appId: "1:480772017633:web:f2919b8e442f0a106cd6a0",
  measurementId: "G-5LQSKNYK3M",
};

initializeApp(firebaseConfig);
const messaging = getMessaging();

export const requestForToken = (email, role) => {
  return getToken(messaging, {
    vapidKey:
      "BAiIWRgciTkrT5W73OOhB7IRANiD0l2axO_CkoHsOj-QL6LQ7h1yNhzkC-u8IrjXAD5OR30it-IGvG9RZss1gAQ",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("Token : " + currentToken);
        const check = detectMob();

        updateToken(email, currentToken, check, role)
          .then((response) => {
            console.log(response.messages);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

