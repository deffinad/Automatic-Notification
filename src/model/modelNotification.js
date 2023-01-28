const e = require("express");
var { db, timestamp } = require("../config/firebaseInit");

class ModelNotification {
  async getDataByEmail(name, email, type) {
    var notificationType =
      type === "suratmasuk" ? "surat masuk" : "surat keluar";
    var allData = [];

    const ref = db
      .collection(name)
      .doc(notificationType)
      .collection(email)
      .doc("notifications")
      .collection("messages");
    const snapshot = await ref.orderBy('createdAt', 'desc').get();

    snapshot.forEach((hasil) => {
      const id = hasil.id
      allData.push({
        id,
        ...hasil.data()
      });
    });

    const data = allData.map(item => {
      const date = this.timeSince(item.createdAt.toDate().getTime())
      return {
        ...item,
        createdAt: date
      }
    })
    return data;
  }

  timeSince(date){
    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }

  async postData(data) {
    const type = data.to === "" ? "surat masuk" : "surat keluar";

    const ref = db.collection(data.appName).doc(type);
    const typeCollection = await ref.listCollections();

    typeCollection.forEach((collection) => {
      if (type == "surat masuk") {
        collection.doc("notifications").collection("messages").doc().set({
          title: data.title,
          body: data.body,
          createdAt: timestamp.fromDate(new Date()),
          read: false,
          route: data.route,
          sender: data.sender,
        });
      } else {
        if (collection.id === data.to) {
          collection.doc("notifications").collection("messages").doc().set({
            title: data.title,
            body: data.body,
            createdAt: timestamp.fromDate(new Date()),
            read: false,
            route: data.route,
            sender: data.sender,
          });
        }
      }
    });
  }

  async checkToken(name, email) {
    const type = email === "" ? "surat masuk" : "surat keluar";
    const ref = db.collection(name).doc(type);
    const typeCollection = await ref.listCollections();

    let promises = [];
    typeCollection.forEach((collection) => {
      if (type === "surat masuk") {
        let tokenPromise = collection
          .doc("tokens")
          .get()
          .then((item) => {
            const token = [];
            if("web" in item.data()){
              token.push(item.data().web)
            }
            if("mobile" in item.data()){
              token.push(item.data().mobile)
            }
            return Promise.all(token);
          });

        promises.push(tokenPromise);
      } else {
        if (collection.id === email) {
          let tokenPromise = collection
            .doc("tokens")
            .get()
            .then((item) => {
              const token = [];
              if("web" in item.data()){
                token.push(item.data().web)
              }
              if("mobile" in item.data()){
                token.push(item.data().mobile)
              }

              return Promise.all(token);
            });

          promises.push(tokenPromise);
        }
      }
    });

    return Promise.all(promises).then((result) => {
      const dataToken = [];
      result.forEach(item => {
        item.forEach(token => {
          if(token != ''){
            dataToken.push(token)
          }
        })
      })
      return dataToken;
    });
  }

  async updateToken(email, req) {
    const data = req;
    const app = data.isMobile ? "mobile" : "web";
    const type = data.role === "admin" ? "surat masuk" : "surat keluar";
    const ref = await db
      .collection(data.appName)
      .doc(type)
      .collection(email)
      .doc("tokens")
      .get();

    if (!ref.exists) {
      db.collection(data.appName)
        .doc(type)
        .collection(email)
        .doc("tokens")
        .set({
          [app]: data.token,
        });
    } else {
      db.collection(data.appName)
        .doc(type)
        .collection(email)
        .doc("tokens")
        .update({
          [app]: data.token,
        });
    }
    return "Token updated.";
  }

  async updateStatus(email, data){
    const ref = await db.collection(data.appName).listDocuments()

    ref.forEach(type => {
      type.collection(email).doc('notifications').collection('messages').get().then(id => {
        id.forEach(items => {
          const item = items.data()
          if(data.title === item.title && data.body === item.body && data.route === item.route){
            db.collection(data.appName).doc(type.id).collection(email).doc('notifications').collection('messages').doc(items.id).update({
              read:true
            })
          }
        })
      })
    })

    return "Update Status Berhasil"
  }
}

module.exports = ModelNotification;
