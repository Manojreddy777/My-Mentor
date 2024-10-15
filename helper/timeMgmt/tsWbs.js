import API from "../../utils/api";
import moment from "moment";

const TsWbs = {

    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/tsWbs/insertRecord", data, {
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
            API.patch("/tsWbs/updateRecord", data, {
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
            const baseUrl = "/tsWbs/getRecord";
            const filterUrl = TsWbs.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsWbs.formatRecord(res.data));
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
                wbs_name: d.wbs_name,
                start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
                end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
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
            const baseUrl = "/tsWbs/getPageDet";
            const filterUrl = TsWbs.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsWbs.formatPageDet(res.data));
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
                wbs_name: d.wbs_name,
                start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
                end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
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
            const baseUrl = "/tsWbs/getFilteredData";
            const filterUrl = TsWbs.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsWbs.formatFiltered(res.data));
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
                wbs_name: d.wbs_name,
                start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
                end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
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

	getAuditData: (filter) =>
        new Promise(function (resolve, reject) {
        const baseUrl = "/tsWbs/getAudit";
        const filterUrl = TsWbs.getFilterUrl(filter);
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
            if (filter.wbs_name !== undefined) {
                url += "wbs_name=" + filter.wbs_name + "&";
            }
            if (filter.start_date !== undefined) {
                url += "start_date=" + filter.start_date + "&";
            }
            if (filter.end_date !== undefined) {
                url += "end_date=" + filter.end_date + "&";
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

export default TsWbs;