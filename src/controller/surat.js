const ModelSurat = require("../model/modelSurat");
const ModelAuth = require("../model/modelAuth");
const { addMessage } = require("./notifications");

const suratModel = new ModelSurat();
const authModel = new ModelAuth();

const getSuratMasuk = async (req, res) => {
  try {
    const result = await suratModel.getDataSurat("surat masuk");
    const data = [...result];

    if (req.params.pengirim !== "admin") {
      data.splice(0, data.length);
      result.map((value) => {
        if (value.pengirim === req.params.pengirim) {
          data.push(value);
        }
      });
    }

    if (data.length === 0) {
      res.status(404).json({
        status: 404,
        messages: "Data tidak ditemukan",
      });
    } else {
      res.status(200).json({
        status: 200,
        messages: "Data ditemukan",
        data: data,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      messages: "Server tidak memahami sintaks permintaan dari klien",
    });
  }
};

const getSuratMasukById = async (req, res) => {
  try {
    const result = await suratModel.getDataSuratById(
      "surat masuk",
      req.params.id
    );
    if (result.length === 0) {
      res.status(404).json({
        status: 404,
        messages: "Data tidak ditemukan",
      });
    } else {
      res.status(200).json({
        status: 200,
        messages: "Data ditemukan",
        data: result,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      messages: "Server tidak memahami sintaks permintaan dari klien",
    });
  }
};

const addSuratMasuk = async (req, res) => {
  try {
    const checkEmail = await authModel.cekEmail(req.body.pengirim);
    if (checkEmail) {
      await suratModel.postDataSuratMasuk("surat masuk", req.body);
      res.status(200).json({
        status: 20,
        messages: "Data pengajuan berhasil ditambahkan",
      });
    } else {
      res.status(404).json({
        status: 404,
        messages: "Email tidak terdaftar",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      messages: "Server tidak memahami sintak permintaan dari klien",
    });
  }
};

//SURAT KELUAR
const getSuratKeluar = async (req, res) => {
  try {
    const result = await suratModel.getDataSurat("surat keluar");
    if (result.length === 0) {
      res.status(404).json({
        status: 404,
        messages: "Data tidak ditemukan",
      });
    } else {
      res.status(200).json({
        status: 200,
        messages: "Data ditemukan",
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

const getSuratKeluarById = async (req, res) => {
  try {
    const result = await suratModel.getDataSuratById(
      "surat keluar",
      req.params.id
    );
    if (result.length === 0) {
      res.status(404).json({
        status: 404,
        messages: "Data tidak ditemukan",
      });
    } else {
      res.status(200).json({
        status: 200,
        messages: "Data ditemukan",
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

const addSuratKeluar = async (req, res) => {
  try {
    const checkEmail = await authModel.cekEmail(req.body.pengirim);
    if (checkEmail) {
      const result = await suratModel.postDataSuratKeluar(
        "surat keluar",
        req.body
      );
      res.status(200).json({
        status: 200,
        messages: "Data surat keluar berhasil ditambahkan",
      });
    } else {
      res.status(404).json({
        status: 404,
        messages: "Email tidak terdaftar",
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

module.exports = {
  addSuratMasuk,
  getSuratMasuk,
  getSuratMasukById,
  addSuratKeluar,
  getSuratKeluar,
  getSuratKeluarById,
};
