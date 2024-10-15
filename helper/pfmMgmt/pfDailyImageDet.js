import API from "../../utils/api";
import moment from "moment" ; 

const PfDailyImageDet = {

    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/pfDailyImageDet/insertRecord", data, {
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
            API.patch("/pfDailyImageDet/updateRecord", data, {
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
            const baseUrl = "/pfDailyImageDet/getRecord";
            const filterUrl = PfDailyImageDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PfDailyImageDet.formatRecord(res.data));
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
            display_date: d.display_date == null ? "" : moment(d.display_date ).format("DD/MM/YYYY"),
            image_url: d.image_url,
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
            const baseUrl = "/pfDailyImageDet/getPageDet";
            const filterUrl = PfDailyImageDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PfDailyImageDet.formatPageDet(res.data));
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
            display_date: d.display_date == null ? "" : moment(d.display_date ).format("DD-MMM-YYYY"),
            image_url: d.image_url,
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
            const baseUrl = "/pfDailyImageDet/getFilteredData";
            const filterUrl = PfDailyImageDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PfDailyImageDet.formatFiltered(res.data));
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
            display_date: d.display_date == null ? "" : moment(d.display_date ).format("DD/MM/YYYY"),
            image_url: d.image_url,
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
        const baseUrl = "/pfDailyImageDet/getAudit";
        const filterUrl = PfDailyImageDet.getFilterUrl(filter);
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

if (filter.id !== undefined) {
    url += "id=" + filter.id + "&";
}
if (filter.clt_ref_id !== undefined) {
    url += "clt_ref_id=" + filter.clt_ref_id + "&";
}
if (filter.display_date !== undefined) {
    url += "display_date=" + filter.display_date + "&";
}
if (filter.image_url !== undefined) {
    url += "image_url=" + filter.image_url + "&";
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

export default PfDailyImageDet;