import API from "../../utils/api";

const pfComponent = {

    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/pfComponent/insertRecord", data)
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
        API.patch("/pfComponent/updateRecord", data)
            .then(async (res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    }),

    getAll: () =>
        new Promise(function (resolve, reject) {
            API.get("/pfComponent/getAll")
                .then(async (res) => {
                    resolve(pfComponent.format(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    
	format: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.com_id,
                com_name: d.com_name,
                mod_id: d.mod_id,
                mod_name: d.mod_name,
            });
        }

        return formatted;
    },

    getAllActive: () =>
        new Promise(function (resolve, reject) {
            API.get("/pfComponent/getAllActive")
                .then(async (res) => {
                    resolve(pfComponent.formatgetall(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    
	formatgetall: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                com_id: d.com_id,
                com_name: d.com_name,
                mod_name: d.mod_name,
                abbr:d.abbr,
            });
        }
        return formatted;
    },

    getForDropDown: () =>
    new Promise(function (resolve, reject) {
        API.get("/pfComponent/getForDropDown")
            .then(async (res) => {
                resolve(pfComponent.formatdd(res.data));
            })
            .catch((err) => {
                reject(err);
            });
    }),

    formatdd: (data) => {
    const formatted = [];

    for (let d of data) {
        formatted.push({
            id: d.com_id,
            com_name: d.com_name,
        });
    }
    return formatted;
    },
};

export default pfComponent;
