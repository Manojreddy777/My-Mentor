import API from "../../utils/api";
import moment from "moment";

const PfCSDet = {

    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/pfCSDet/insertRecord", data, {
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
            API.patch("/pfCSDet/updateRecord", data, {
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
            const baseUrl = "/pfCSDet/getRecord";
            const filterUrl = PfCSDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PfCSDet.formatRecord(res.data));
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
                subject: d.subject,
                descr: d.descr,
                raised_date: d.raised_date == null ? "" : moment(d.raised_date).format("DD/MM/YYYY"),
                closed_date: d.closed_date == null ? null : moment(d.closed_date).format("DD/MM/YYYY"),
                closed_by: d.closed_by,
                uc_category_id: d.uc_category_id,
                resolution: d.resolution,
                bug_id: d.bug_id,
                cr_id: d.cr_id,
                eta: d.eta == null ? null : moment(d.eta).format("DD/MM/YYYY"),
                ticket_status_id: d.ticket_status_id,
                lc_status_id: d.lc_status_id,
                status_id: d.status_id,
                is_active: d.is_active,
                created_at: d.created_at,
                created_by: d.created_by,
                tnnt_id: d.tnnt_id,
                assigned_to: d.assigned_to

            });
        }
        return formatted;
    },

    getPageDet: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/pfCSDet/getPageDet";
            const filterUrl = PfCSDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PfCSDet.formatPageDet(res.data));
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
                subject: d.subject,
                descr: d.descr,
                raised_date: d.raised_date == null ? null : moment(d.raised_date).format("DD-MMM-YYYY"),
                closed_date: d.closed_date == null ? null : moment(d.closed_date).format("DD-MMM-YYYY"),
                closed_by: d.closed_by,
                uc_category_id: d.uc_category_id,
                resolution: d.resolution,
                bug_id: d.bug_id,
                cr_id: d.cr_id,
                eta: d.eta == null ? null : moment(d.eta).format("DD/MMM/YYYY"),
                ticket_status_id: d.ticket_status_id,
                lc_status_id: d.lc_status_id,
                is_active: d.is_active,
                created_at: d.created_at,
                created_by: d.created_by,
                tnnt_id: d.tnnt_id,
                status_id: d.status_id,

            });
        }
        return formatted;
    },

    getFilteredData: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/pfCSDet/getFilteredData";
            const filterUrl = PfCSDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PfCSDet.formatFiltered(res.data));
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
                subject: d.subject,
                descr: d.descr,
                raised_date: d.raised_date == null ? null : moment(d.raised_date).format("DD/MM/YYYY"),
                closed_date: d.closed_date == null ? null : moment(d.closed_date).format("DD/MM/YYYY"),
                closed_by: d.closed_by,
                uc_category_id: d.uc_category_id,
                resolution: d.resolution,
                bug_id: d.bug_id,
                cr_id: d.cr_id,
                eta: d.eta == null ? null : moment(d.eta).format("DD/MM/YYYY"),
                ticket_status_id: d.ticket_status_id,
                lc_status_id: d.lc_status_id,
                is_active: d.is_active,
                created_at: d.created_at,
                created_by: d.created_by,
                tnnt_id: d.tnnt_id,
                status_id: d.status_id,

            });
        }
        return formatted;
    },

	getAuditData: (filter) =>
        new Promise(function (resolve, reject) {
        const baseUrl = "/pfCSDet/getAudit";
        const filterUrl = PfCSDet.getFilterUrl(filter);
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
            if (filter.subject !== undefined) {
                url += "subject=" + filter.subject + "&";
            }
            if (filter.descr !== undefined) {
                url += "descr=" + filter.descr + "&";
            }
            if (filter.raised_date !== undefined) {
                url += "raised_date=" + filter.raised_date + "&";
            }
            if (filter.closed_date !== undefined) {
                url += "closed_date=" + filter.closed_date + "&";
            }
            if (filter.closed_by !== undefined) {
                url += "closed_by=" + filter.closed_by + "&";
            }
            if (filter.uc_category_id !== undefined) {
                url += "uc_category_id=" + filter.uc_category_id + "&";
            }
            if (filter.resolution !== undefined) {
                url += "resolution=" + filter.resolution + "&";
            }
            if (filter.bug_id !== undefined) {
                url += "bug_id=" + filter.bug_id + "&";
            }
            if (filter.cr_id !== undefined) {
                url += "cr_id=" + filter.cr_id + "&";
            }
            if (filter.eta !== undefined) {
                url += "eta=" + filter.eta + "&";
            }
            if (filter.ticket_status_id !== undefined) {
                url += "ticket_status_id=" + filter.ticket_status_id + "&";
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
			//param_value
        }
        return url;
    },
};

export default PfCSDet;