import API from "../../utils/api";

const TaRoleUserClm = {


    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/taRoleUserClm/insertRecord", data)
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
            API.patch("/taRoleUserClm/updateRecord", data)
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    getAll: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/taRoleUserClm/getAll";
            const filterUrl = TaRoleUserClm.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TaRoleUserClm.formatgetAll(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatgetAll: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                com_id: d.com_id,
                com_name: d.com_name,
                role_id: d.role_id,
                role_name: d.role_name,
                clm_view_name: d.clm_view_name,
                clm_create_name: d.clm_create_name,
                clm_update_name: d.clm_update_name,
                clm_export_name: d.clm_export_name,
            });
        }
        return formatted;
    },

    getAllActive: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/taRoleUserClm/getAllActive";
            const filterUrl = TaRoleUserClm.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TaRoleUserClm.format(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    format: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                com_id: d.com_id,
                com_name: d.com_name,
                role_id: d.role_id,
                role_name: d.role_name,
                clm_view_name: d.clm_view_name,
                clm_create_name: d.clm_create_name,
                clm_update_name: d.clm_update_name,
                clm_export_name: d.clm_export_name,
            });
        }
        return formatted;
    },

    getForDropDown: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/taRoleUserClm/getForDropDown";
            const filterUrl = TaRoleUserClm.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TaRoleUserClm.formatdd(res.data));
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
    getFilteredData: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/taRoleUserClm/getFilteredData";
            const filterUrl = TaRoleUserClm.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TaRoleUserClm.formatfd(res.data));
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
                role_id: d.role_id,
                role_name: d.role_name,
                clm_view_name: d.clm_view_name,
                clm_create_name: d.clm_create_name,
                clm_update_name: d.clm_update_name,
                clm_export_name: d.clm_export_name,
            });
        }
        return formatted;
    },

    getFilterUrl: (filter) => {
        let url = "";

        if (filter !== undefined) {
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

export default TaRoleUserClm;
