import moment from "moment";
import API from "../../utils/api";

const TsTimesheet = {

    create: (data, component_id, custom_value) =>
        new Promise(function (resolve, reject) {
            API.post("/loghours", { data: data, component_id: component_id, custom_value: custom_value })
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


    update: (data, component_id, custom_values) =>
        new Promise(function (resolve, reject) {
            API.patch("/tsTimesheet/updateRecord", { data: data, component_id: component_id, custom_values: custom_values })
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    getleavetype: (username) =>
        new Promise(function (resolve, reject) {
            API.get("/tsTimesheet/getleaves?user_name=" + username)
                .then(async (res) => {
                    resolve(TsTimesheet.formatleave(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatleave: (data) => {
        const formatted = [];
        for (let d of data) {
            formatted.push({
                leave_name: d.leave_name,
                alloc_leaves: d.alloc_leaves,
                alloc_year: d.alloc_year,
                tot_consumed: d.tot_consumed
            });
        }
        return formatted;
    },

    getmyleavelist: (username) =>
        new Promise(function (resolve, reject) {
            API.get("/tsTimesheet/getleavelist?user_name=" + username)
                .then(async (res) => {
                    resolve(TsTimesheet.formatlist(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatlist: (data) => {
        const formatted = [];
        for (let d of data) {
            formatted.push({
                leave_date: moment(d.leave_date).format("DD-MMM-YYYY"),
                leave_type: d.leave_type,
                hrs_rec: d.hrs_rec,
                remarks: d.remarks
            });
        }
        return formatted;
    },

    getlist: (username) =>
        new Promise(function (resolve, reject) {
            API.get("/tsTimesheet/getlist?user_name=" + username)
                .then(async (res) => {
                    resolve(TsTimesheet.formatlistall(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatlistall: (data) => {
        const formatted = [];
        for (let d of data) {
            formatted.push({
                task_id: d.task_id,
                task_name: d.task_name,
                log_date: d.log_date == null ? "" : moment(d.log_date).format("DD-MMM-YYYY"),
                log_hrs: d.log_hrs,
                log_descr: d.log_desc,
                log_id: d.log_id,
                account_name: d.account_name,
                approver_remarks: d.approver_remarks,
            });
        }
        return formatted;
    },

    getlistFull: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsTimesheet/getlistFull";
            const filterUrl = TsTimesheet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TsTimesheet.formatlistFull(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatlistFull: (data) => {
        const formatted = [];
        for (let d of data) {
            formatted.push({
                task_id: d.task_id,
                task_name: d.task_name,
                log_date: d.log_date == null ? "" : moment(d.log_date).format("DD-MMM-YYYY"),
                log_hrs: d.log_hrs,
                log_descr: d.log_desc,
                log_by: d.account_name,
                approver_name: d.approver_name,
                approver_status: d.approver_status,
                log_id: d.log_id,
                account_name: d.account_name,
                approver_remarks: d.approver_remarks,
            });
        }
        return formatted;
    },

    getAll: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsTimesheet/getAll";
            const filterUrl = TsTimesheet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsTimesheet.formatAll(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatAll: (data) => {
        const formatted = [];
        for (let d of data) {
            formatted.push({
                task_name: d.task_name,
                log_date: d.log_date == null ? "" : moment(d.log_date).format("DD-MMM-YYYY"),
                log_hrs: d.log_hrs,
                log_descr: d.log_desc,
                log_by: d.account_name,
                approver_name: d.approver_name,
                approver_status: d.approver_status,
                log_id: d.log_id,
            });
        }
        return formatted;
    },

    getExport: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsTimesheet/getExport";
            const filterUrl = TsTimesheet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsTimesheet.formatExport(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatExport: (data) => {
        const formatted = [];
        for (let d of data) {
            formatted.push({
                task_name: d.task_name,
                log_date: d.log_date == null ? "" : moment(d.log_date).format("DD-MMM-YYYY"),
                log_hrs: d.log_hrs,
                log_descr: d.log_desc,
                log_by: d.account_name,
                approver_name: d.approver_name,
                approver_status: d.approver_status,
                log_id: d.log_id,
            });
        }
        return formatted;
    },

    getAllByUserName: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsTimesheet/getAllByUserName";
            const filterUrl = TsTimesheet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsTimesheet.formatAllByUserName(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatAllByUserName: (data) => {
        const formatted = [];
        for (let d of data) {
            formatted.push({
                task_name: d.task_name,
                log_date: d.log_date == null ? "" : moment(d.log_date).format("DD-MMM-YYYY"),
                log_hrs: d.log_hrs,
                log_id: d.log_id,
                log_descr: d.log_desc,
            });
        }
        return formatted;
    },

    getRecordById: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsTimesheet/getRecordById";
            const filterUrl = TsTimesheet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsTimesheet.formatById(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatById: (data) => {
        const formatted = [];
        for (let d of data) {
            formatted.push({
                log_id: d.log_id,
                task_id: d.task_id,
                log_date: d.log_date,
                log_hrs: d.log_hrs,
                log_descr: d.log_desc,
                approver_name: d.approver_name,
                approver_status: d.approver_status,
                account_name: d.account_name,
            });
        }
        return formatted;
    },
    getRecord: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsTimesheet/getRecord";
            const filterUrl = TsTimesheet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsTimesheet.formatId(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatId: (data) => {
        const formatted = [];
        for (let d of data) {
            formatted.push({
                task_id: d.task_id,
                task_name: d.task_name,
                log_date: d.log_date,
                log_hrs: d.log_hrs,
                log_descr: d.log_desc,
                log_id: d.log_id,
            });
        }
        return formatted;
    },



    getFilteredData: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsTimesheet/getFilteredData";
            const filterUrl = TsTimesheet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TsTimesheet.formatfd(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatfd: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                task_id: d.task_id,
                task_name: d.task_name,
                log_date: d.log_date == null ? "" : moment(d.log_date).format("DD-MMM-YYYY"),
                log_hrs: d.log_hrs,
                log_descr: d.log_desc,
                log_by: d.account_name,
                approver_name: d.approver_name,
                approver_status: d.approver_status,
                log_id: d.log_id,
                account_name: d.account_name,
                approver_remarks: d.approver_remarks,
            });
        }
        return formatted;
    },

    approveLog: (data) =>
        new Promise(function (resolve, reject) {
            API.patch("/tsTimesheet/approveLog", data)
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    getMissingTimesheet: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsTimesheet/getMissingTimesheet";
            const filterUrl = TsTimesheet.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TsTimesheet.formatMissing(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatMissing: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                staff_name: d.account_name,
            });
        }
        return formatted;
    },

    getFilterUrl: (filter) => {
        let url = "";

        if (filter !== undefined) {
            if (filter.account_name !== undefined) {
                url += "account_name=" + filter.account_name + "&";
            }
            if (filter.wfs !== undefined) {
                url += "wfs=" + filter.wfs + "&";
            }
            if (filter.log_id !== undefined) {
                url += "log_id=" + filter.log_id + "&";
            }
            if (filter.task_id !== undefined) {
                url += "id=" + filter.task_id + "&";
            }
            if (filter.access_code !== undefined) {
                url += "access_code=" + filter.access_code + "&";
            }
            if (filter.project_manager !== undefined) {
                url += "project_manager=" + filter.project_manager + "&";
            }
            if (filter.tnnt_id !== undefined) {
                url += "tnnt_id=" + filter.tnnt_id + "&";
            }
        }
        return url;
    },
};

export default TsTimesheet;
