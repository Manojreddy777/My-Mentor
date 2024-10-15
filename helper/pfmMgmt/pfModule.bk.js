import API from "../../utils/api";

const pfModule = {

    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/pfModule/insertRecord", data)
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
        API.patch("/pfModule/updateRecord", data)
            .then(async (res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    }),

    getAll: () =>
        new Promise(function (resolve, reject) {
            API.get("/pfModule/getAll")
                .then(async (res) => {
                    resolve(pfModule.format(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    
	format: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.mod_id,
                mod_name: d.mod_name,
               
            });
        }

        return formatted;
    },

    getAllActive: () =>
        new Promise(function (resolve, reject) {
            API.get("/pfModule/getAllActive")
                .then(async (res) => {
                    resolve(pfModule.formatgetall(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
	formatgetall: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                mod_id: d.mod_id,
                mod_name: d.mod_name,
                abbr:d.abbr,
            });
        }
        return formatted;
    },

    getForDropDown: () =>
    new Promise(function (resolve, reject) {
        API.get("/pfModule/getForDropDown")
            .then(async (res) => {
                resolve(pfModule.formatdd(res.data));
            })
            .catch((err) => {
                reject(err);
            });
    }),

    formatdd: (data) => {
    const formatted = [];

    for (let d of data) {
        formatted.push({
            id: d.mod_id,
            mod_name: d.mod_name,
        });
    }
    return formatted;
    },
};

export default pfModule;
