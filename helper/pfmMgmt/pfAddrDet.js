import API from "../../utils/api";

const PfAddrDet = {

    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/pfAddrDet/insertRecord", data, {
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
            API.patch("/pfAddrDet/updateRecord", data, {
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
            const baseUrl = "/pfAddrDet/getRecord";
            const filterUrl = PfAddrDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PfAddrDet.formatRecord(res.data));
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
            base_com_id: d.base_com_id,
            base_com_rec_id: d.base_com_rec_id,
            addr_type_id: d.addr_type_id,
            addr_line_1: d.addr_line_1,
            addr_line_2: d.addr_line_2,
            addr_line_3: d.addr_line_3,
            city: d.city,
            postal_code: d.postal_code,
            country_id: d.country_id,
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
            const baseUrl = "/pfAddrDet/getPageDet";
            const filterUrl = PfAddrDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PfAddrDet.formatPageDet(res.data));
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
            base_com_id: d.base_com_id,
            base_com_rec_id: d.base_com_rec_id,
            addr_type_id: d.addr_type_id,
            addr_line_1: d.addr_line_1,
            addr_line_2: d.addr_line_2,
            addr_line_3: d.addr_line_3,
            city: d.city,
            postal_code: d.postal_code,
            country_id: d.country_id,
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
            const baseUrl = "/pfAddrDet/getFilteredData";
            const filterUrl = PfAddrDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PfAddrDet.formatFiltered(res.data));
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
            base_com_id: d.base_com_id,
            base_com_rec_id: d.base_com_rec_id,
            addr_type_id: d.addr_type_id,
            addr_line_1: d.addr_line_1,
            addr_line_2: d.addr_line_2,
            addr_line_3: d.addr_line_3,
            city: d.city,
            postal_code: d.postal_code,
            country_id: d.country_id,
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
        const baseUrl = "/pfAddrDet/getAudit";
        const filterUrl = PfAddrDet.getFilterUrl(filter);
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
if (filter.base_com_id !== undefined) {
    url += "base_com_id=" + filter.base_com_id + "&";
}
if (filter.base_com_rec_id !== undefined) {
    url += "base_com_rec_id=" + filter.base_com_rec_id + "&";
}
if (filter.addr_type_id !== undefined) {
    url += "addr_type_id=" + filter.addr_type_id + "&";
}
if (filter.addr_line_1 !== undefined) {
    url += "addr_line_1=" + filter.addr_line_1 + "&";
}
if (filter.addr_line_2 !== undefined) {
    url += "addr_line_2=" + filter.addr_line_2 + "&";
}
if (filter.addr_line_3 !== undefined) {
    url += "addr_line_3=" + filter.addr_line_3 + "&";
}
if (filter.city !== undefined) {
    url += "city=" + filter.city + "&";
}
if (filter.postal_code !== undefined) {
    url += "postal_code=" + filter.postal_code + "&";
}
if (filter.country_id !== undefined) {
    url += "country_id=" + filter.country_id + "&";
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

export default PfAddrDet;