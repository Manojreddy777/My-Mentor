import API from "../../utils/api";
import moment from "moment" ; 

const PfCalendarStaff = {

    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/pfCalendarStaff/insertRecord", data, {
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
            API.patch("/pfCalendarStaff/updateRecord", data, {
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
            const baseUrl = "/pfCalendarStaff/getRecord";
            const filterUrl = PfCalendarStaff.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PfCalendarStaff.formatRecord(res.data));
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
            cl_date: d.cl_date == null ? "" : moment(d.cl_date ).format("DD/MM/YYYY"),
            cl_day: d.cl_day,
            d_type: d.d_type,
            log_hrs: d.log_hrs,
            ts_list: d.ts_list,
            remarks: d.remarks,
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
            const baseUrl = "/pfCalendarStaff/getPageDet";
            const filterUrl = PfCalendarStaff.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PfCalendarStaff.formatPageDet(res.data));
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
            cl_date: d.cl_date == null ? "" : moment(d.cl_date ).format("DD-MMM-YYYY"),
            cl_day: d.cl_day,
            d_type: d.d_type,
            log_hrs: d.log_hrs,
            ts_list: d.ts_list,
            remarks: d.remarks,
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
            const baseUrl = "/pfCalendarStaff/getFilteredData";
            const filterUrl = PfCalendarStaff.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PfCalendarStaff.formatFiltered(res.data));
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
            cl_date: d.cl_date == null ? "" : moment(d.cl_date ).format("DD/MM/YYYY"),
            cl_day: d.cl_day,
            d_type: d.d_type,
            log_hrs: d.log_hrs,
            ts_list: d.ts_list,
            remarks: d.remarks,
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
        const baseUrl = "/pfCalendarStaff/getAudit";
        const filterUrl = PfCalendarStaff.getFilterUrl(filter);
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
if (filter.user_name !== undefined) {
    url += "user_name=" + filter.user_name + "&";
}
if (filter.cl_date !== undefined) {
    url += "cl_date=" + filter.cl_date + "&";
}
if (filter.cl_day !== undefined) {
    url += "cl_day=" + filter.cl_day + "&";
}
if (filter.d_type !== undefined) {
    url += "d_type=" + filter.d_type + "&";
}
if (filter.log_hrs !== undefined) {
    url += "log_hrs=" + filter.log_hrs + "&";
}
if (filter.ts_list !== undefined) {
    url += "ts_list=" + filter.ts_list + "&";
}
if (filter.remarks !== undefined) {
    url += "remarks=" + filter.remarks + "&";
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

export default PfCalendarStaff;