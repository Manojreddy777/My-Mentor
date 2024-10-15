import API from "../../utils/api";

const pfClass = {

    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/pfClass/insertRecord", data)
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
        API.patch("/pfClass/updateRecord", data)
            .then(async (res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    }),

    getAll: () =>
        new Promise(function (resolve, reject) {
            API.get("/pfClass/getAll")
                .then(async (res) => {
                    resolve(pfClass.format(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    
	format: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.class_id,
                class_name: d.class_name,
                classif_id: d.classif_id,
                classif_name: d.classif_name,
            });
        }

        return formatted;
    },

    getAllActive: () =>
        new Promise(function (resolve, reject) {
            API.get("/pfClass/getAllActive")
                .then(async (res) => {
                    resolve(pfClass.formatgetall(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    
	formatgetall: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.class_id,
                class_name: d.class_name,
                classif_id: d.classif_name,
               
            });
        }
        return formatted;
    },

    getForDropDown: () =>
    new Promise(function (resolve, reject) {
        API.get("/pfComponent/getForDropDown")
            .then(async (res) => {
                resolve(pfClass.formatdd(res.data));
            })
            .catch((err) => {
                reject(err);
            });
    }),

    formatdd: (data) => {
    const formatted = [];

    for (let d of data) {
        formatted.push({
            id: d.class_id,
            class_name: d.class_name,
        });
    }
    return formatted;
    },
};

export default pfClass;
