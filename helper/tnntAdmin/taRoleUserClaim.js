import API from "../../utils/api";

const TaRoleUserClaim = {

    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/taRoleUserClaim/insertRecord", data, {
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
            API.patch("/taRoleUserClaim/updateRecord", data, {
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
            const baseUrl = "/taRoleUserClaim/getRecord";
            const filterUrl = TaRoleUserClaim.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TaRoleUserClaim.formatRecord(res.data));
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
            role_id: d.role_id,
            clm_view: d.clm_view,
            clm_create: d.clm_create,
            clm_update: d.clm_update,
            clm_export: d.clm_export,
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
            const baseUrl = "/taRoleUserClaim/getPageDet";
            const filterUrl = TaRoleUserClaim.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TaRoleUserClaim.formatPageDet(res.data));
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
            role_id: d.role_id,
            clm_view: d.clm_view,
            clm_create: d.clm_create,
            clm_update: d.clm_update,
            clm_export: d.clm_export,
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
            const baseUrl = "/taRoleUserClaim/getFilteredData";
            const filterUrl = TaRoleUserClaim.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TaRoleUserClaim.formatFiltered(res.data));
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
            role_id: d.role_id,
            clm_view: d.clm_view,
            clm_create: d.clm_create,
            clm_update: d.clm_update,
            clm_export: d.clm_export,
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
        const baseUrl = "/taRoleUserClaim/getAudit";
        const filterUrl = TaRoleUserClaim.getFilterUrl(filter);
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
if (filter.com_id !== undefined) {
    url += "com_id=" + filter.com_id + "&";
}
if (filter.role_id !== undefined) {
    url += "role_id=" + filter.role_id + "&";
}
if (filter.clm_view !== undefined) {
    url += "clm_view=" + filter.clm_view + "&";
}
if (filter.clm_create !== undefined) {
    url += "clm_create=" + filter.clm_create + "&";
}
if (filter.clm_update !== undefined) {
    url += "clm_update=" + filter.clm_update + "&";
}
if (filter.clm_export !== undefined) {
    url += "clm_export=" + filter.clm_export + "&";
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

export default TaRoleUserClaim;