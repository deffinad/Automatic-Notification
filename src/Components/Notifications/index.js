import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { onMessageListener } from "../../Services/firebase";
import Logo from "../../assets/img/logo.png";
import { Button } from "../Button";
import { updateStatus } from "../../Services/api";
import { useUser } from "../../Pages/Login/session";

const Notification = () => {
  const { user } = useUser();
  const [notification, setNotification] = useState({
    title: "",
    body: "",
    route: "",
  });

  const clickNotification = () => {
    updateStatus(user.email, notification).then((response) => {
      window.location.href = `${notification.route}`
    }).catch(err => {
      console.log(err)
    })
  }

  const notify = () => toast.custom(() => <ToastDisplay />);

  function ToastDisplay() {
    return (
      <div className="mt-10">
        <div className="relative rounded-lg z-0 w-96 h-64 border-4 border-white shadow-lg"></div>

        <div className="relative rounded-lg -mt-64 -rotate-6 z-10 w-96 h-64 bg-white shadow-lg"></div>

        <div className="relative flex flex-col items-center justify-center -mt-64 rounded-lg z-20 w-96 h-64">
          <img src={Logo} className="w-36" />
          <p className="text-gray-600 font-bold text-xl mt-4">
            {notification.title}
          </p>
          <p className="text-gray-600">{notification.body}</p>

          <div className="flex flex-row gap-2">
            <Button
              name="Detail"
              style="w-20 border-4 border-indigo-700 bg-indigo-700 hover:border-indigo-800 hover:bg-indigo-800"
              textStyle="text-white"
              click={clickNotification}
            />
            <Button
              name="Cancel"
              style="w-20 border-4 border-indigo-700 hover:border-indigo-800"
              textStyle="text-indigo-700 hover:text-indigo-800"
              click={() => toast.dismiss()}
            />
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification]);

  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload?.data?.title,
        body: payload?.data?.body,
        route: payload?.data?.click_action,
      });
      console.log(payload)
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <Toaster
      reverseOrder={false}
      toastOptions={{
        // Define default options
        className: "",
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
        },
      }}
    />
  );
};

export default Notification;
