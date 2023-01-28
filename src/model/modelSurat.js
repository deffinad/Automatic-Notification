var { db } = require("../config/firebaseInit");

class ModelSurat {
  async getDataSurat(collection) {
    var allData = [];

    const ref = db.collection(collection);
    const snapshot = await ref.orderBy(collection === 'surat masuk' ? 'idSuratMasuk' : 'idSuratKeluar', 'desc').get();

    snapshot.forEach((hasil) => {
      allData.push(hasil.data());
    });
    return allData;
  }

  async getDataSuratById(collection, id) {
    var allData = [];

    const ref = db.collection(collection);
    const snapshot = await ref.get();

    snapshot.forEach((hasil) => {
      if (collection == "surat masuk") {
        if (hasil.data().idSuratMasuk === id) {
          allData.push(hasil.data());
        }
      } else {
        if (hasil.data().idSuratKeluar === id) {
          allData.push(hasil.data());
        }
      }
    });
    return allData;
  }

  async postDataSuratMasuk(collection, req) {
    db.collection(collection).doc().set({
      idSuratMasuk: req.idSuratMasuk,
      pengirim: req.pengirim,
      tglSurat: req.tglSurat,
      sifatSurat: req.sifatSurat,
      noSurat: req.noSurat,
      perihalSurat: req.perihalSurat,
      fileSurat: req.fileSurat,
      keterangan: req.keterangan,
      tglDiterima: "",
    });
  }

  async postDataSuratKeluar(collection, req) {
    const ref = db.collection("surat masuk");
    const snapshot = await ref.get();

    snapshot.forEach((hasil) => {
      if(hasil.data().idSuratMasuk == req.idSuratMasuk){
        db.collection("surat masuk").doc(hasil.id).update({
          tglDiterima: req.tglSurat
        })
      }
    });

    db.collection(collection).doc().set({
      idSuratKeluar: req.idSuratKeluar,
      idSuratMasuk: req.idSuratMasuk,
      pengirim: req.pengirim,
      tujuan: req.tujuan,
      tglSurat: req.tglSurat,
      sifatSurat: req.sifatSurat,
      noSurat: req.noSurat,
      perihalSurat: req.perihalSurat,
      fileSurat: req.fileSurat,
      keterangan: req.keterangan,
    });

    return req
  }
}

module.exports = ModelSurat;
