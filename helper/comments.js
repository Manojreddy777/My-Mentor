import API from "../utils/api";

const comments = {
    create: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/comments/create", data)
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
    get: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/comments/get";
            const filterUrl = comments.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),

        getCount: (task_id) =>
        new Promise(function (resolve, reject) {
            API.get("/comments/getCount?task_id=" + task_id)
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    delete: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/comments/delete";
            const filterUrl = comments.getFilterUrl(filter);
            API.patch(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    getFilterUrl: (filter) => {
        let url = "";

        if (filter !== undefined) {
            if (filter.com_rec_id !== undefined) {
                url += "com_rec_id=" + filter.com_rec_id + "&";
            }
            if (filter.com_id !== undefined) {
                url += "com_id=" + filter.com_id + "&";
            }
            if (filter.tnnt_id !== undefined) {
                url += "tnnt_id=" + filter.tnnt_id + "&";
            }
        }
        console.log(url)
        return url;
    },
};

export default comments;

