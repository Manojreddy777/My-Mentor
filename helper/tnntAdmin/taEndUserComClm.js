import API from "../../utils/api";

const TaEndUserComClm = {

    getAll: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/taEndUserComClm/getAll";
            const filterUrl = TaEndUserComClm.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TaEndUserComClm.formatgetAll(res.data));
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
                clm_view: d.clm_view,
                clm_create: d.clm_create,
                clm_update: d.clm_update,
                clm_export: d.clm_export,
            });
        }
        return formatted;
    },

    getAllActive: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/taEndUserComClm/getAllActive";
            const filterUrl = TaEndUserComClm.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TaEndUserComClm.format(res.data));
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
                clm_view: d.clm_view,
                clm_create: d.clm_create,
                clm_update: d.clm_update,
                clm_export: d.clm_export,
            });
        }
        return formatted;
    },
    getForDropDown: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/taEndUserComClm/getForDropDown";
            const filterUrl = TaEndUserComClm.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TaEndUserComClm.formatdd(res.data));
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
                role_id: d.role_id,
                role_name: d.role_name,

            });
        }
        return formatted;
    },

    getFilteredData: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/taEndUserComClm/getFilteredData";
            const filterUrl = TaEndUserComClm.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TaEndUserComClm.formatfd(res.data));
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
                clm_view: d.clm_view,
                clm_create: d.clm_create,
                clm_update: d.clm_update,
                clm_export: d.clm_export,
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

export default TaEndUserComClm;
