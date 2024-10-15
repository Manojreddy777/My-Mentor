import API from "../../utils/api";

const AimCategoryDet = {

    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/aimCategoryDet/insertRecord", data, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
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

    updateRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.patch("/aimCategoryDet/updateRecord", data, {
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

    getRecord: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/aimCategoryDet/getRecord";
            const filterUrl = AimCategoryDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(AimCategoryDet.formatRecord(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatRecord: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({


                id: d.id,
                user_name: d.user_name,
                category_grp_id: d.category_grp_id,
                category_grp_name: d.category_grp_name,
                category_name: d.category_name,
                lc_status_id: d.lc_status_id,
                lc_status_name: d.lc_status_name,
                is_active: d.is_active,
                created_at: d.created_at,
                created_by: d.created_by,
                tnnt_id: d.tnnt_id,

            });
        }
        return formatted;
    },

    getPageDet: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/aimCategoryDet/getPageDet";
            const filterUrl = AimCategoryDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(AimCategoryDet.formatPageDet(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatPageDet: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                comment_cnt: d.comment_cnt == null ? 0 : d.comment_cnt,


                id: d.id,
                user_name: d.user_name,
                category_grp_id: d.category_grp_id,
                category_grp_name: d.category_grp_name,
                category_name: d.category_name,
                lc_status_id: d.lc_status_id,
                lc_status_name: d.lc_status_name,
                is_active: d.is_active,
                created_at: d.created_at,
                created_by: d.created_by,
                tnnt_id: d.tnnt_id,

            });
        }
        return formatted;
    },

    getFilteredData: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/aimCategoryDet/getFilteredData";
            const filterUrl = AimCategoryDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(AimCategoryDet.formatFiltered(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatFiltered: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({


                id: d.id,
                user_name: d.user_name,
                category_grp_id: d.category_grp_id,
                category_grp_name: d.category_grp_name,
                category_name: d.category_name,
                lc_status_id: d.lc_status_id,
                lc_status_name: d.lc_status_name,
                is_active: d.is_active,
                created_at: d.created_at,
                created_by: d.created_by,
                tnnt_id: d.tnnt_id,

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
            //param_value

            if (filter.id !== undefined) {
                url += "id=" + filter.id + "&";
            }
            if (filter.user_name !== undefined) {
                url += "user_name=" + filter.user_name + "&";
            }
            if (filter.category_grp_id !== undefined) {
                url += "category_grp_id=" + filter.category_grp_id + "&";
            }
            if (filter.category_name !== undefined) {
                url += "category_name=" + filter.category_name + "&";
            }
            if (filter.lc_status_id !== undefined) {
                url += "lc_status_id=" + filter.lc_status_id + "&";
            }
            if (filter.is_active !== undefined) {
                url += "is_active=" + filter.is_active + "&";
            }
            if (filter.created_at !== undefined) {
                url += "created_at=" + filter.created_at + "&";
            }
            if (filter.created_by !== undefined) {
                url += "created_by=" + filter.created_by + "&";
            }
            if (filter.tnnt_id !== undefined) {
                url += "tnnt_id=" + filter.tnnt_id + "&";
            }


        }
        return url;
    },
};

export default AimCategoryDet;