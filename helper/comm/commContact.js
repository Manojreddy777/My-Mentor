import API from "../../utils/api";

const CommContact = {

    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/commContact/insertRecord", data, {
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
            API.patch("/commContact/updateRecord", data, {
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
            const baseUrl = "/commContact/getRecord";
            const filterUrl = CommContact.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(CommContact.formatRecord(res.data));
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
            contact_name: d.contact_name,
            mobile_nr1: d.mobile_nr1,
            mobile_nr2: d.mobile_nr2,
            wapp_nr: d.wapp_nr,
            email_id1: d.email_id1,
            email_id2: d.email_id2,
            is_active: d.is_active,
            created_at: d.created_at,
            created_by: d.created_by,
            tnnt_id: d.tnnt_id,
            email_status_id: d.email_status_id,
            wapp_status_id: d.wapp_status_id,

            });
        }
        return formatted;
    },

	getPageDet: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/commContact/getPageDet";
            const filterUrl = CommContact.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(CommContact.formatPageDet(res.data));
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
            contact_name: d.contact_name,
            mobile_nr1: d.mobile_nr1,
            mobile_nr2: d.mobile_nr2,
            wapp_nr: d.wapp_nr,
            email_id1: d.email_id1,
            email_id2: d.email_id2,
            is_active: d.is_active,
            created_at: d.created_at,
            created_by: d.created_by,
            tnnt_id: d.tnnt_id,
            email_status_id: d.email_status_id,
            wapp_status_id: d.wapp_status_id,

            });
        }
        return formatted;
    },	

    getFilteredData: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/commContact/getFilteredData";
            const filterUrl = CommContact.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(CommContact.formatFiltered(res.data));
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
            contact_name: d.contact_name,
            mobile_nr1: d.mobile_nr1,
            mobile_nr2: d.mobile_nr2,
            wapp_nr: d.wapp_nr,
            email_id1: d.email_id1,
            email_id2: d.email_id2,
            is_active: d.is_active,
            created_at: d.created_at,
            created_by: d.created_by,
            tnnt_id: d.tnnt_id,
            email_status_id: d.email_status_id,
            wapp_status_id: d.wapp_status_id,

            });
        }
        return formatted;
    },

	getAuditData: (filter) =>
        new Promise(function (resolve, reject) {
        const baseUrl = "/commContact/getAudit";
        const filterUrl = CommContact.getFilterUrl(filter);
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
if (filter.contact_name !== undefined) {
    url += "contact_name=" + filter.contact_name + "&";
}
if (filter.mobile_nr1 !== undefined) {
    url += "mobile_nr1=" + filter.mobile_nr1 + "&";
}
if (filter.mobile_nr2 !== undefined) {
    url += "mobile_nr2=" + filter.mobile_nr2 + "&";
}
if (filter.wapp_nr !== undefined) {
    url += "wapp_nr=" + filter.wapp_nr + "&";
}
if (filter.email_id1 !== undefined) {
    url += "email_id1=" + filter.email_id1 + "&";
}
if (filter.email_id2 !== undefined) {
    url += "email_id2=" + filter.email_id2 + "&";
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

export default CommContact;