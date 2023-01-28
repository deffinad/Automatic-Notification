import axios from "axios";

const base_url = "https://tatasurat-notification-server.herokuapp.com/v1";

export const login = async (email, password) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      baseURL: base_url + "/users",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        email: email,
        password: password,
      },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateToken = async (email, token, isMobile, role) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      baseURL: base_url + "/updateToken/" + email,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        appName: "TataSurat",
        role: role,
        token: token,
        isMobile: isMobile,
      },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getMessages = async (email, type) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      baseURL: base_url + "/messages/TataSurat" + "/" + email + "/" + type,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const addNotification = async (data) => {
  axios({
    method: "post",
    baseURL: base_url + "/messages",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    data: data,
  })
    .then((response) => {
      console.log(response.messages)
    })
    .catch((err) => {
      console.log(err)
    });
};

export const updateStatus = async (email, data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      baseURL: base_url + "/updateStatus/" + email,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        appName: "TataSurat",
        title: data.title,
        body: data.body,
        route: data.route,
      },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getSuratMasuk = async (pengguna) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      baseURL: base_url + "/suratmasukby/" + pengguna,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getSuratMasukById = async (id) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      baseURL: base_url + "/suratmasuk/" + id,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const postSuratMasuk = async (dataSuratMasuk) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      baseURL: base_url + "/suratmasuk",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: dataSuratMasuk,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getSuratKeluar = async () => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      baseURL: base_url + "/suratkeluar",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getSuratKeluarById = async (id) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      baseURL: base_url + "/suratkeluar/" + id,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const postSuratKeluar = async (dataSuratKeluar) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      baseURL: base_url + "/suratkeluar",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: dataSuratKeluar,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
