import API from "../../utils/api";

const TaEndUser = {


    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/taEndUser/insertRecord", data)
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
            API.patch("/taEndUser/updateRecord", data)
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    getAll: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/taEndUser/getAll";
            const filterUrl = TaEndUser.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TaEndUser.formatgetAll(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatgetAll: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                user_id: d.user_id,
                user_name: d.user_name,
                role_id: d.role_id,
                role_name: d.role_name,
            });
        }
        return formatted;
    },

    getAllActive: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/taEndUser/getAllActive";
            const filterUrl = TaEndUser.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TaEndUser.format(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    format: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                user_id: d.user_id,
                user_name: d.user_name,
                role_id: d.role_list,
                role_name: d.role_name,
            });
        }
        return formatted;
    },

    getForDropDown: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/taEndUser/getForDropDown";
            const filterUrl = TaEndUser.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TaEndUser.formatdd(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatdd: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                user_id: d.user_id,
                user_name: d.user_name,

            });
        }
        return formatted;
    },

    getFilteredData: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/taEndUser/getFilteredData";
            const filterUrl = TaEndUser.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TaEndUser.formatfd(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatfd: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                user_id: d.user_id,
                employee_id: d.employee_id,
                user_name: d.user_name,
                email_id: d.email_id,
                role_list: JSON.parse(d.role_list),
                role_name: d.role_name,
                is_active: d.is_active == 'active' ? true : false,
            });
        }
        return formatted;
    },

    checkUsername: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/taEndUser/checkUsername";
            const filterUrl = TaEndUser.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    if (res.data.code == 403) {
                        //Does not exist
                        resolve(true);
                    } else {
                        resolve(false); //Does exist
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    getFilterUrl: (filter) => {
        let url = "";

        if (filter !== undefined) {

            if (filter.created_by !== undefined) {
                url += "created_by=" + filter.created_by + "&";
            }
            if (filter.account_name !== undefined) {
                url += "account_name=" + filter.account_name + "&";
            }
            if (filter.role_id !== undefined) {
                url += "role_id=" + filter.role_id + "&";
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

export default TaEndUser;
