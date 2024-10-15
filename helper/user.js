import API from "../utils/api";

const user = {
    get: (account_name, password) =>
        new Promise(function (resolve, reject) {
            API.post("/user/login", {
                account_name: account_name,
                password: password
            })
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

    checkOldPassword: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/user/checkOldPassword";
            const filterUrl = user.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    updatenewPassword: (data) =>
        new Promise(function (resolve, reject) {
            API.patch("/user/updatenewPassword", data)
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    getAll: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/user/getAll";
            const filterUrl = user.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(user.formata(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formata: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                account_name: d.account_name,
            });
        }

        return formatted;
    },

    getMultiDropdown: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/user/getMultiDropdown";
            const filterUrl = user.getFilterUrl(filter);
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
            const baseUrl = "/user/getFilteredData";
            const filterUrl = user.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(user.formatfd(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatfd: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                account_name: d.account_name,
            });
        }
        return formatted;
    },
    getForDropdownRoleId: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/user/getForDropdownRoleId";
            const filterUrl = user.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    insertSecurityAnswer: (data) =>
        new Promise(function (resolve, reject) {
            API.patch("/user/insertSecurityAnswer", data)
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    checkSecurityAnswer: (filter) =>
        new Promise(function (resolve, reject) {
            console.log(filter)
            const baseUrl = "/user/checkSecurityAnswer";
            const filterUrl = user.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    if (res.data.code == 403) {
                        //Does not exist
                        resolve(res.data);
                    } else {
                        resolve(res.data); //Does exist
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    getFilterUrl: (filter) => {
        let url = "";

        if (filter !== undefined) {
            if (filter.account_name !== undefined) {
                url += "account_name=" + filter.account_name + "&";
            }
            if (filter.password !== undefined) {
                url += "password=" + filter.password + "&";
            }
            if (filter.question_1 !== undefined) {
                url += "question_1=" + filter.question_1 + "&";
            }
            if (filter.question_2 !== undefined) {
                url += "question_2=" + filter.question_2 + "&";
            }
            if (filter.question_3 !== undefined) {
                url += "question_3=" + filter.question_3 + "&";
            }
            if (filter.answer_1 !== undefined) {
                url += "answer_1=" + filter.answer_1 + "&";
            }
            if (filter.answer_2 !== undefined) {
                url += "answer_2=" + filter.answer_2 + "&";
            }
            if (filter.answer_3 !== undefined) {
                url += "answer_3=" + filter.answer_3 + "&";
            }
            if (filter.tnnt_id !== undefined) {
                url += "tnnt_id=" + filter.tnnt_id + "&";
            }
        }
        return url;
    },

};

export default user;
