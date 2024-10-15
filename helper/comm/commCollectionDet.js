import API from "../../utils/api";

const CommCollectionDet = {

    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/commCollectionDet/insertRecord", data, {
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
            API.patch("/commCollectionDet/updateRecord", data, {
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
            const baseUrl = "/commCollectionDet/getRecord";
            const filterUrl = CommCollectionDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(CommCollectionDet.formatRecord(res.data));
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
                collect_name: d.collect_name,
                value_type_id: d.value_type_id,
                value_type_name: d.value_type_name,
                collect_of_name: d.collect_of_name,
                lc_status_name: d.lc_status_name,
                collect_of_id: d.collect_of_id,
                function_name: d.function_name,
                funct_name: d.funct_name,
                descr: d.descr,
                lc_status_id: d.lc_status_id,
                is_active: d.is_active,
                created_by: d.created_by,

            });
        }
        return formatted;
    },

	getPageDet: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/commCollectionDet/getPageDet";
            const filterUrl = CommCollectionDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(CommCollectionDet.formatPageDet(res.data));
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
                collect_name: d.collect_name,
                value_type_id: d.value_type_id,
                value_type_name: d.value_type_name,
                collect_of_name: d.collect_of_name,
                lc_status_name: d.lc_status_name,
                collect_of_id: d.collect_of_id,
                function_name: d.function_name,
                funct_name: d.funct_name,
                descr: d.descr,
                lc_status_id: d.lc_status_id,
                is_active: d.is_active,
                created_by: d.created_by,

            });
        }
        return formatted;
    },	

    getFilteredData: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/commCollectionDet/getFilteredData";
            const filterUrl = CommCollectionDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(CommCollectionDet.formatFiltered(res.data));
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
                collect_name: d.collect_name,
                value_type_id: d.value_type_id,
                value_type_name: d.value_type_name,
                collect_of_name: d.collect_of_name,
                lc_status_name: d.lc_status_name,
                collect_of_id: d.collect_of_id,
                function_name: d.function_name,
                funct_name: d.funct_name,
                descr: d.descr,
                lc_status_id: d.lc_status_id,
                is_active: d.is_active,
                created_by: d.created_by,

            });
        }
        return formatted;
    },

	getAuditData: (filter) =>
        new Promise(function (resolve, reject) {
        const baseUrl = "/commCollectionDet/getAudit";
        const filterUrl = CommCollectionDet.getFilterUrl(filter);
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
if (filter.collect_name !== undefined) {
    url += "collect_name=" + filter.collect_name + "&";
}
if (filter.value_type_id !== undefined) {
    url += "value_type_id=" + filter.value_type_id + "&";
}
if (filter.collect_of_id !== undefined) {
    url += "collect_of_id=" + filter.collect_of_id + "&";
}
if (filter.function_name !== undefined) {
    url += "function_name=" + filter.function_name + "&";
}
if (filter.descr !== undefined) {
    url += "descr=" + filter.descr + "&";
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

export default CommCollectionDet;