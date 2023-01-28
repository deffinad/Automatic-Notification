const { v4: uuidv4 } = require("uuid");

const ModelAuth = require("../model/modelAuth");

const authModel = new ModelAuth();

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkEmail = await authModel.cekEmail(email);
    const result = await authModel.login(email, password);
    const token = uuidv4();

    if (checkEmail) {
      if (result.isTrue) {
        res.status(200).json({
          status: 200,
          messages: "Data Ditemukan",
          result,
          token: token,
        });
      } else {
        res.status(403).json({
          status: 403,
          messages: "Password Tidak Sama",
          result,
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        messages: "Email Tidak Ditemukan",
        result,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      messages:
        "Server tidak memahami sintak permintaan dari klien",
    });
  }
};



module.exports = {login};
