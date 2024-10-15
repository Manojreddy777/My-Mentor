import API from "../utils/api";

const notification = {
    getNotifParam: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/notifInternal/getNotifParam";
            const filterUrl = notification.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(notification.formatParam(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatParam: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                event_id: d.event_id,
                event_descr: d.event_descr,
                user_choose: d.user_choose == "Yes" ? true : false,
            });
        }

        return formatted;
    },

    getNotifList: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/notifInternal/getNotifList";
            const filterUrl = notification.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(notification.formatList(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatList: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.id,
                com_id: d.com_id,
                com_rec_id: d.com_rec_id,
                notif_content: d.notif_content,
                created_at: d.created_at,
            });
        }

        return formatted;
    },

    setDismiss: (data) =>
        new Promise(function (resolve, reject) {
            API.patch("/notifInternal/setDismiss", data, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    setRead: (data) =>
        new Promise(function (resolve, reject) {
            API.patch("/notifInternal/setRead", data, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    updateRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.patch("/notifInternal/updateRecord", data, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    checkAlert: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/notifInternal/checkAlert";
            const filterUrl = notification.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(notification.formatcheckAlert(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatcheckAlert: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                count: d.total_count,
            });
        }

        return formatted;
    },

    getFilterUrl: (filter) => {
        let url = "";

        if (filter !== undefined) {
            if (filter.user_name !== undefined) {
                url += "user_name=" + filter.user_name + "&";
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

export default notification;
