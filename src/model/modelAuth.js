var { db } = require("../config/firebaseInit");

class ModelAuth {
  async login(email, password) {
    const allData = [];

    const ref = await db.collection("users");
    const snapshot = await ref.get();

    snapshot.forEach((hasil) => {
      if (hasil.id == email) {
        allData.push(hasil.data());
      }
    });
    let currentPassword = "";
    allData.map((data) => {
      currentPassword = data.password;
    });

    if (currentPassword == password) {
      return {
        isTrue: true,
        dataUser: allData,
      };
    } else {
      return {
        isTrue: false,
      };
    }
  }

  async cekEmail(email) {
    const ref = await db.collection("users").doc(email);
    const doc = await ref.get();

    if (!doc.exists) {
      return false;
    } else {
      return true;
    }
  }

  async getUser() {
    const allData = [];

    const ref = await db.collection("users");
    const snapshot = await ref.get();

    snapshot.forEach((hasil) => {
      allData.push({ [hasil.id]: hasil.data() });
    });

    return allData;
  }

}

module.exports = ModelAuth;
