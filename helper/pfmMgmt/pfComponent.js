import API from "../../utils/api";

const PfComponent = {

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
                    resolve(PfComponent.format(res.data));
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
                abbr: d.abbr,
            });
        }

        return formatted;
    },

    getAllActive: () =>
        new Promise(function (resolve, reject) {
            API.get("/pfComponent/getAllActive")
                .then(async (res) => {
                    resolve(PfComponent.formatgetall(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    
	formatgetall: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                mod_name: d.mod_name,
                mod_id: d.mod_id,
                component: JSON.parse('[' + d.component + ']')
            });
        }
        return formatted;
    },

    getForDropDown: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/pfComponent/getForDropDown";
            const filterUrl = PfComponent.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PfComponent.formatdd(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatdd: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                com_id: d.com_id,
                com_name: d.com_name,
            });
        }
        return formatted;
    },
    getFilteredData: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/pfComponent/getFilteredData";
            const filterUrl = PfComponent.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(PfComponent.formatfd(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatfd: (data) => {
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

    getFilterUrl: (filter) => {
		let url = "";

        if (filter !== undefined) {
            if (filter.com_id !== undefined) {
                url += "com_id=" + filter.com_id + "&";
            }
            if (filter.id !== undefined) {
                url += "id=" + filter.id + "&";
            }
            if (filter.is_active !== undefined) {
                url += "is_active=" + filter.is_active + "&";
            }
            if (filter.tnnt_id !== undefined) {
                url += "tnnt_id=" + filter.tnnt_id + "&";
            }
        }
        return url;
    },
};

export default PfComponent;
