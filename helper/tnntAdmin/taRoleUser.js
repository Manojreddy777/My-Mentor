import API from "../../utils/api";

const TaRoleUser = {


    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/taRoleUser/insertRecord", data)
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
            API.patch("/taRoleUser/updateRecord", data)
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    getAll: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/taRoleUser/getAll";
            const filterUrl = TaRoleUser.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TaRoleUser.formatgetAll(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatgetAll: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                role_id: d.role_id,
                role_name: d.role_name,
            });
        }
        return formatted;
    },

    getRecord: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/taRoleUser/getRecord";
            const filterUrl = TaRoleUser.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TaRoleUser.formatr(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatr: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                mod_id: d.mod_id,
                module_restrict: "No",
                arr_component_value: JSON.parse('[' + d.arr_component_value + ']')
                // module_restrict: d.module_restrict,
            });
        }
        return formatted;
    },

    getAllActive: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/taRoleUser/getAllActive";
            const filterUrl = TaRoleUser.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TaRoleUser.format(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    format: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                role_id: d.role_id,
                role_name: d.role_name,
                is_active: d.is_active == 'active' ? true : false,
            });
        }
        return formatted;
    },
    getForDropDown: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/taRoleUser/getForDropDown";
            const filterUrl = TaRoleUser.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TaRoleUser.formatdd(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatdd: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                role_id: d.role_id,
                role_name: d.role_name,
            });
        }
        return formatted;
    },


    getMultiDropdown: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/taRoleUser/getMultiDropdown";
            const filterUrl = TaRoleUser.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    getFilteredData: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/taRoleUser/getFilteredData";
            const filterUrl = TaRoleUser.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TaRoleUser.formatfd(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatfd: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                role_id: d.role_id,
                role_name: d.role_name,
            });
        }
        return formatted;
    },

    getFilterUrl: (filter) => {
        let url = "";

        if (filter !== undefined) {
            if (filter.is_active !== undefined) {
                url += "is_active=" + filter.is_active + "&";
            }
            if (filter.role_id !== undefined) {
                url += "role_id=" + filter.role_id + "&";
            }
            if (filter.tnnt_id !== undefined) {
                url += "tnnt_id=" + filter.tnnt_id + "&";
            }
        }
        return url;
    },

};

export default TaRoleUser;
