import API from "../utils/api";

const files = {
    upload: (file, name, folder, type) =>
        new Promise(function (resolve, reject) {
            const formData = new FormData();
            formData.append("file", file, file.name);
            formData.append("name", name);
            formData.append("folder", folder);
            formData.append("type", type == undefined ? "open" : type);
            API.post("/files", formData)
                .then(async (res) => {
                    if (res.status === 200) {
                        resolve(res.data);
                    } else {
                        reject(res.data.msg);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        }),

   updateFile: (data) =>
    new Promise(function (resolve, reject) {
      API.patch("/files/updateFile", data, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          console.log(res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.data.msg);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }),

    getFile: (file) =>
        new Promise(function (resolve, reject) {
            API.get("/files/getFile?file=" + file, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),

  insertRecord: (data) =>
    new Promise(function (resolve, reject) {
      API.post("/files/insertRecord", data, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.data.msg);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }),
};

export default files;
