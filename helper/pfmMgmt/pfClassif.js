import API from "../../utils/api";

const pfClassif = {

    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/pfClassif/insertRecord", data)
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

    updateRecord: (data) =>
    new Promise(function (resolve, reject) {
        API.patch("/pfClassif/updateRecord", data)
            .then(async (res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    }),

    getAll: () =>
        new Promise(function (resolve, reject) {
            API.get("/pfClassif/getAll")
                .then(async (res) => {
                    resolve(pfClassif.format(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    
	format: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.classif_id,
                classif_name: d.classif_name,
                com_id: d.com_id,
                com_name: d.com_name,
            });
        }

        return formatted;
    },

    getAllActive: () =>
        new Promise(function (resolve, reject) {
            API.get("/pfClassif/getAllActive")
                .then(async (res) => {
                    resolve(pfClassif.formatgetall(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    
	formatgetall: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.classif_id,
                classif_name: d.classif_name,
                com_id: d.com_name,
               
            });
        }
        return formatted;
    },

    getForDropDown: () =>
    new Promise(function (resolve, reject) {
        API.get("/pfClassif/getForDropDown")
            .then(async (res) => {
                resolve(pfClassif.formatdd(res.data));
            })
            .catch((err) => {
                reject(err);
            });
    }),

    formatdd: (data) => {
    const formatted = [];

    for (let d of data) {
        formatted.push({
            id: d.classif_id,
            classif_name: d.classif_name,
            com_id: d.com_name,
        });
    }
    return formatted;
    },
};

export default pfClassif;
