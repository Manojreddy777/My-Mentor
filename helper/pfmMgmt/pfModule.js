import API from "../../utils/api";

const PfModule = {

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
                    resolve(PfModule.format(res.data));
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
                    resolve(PfModule.formatgetall(res.data));
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

    getForDropDown: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/pfModule/getForDropDown";
            const filterUrl = PfModule.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PfModule.formatdd(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatdd: (data) => {
    const formatted = [];

    for (let d of data) {
        formatted.push({
            mod_id: d.mod_id,
                mod_name: d.mod_name,
        });
    }
    return formatted;
    },

    getFilteredData: (filter) =>
    new Promise(function (resolve, reject) {
        const baseUrl = "/pfModule/getFilteredData";
		const filterUrl = PfModule.getFilterUrl(filter);
		API.get(`${baseUrl}?${filterUrl}`)
            .then(async (res) => {
                resolve(PfModule.formatfd(res.data));
            })
            .catch((err) => {
                reject(err);
            });
    }),

    formatfd: (data) => {
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

    getFilterUrl: (filter) => {
		let url = "";

        if (filter !== undefined) {
            if (filter.mod_id !== undefined) {
                url += "mod_id=" + filter.mod_id + "&";
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

export default PfModule;
