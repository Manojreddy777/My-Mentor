import API from "../../utils/api";

const TaComments = {

    updateRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/taComments/updateRecord", data)
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

    getAll: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/taComments/getAll";
            const filterUrl = TaComments.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TaComments.formatgetAll(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatgetAll: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                rec_id: d.rec_id,
                com_id: d.com_id,
                module_name: d.mod_name,
                component_name: d.com_name,
                comment_status: d.comment_status == 'active' ? true : false,
            });
        }
        return formatted;
    },

    getCommentStatus: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/taComments/getCommentStatus";
            const filterUrl = TaComments.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TaComments.formatgetCommentStatus(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatgetCommentStatus: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.com_id,
                comment_status: d.comment_status == 'active' ? true : false,
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
            if (filter.tnnt_id !== undefined) {
                url += "tnnt_id=" + filter.tnnt_id + "&";
            }
            if (filter.is_active !== undefined) {
                url += "is_active=" + filter.is_active + "&";
            }
        }
        return url;
    },
};

export default TaComments;
