import API from "../../utils/api";
import moment from "moment" ; 

const PfCalendarEvents = {

    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/pfCalendarEvents/insertRecord", data, {
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
            API.patch("/pfCalendarEvents/updateRecord", data, {
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
            const baseUrl = "/pfCalendarEvents/getRecord";
            const filterUrl = PfCalendarEvents.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PfCalendarEvents.formatRecord(res.data));
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
            cl_date: d.cl_date == null ? "" : moment(d.cl_date ).format("DD/MM/YYYY"),
            cl_day: d.cl_day,
            user_name: d.user_name,
            event: d.event,
            start_time: d.start_time,
            end_time: d.end_time,
            base_com_id: d.base_com_id,
            base_com_rec_id: d.base_com_rec_id,
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
            const baseUrl = "/pfCalendarEvents/getPageDet";
            const filterUrl = PfCalendarEvents.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PfCalendarEvents.formatPageDet(res.data));
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
            cl_date: d.cl_date == null ? "" : moment(d.cl_date ).format("DD-MMM-YYYY"),
            cl_day: d.cl_day,
            user_name: d.user_name,
            event: d.event,
            start_time: d.start_time,
            end_time: d.end_time,
            base_com_id: d.base_com_id,
            base_com_rec_id: d.base_com_rec_id,
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
            const baseUrl = "/pfCalendarEvents/getFilteredData";
            const filterUrl = PfCalendarEvents.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PfCalendarEvents.formatFiltered(res.data));
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
            cl_date: d.cl_date == null ? "" : moment(d.cl_date ).format("DD/MM/YYYY"),
            cl_day: d.cl_day,
            user_name: d.user_name,
            event: d.event,
            start_time: d.start_time,
            end_time: d.end_time,
            base_com_id: d.base_com_id,
            base_com_rec_id: d.base_com_rec_id,
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
        const baseUrl = "/pfCalendarEvents/getAudit";
        const filterUrl = PfCalendarEvents.getFilterUrl(filter);
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
if (filter.cl_date !== undefined) {
    url += "cl_date=" + filter.cl_date + "&";
}
if (filter.cl_day !== undefined) {
    url += "cl_day=" + filter.cl_day + "&";
}
if (filter.user_name !== undefined) {
    url += "user_name=" + filter.user_name + "&";
}
if (filter.event !== undefined) {
    url += "event=" + filter.event + "&";
}
if (filter.start_time !== undefined) {
    url += "start_time=" + filter.start_time + "&";
}
if (filter.end_time !== undefined) {
    url += "end_time=" + filter.end_time + "&";
}
if (filter.base_com_id !== undefined) {
    url += "base_com_id=" + filter.base_com_id + "&";
}
if (filter.base_com_rec_id !== undefined) {
    url += "base_com_rec_id=" + filter.base_com_rec_id + "&";
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

export default PfCalendarEvents;