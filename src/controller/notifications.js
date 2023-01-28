const sendNotificationToClient = require("../notify");
const ModelNotification = require("../model/modelNotification");
const ModelAuth = require("../model/modelAuth");
const e = require("express");

const notificationModel = new ModelNotification();

const getMessageByEmail = async (req, res) => {
  const { name, email, type } = req.params;
  try {
    const result = await notificationModel.getDataByEmail(name, email, type);
    if (result.length === 0) {
      res.status(404).json({
        status: 404,
        messages: "Data Tidak Ditemukan",
      });
    } else {
      res.status(200).json({
        status: 200,
        messages: "Data Ditemukan",
        data: result,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      messages: "Server tidak memahami sintak permintaan dari klien",
    });
  }
};

const addNotification = async (req, res) => {
  const data = req.body;
  try {
    notificationModel
      .checkToken(data.appName, data.to)
      .then((tokens) => {
        const notificationData = {
          title: data.title,
          body: data.body,
          route: data.route,
        };

        if (tokens.length === 0) {
          res.status(401).json({
            status: 401,
            messages: "Permintaan memerlukan otentikasi",
          });
        } else {
          notificationModel.postData(data);
          sendNotificationToClient(tokens, notificationData)
            .then((messages) => {
              res.status(200).json({
                status: 200,
                messages:
                  "Pengiriman Notifikasi: " +
                  `${messages.successCount} Berhasil`,
              });
            })
            .catch((err) => {
              res.status(404).json({
                status: 404,
                messages: "Kesalahan dalam pengiriman pesan " + err,
              });
            });
        }
      })
      .catch((error) => {
        res.status(400).json({
          status: 400,
          messages: "Kesalahan mendapatkan token " + error,
        });
      });
  } catch (err) {
    res.status(400).json({
      status: 400,
      messages: "Server tidak memahami sintak permintaan dari klien " + err,
    });
  }
};

const updateToken = async (req, res) => {
  const email = req.params.email;
  try {
    const result = await notificationModel.updateToken(email, req.body);
    res.status(200).json({
      status: 200,
      messages: result,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      messages: "Server tidak memahami sintak permintaan dari klien",
    });
  }
};

const updateStatus = async (req, res) => {
  const { email } = req.params;
  try {
    const result = await notificationModel.updateStatus(email, req.body);
    res.status(200).json({
      status: 200,
      messages: result,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      messages: "Server tidak memahami sintak permintaan dari klien " + err,
    });
  }
};

module.exports = {
  getMessageByEmail,
  addNotification,
  updateToken,
  updateStatus,
};
