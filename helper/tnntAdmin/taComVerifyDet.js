import API from "../../utils/api";

const TaComVerifyDet = {

    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/taComVerifyDet/insertRecord", data, {
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
            API.patch("/taComVerifyDet/updateRecord", data, {
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
            const baseUrl = "/taComVerifyDet/getRecord";
            const filterUrl = TaComVerifyDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TaComVerifyDet.formatRecord(res.data));
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
                clt_ref_id: d.clt_ref_id,
                com_id: d.com_id,
                old_wfs_id: d.old_wfs_id,
                wfa_id: d.wfa_id,
                next_wfs_id: d.next_wfs_id,
                access_role_users_list: d.access_role_users_list,
                lc_status_id: d.lc_status_id,
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
            const baseUrl = "/taComVerifyDet/getPageDet";
            const filterUrl = TaComVerifyDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TaComVerifyDet.formatPageDet(res.data));
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
                clt_ref_id: d.clt_ref_id,
                com_id: d.com_id,
                old_wfs_id: d.old_wfs_id,
                wfa_id: d.wfa_id,
                next_wfs_id: d.next_wfs_id,
                access_role_users_list: d.access_role_users_list,
                lc_status_id: d.lc_status_id,
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
            const baseUrl = "/taComVerifyDet/getFilteredData";
            const filterUrl = TaComVerifyDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TaComVerifyDet.formatFiltered(res.data));
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
                clt_ref_id: d.clt_ref_id,
                com_id: d.com_id,
                old_wfs_id: d.old_wfs_id,
                wfa_id: d.wfa_id,
                next_wfs_id: d.next_wfs_id,
                access_role_users_list: d.access_role_users_list,
                lc_status_id: d.lc_status_id,
                is_active: d.is_active,
                created_at: d.created_at,
                created_by: d.created_by,
                tnnt_id: d.tnnt_id,

            });
        }
        return formatted;
    },

	getAuditData: (filter) =>
        new Promise(function (resolve, reject) {
        const baseUrl = "/taComVerifyDet/getAudit";
        const filterUrl = TaComVerifyDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
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
            if (filter.clt_ref_id !== undefined) {
                url += "clt_ref_id=" + filter.clt_ref_id + "&";
            }
            // if (filter.com_id !== undefined) {
            //     url += "com_id=" + filter.com_id + "&";
            // }
            if (filter.old_wfs_id !== undefined) {
                url += "old_wfs_id=" + filter.old_wfs_id + "&";
            }
            if (filter.wfa_id !== undefined) {
                url += "wfa_id=" + filter.wfa_id + "&";
            }
            if (filter.next_wfs_id !== undefined) {
                url += "next_wfs_id=" + filter.next_wfs_id + "&";
            }
            if (filter.access_role_users_list !== undefined) {
                url += "access_role_users_list=" + filter.access_role_users_list + "&";
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
if (filter.ref_id !== undefined) { 
 url += "ref_id=" + filter.ref_id + "&";
}
        }
        return url;
    },
};

export default TaComVerifyDet;