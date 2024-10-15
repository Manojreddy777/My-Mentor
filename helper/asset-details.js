import API from "../utils/api";

const asset = {
    create: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/assetdetail", data)
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

    update: (data) =>
        new Promise(function (resolve, reject) {
            API.patch("/assetdetail/update", data)
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

    getAsset: () =>
        new Promise(function (resolve, reject) {
            API.get("/assetdetail/get")
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),
};

export default asset;
