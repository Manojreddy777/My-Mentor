import API from "../../utils/api";

const PfApiDocument = {

    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/pfApiDocument/insertRecord", data, {
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
            API.patch("/pfApiDocument/updateRecord", data, {
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
            const baseUrl = "/pfApiDocument/getRecord";
            const filterUrl = PfApiDocument.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PfApiDocument.formatRecord(res.data));
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
            module_id: d.module_id,
            mod_name: d.mod_name,
            com_id: d.com_id,
            com_name: d.com_name,
            microservice_name: d.microservice_name,
            table_name: d.table_name,
            end_point_name: d.end_point_name,
            function_name: d.function_name,
            api_method_id: d.api_method_id,
            api_method_name: d.api_method_name,
            current_status_id: d.current_status_id,
            current_status_name: d.current_status_name,
            ref_request: d.ref_request,
            ref_response: d.ref_response,
            lc_status_id: d.lc_status_id,
            lc_status_name: d.lc_status_name,
            is_active: d.is_active,
            created_at: d.created_at,
            created_by: d.created_by,
            tnnt_id: d.tnnt_id,
            file_document: d.usecase9,

            });
        }
        return formatted;
    },

	getPageDet: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/pfApiDocument/getPageDet";
            const filterUrl = PfApiDocument.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PfApiDocument.formatPageDet(res.data));
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
            module_id: d.module_id,
            mod_name: d.mod_name,
            com_id: d.com_id,
            com_name: d.com_name,
            microservice_name: d.microservice_name,
            table_name: d.table_name,
            end_point_name: d.end_point_name,
            function_name: d.function_name,
            api_method_id: d.api_method_id,
            api_method_name: d.api_method_name,
            current_status_id: d.current_status_id,
            current_status_name: d.current_status_name,
            ref_request: d.ref_request,
            ref_response: d.ref_response,
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
            const baseUrl = "/pfApiDocument/getFilteredData";
            const filterUrl = PfApiDocument.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PfApiDocument.formatFiltered(res.data));
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
            module_id: d.module_id,
            mod_name: d.mod_name,
            com_id: d.com_id,
            microservice_name: d.microservice_name,
            table_name: d.table_name,
            end_point_name: d.end_point_name,
            function_name: d.function_name,
            api_method_id: d.api_method_id,
            api_method_name: d.api_method_name,
            current_status_id: d.current_status_id,
            ref_request: d.ref_request,
            ref_response: d.ref_response,
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
        const baseUrl = "/pfApiDocument/getAudit";
        const filterUrl = PfApiDocument.getFilterUrl(filter);
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
if (filter.module_id !== undefined) {
    url += "module_id=" + filter.module_id + "&";
}
// if (filter.com_id !== undefined) {
//     url += "com_id=" + filter.com_id + "&";
// }
if (filter.microservice_name !== undefined) {
    url += "microservice_name=" + filter.microservice_name + "&";
}
if (filter.table_name !== undefined) {
    url += "table_name=" + filter.table_name + "&";
}
if (filter.end_point_name !== undefined) {
    url += "end_point_name=" + filter.end_point_name + "&";
}
if (filter.function_name !== undefined) {
    url += "function_name=" + filter.function_name + "&";
}
if (filter.api_method_id !== undefined) {
    url += "api_method_id=" + filter.api_method_id + "&";
}
if (filter.api_method_name !== undefined) {
    url += "api_method_name=" + filter.api_method_name + "&";
}
if (filter.current_status_id !== undefined) {
    url += "current_status_id=" + filter.current_status_id + "&";
}
if (filter.ref_request !== undefined) {
    url += "ref_request=" + filter.ref_request + "&";
}
if (filter.ref_response !== undefined) {
    url += "ref_response=" + filter.ref_response + "&";
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
if (filter.search !== undefined) {
    url += "search=" + filter.search + "&";
}

            
        }
        return url;
    },
};

export default PfApiDocument;
