var express = require("express");
var bodyParser = require("body-parser");
const {
  updateToken,
  getMessageByEmail,
  addNotification,
  updateStatus,
} = require("../controller/notifications");
const { login } = require("../controller/auth");
const cors = require("cors");
const {
  addSuratMasuk,
  getSuratMasuk,
  getSuratMasukById,
  getSuratKeluar,
  getSuratKeluarById,
  addSuratKeluar,
} = require("../controller/surat");

var router = express.Router();
router.use(bodyParser.json());

const corsOptions = {
  origin: "https://tatasurat-notification-client.herokuapp.com",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

router.use(cors(corsOptions));

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

/* GET home page. */
router.get("/", function (req, res, next) {
  return res
    .status(200)
    .json({ message: "Welcome to Express API Automatic Notification" });
});

router.post("/users", login);
//CRUD SURAT MASUK
router.get("/suratmasukby/:pengirim", getSuratMasuk);
router.get("/suratmasuk/:id", getSuratMasukById);
router.post("/suratmasuk", addSuratMasuk);
//CRUD SURAT KELUAR
router.get("/suratkeluar", getSuratKeluar);
router.get("/suratkeluar/:id", getSuratKeluarById);
router.post("/suratkeluar", addSuratKeluar);

router.put("/updateToken/:email", updateToken);
router.put("/updateStatus/:email", updateStatus);
router.get("/messages/:name/:email/:type", getMessageByEmail);
router.post("/messages", addNotification);
module.exports = router;
