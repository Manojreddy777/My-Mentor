import API from "../../utils/api";

const pfWFDet = {

    getWfa: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/pfWFDet/getWfa";
            const filterUrl = pfWFDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(pfWFDet.formatfd(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    formatfd: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.id,
                com_id: d.com_id,
                old_wfs_id: d.old_wfs_id,
                next_wfs_id: d.next_wfs_id,
                wfa_id: d.wfa_id,
                wfa_name: d.wfa_name,
                access_role_users_list: d.access_role_users_list,
                tnnt_id: d.tnnt_id,
            });
        }
        return formatted;
    },

    getOrderTranst: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/pfWFDet/getOrderTranst";
            const filterUrl = pfWFDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(pfWFDet.formatot(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    formatot: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.id,
                next_wfs_id: d.next_wfs_id,
            });
        }
        return formatted;
    },

    checkOrderTranst: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/pfWFDet/checkOrderTranst";
            const filterUrl = pfWFDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
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

    getOrderDetails: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/pfWFDet/getOrderDetails";
            const filterUrl = pfWFDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(pfWFDet.formatOrder(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
        formatOrder: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.id,
                initiation_date: d.initiation_date,
                com_name: d.com_name,
                rec_id: d.rec_id,
                doc_id: d.doc_id,
                next_wfs_id: d.next_wfs_id,
                workflow_status: d.workflow_status,
            });
        }
        return formatted;
    },

    getCount: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/pfWFDet/getCount";
            const filterUrl = pfWFDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(pfWFDet.formatCount(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
        formatCount: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                com_id: d.com_id,
                com_name: d.com_name,
                review_one: d.review_one,
                reject_one: d.reject_one,
                review_two: d.review_two,
                reject_two: d.reject_two,
                done: d.done,
                discard: d.discard,
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
            if (filter.rec_id !== undefined) {
                url += "rec_id=" + filter.rec_id + "&";
            }
            if (filter.com_id !== undefined) {
                url += "com_id=" + filter.com_id + "&";
            }
            if (filter.old_wfs_id !== undefined) {
                url += "old_wfs_id=" + filter.old_wfs_id + "&";
            }
            if (filter.next_wfs_id !== undefined) {
                url += "next_wfs_id=" + filter.next_wfs_id + "&";
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

export default pfWFDet;
