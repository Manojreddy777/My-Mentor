import API from "../../utils/api";
import moment from "moment";
const AimTrxDet = {

    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/aimTrxDet/insertRecord", data, {
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
            API.patch("/aimTrxDet/updateRecord", data, {
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
            const baseUrl = "/aimTrxDet/getRecord";
            const filterUrl = AimTrxDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(AimTrxDet.formatRecord(res.data));
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
                trx_date: d.trx_date= null ? "" : moment(d.trx_date ).format("DD/MM/YYYY"),
                amount: d.amount,
                category_id: d.category_id,
                category_name: d.category_name,
                bank_id: d.bank_id,
                bank_name: d.bank_name,
                account_nr: d.account_nr,
                note: d.note,
                attachment1: d.attachment1,
                trx_type_id: d.trx_type_id,
                trx_type_name: d.trx_type_name,
                ai_assist_us_id: d.ai_assist_us_id,
                ai_assist_us_name: d.ai_assist_us_name,
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
            const baseUrl = "/aimTrxDet/getPageDet";
            const filterUrl = AimTrxDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(AimTrxDet.formatPageDet(res.data));
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
            trx_date: d.trx_date == null ? "" : moment(d.trx_date ).format("DD/MM/YYYY"),
            amount: d.amount,
            category_id: d.category_id,
            category_name: d.category_name,
            bank_id: d.bank_id,
            bank_name: d.bank_name,
            note: d.note,
            attachment1: d.attachment1,
            trx_type_id: d.trx_type_id,
            trx_type_name: d.trx_type_name,
            ai_assist_us_id: d.ai_assist_us_id,
            ai_assist_us_name: d.ai_assist_us_name,
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
            const baseUrl = "/aimTrxDet/getFilteredData";
            const filterUrl = AimTrxDet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(AimTrxDet.formatFiltered(res.data));
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
                trx_date: d.trx_date= null ? "" : moment(d.trx_date ).format("DD/MM/YYYY"),
                amount: d.amount,
                category_id: d.category_id,
                category_name: d.category_name,
                bank_id: d.bank_id,
                bank_name: d.bank_name,
                account_nr: d.account_nr,
                note: d.note,
                attachment1: d.attachment1,
                trx_type_id: d.trx_type_id,
                trx_type_name: d.trx_type_name,
                ai_assist_us_id: d.ai_assist_us_id,
                ai_assist_us_name: d.ai_assist_us_name,
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
if (filter.trx_date !== undefined) {
    url += "trx_date=" + filter.trx_date + "&";
}
if (filter.amount !== undefined) {
    url += "amount=" + filter.amount + "&";
}
if (filter.category_id !== undefined) {
    url += "category_id=" + filter.category_id + "&";
}
if (filter.bank_id !== undefined) {
    url += "bank_id=" + filter.bank_id + "&";
}
if (filter.note !== undefined) {
    url += "note=" + filter.note + "&";
}
if (filter.attachment1 !== undefined) {
    url += "attachment1=" + filter.attachment1 + "&";
}
if (filter.trx_type_id !== undefined) {
    url += "trx_type_id=" + filter.trx_type_id + "&";
}
if (filter.ai_assist_us_id !== undefined) {
    url += "ai_assist_us_id=" + filter.ai_assist_us_id + "&";
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

            
        }
        return url;
    },
};

export default AimTrxDet;