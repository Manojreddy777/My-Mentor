import API from "../../utils/api";
import moment from "moment";

const TsEpic = {

    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/tsEpic/insertRecord", data, {
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
            API.patch("/tsEpic/updateRecord", data, {
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
            const baseUrl = "/tsEpic/getRecord";
            const filterUrl = TsEpic.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsEpic.formatRecord(res.data));
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
            epic_name: d.epic_name,
            display_name: d.display_name,
            project_id: d.project_id,
            project_name: d.project_name,
            assignment_type: d.assignment_type,
            billability_id: d.billability_id,
            billability_name: d.billability_name,
            start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
            end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
            duration: d.duration,
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
            const baseUrl = "/tsEpic/getPageDet";
            const filterUrl = TsEpic.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsEpic.formatPageDet(res.data));
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
            epic_name: d.epic_name,
            display_name: d.display_name,
            project_id: d.project_id,
            project_name: d.project_name,
            assignment_type: d.assignment_type,
            billability_id: d.billability_id,
            billability_name: d.billability_name,
            start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
            end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
            duration: d.duration,
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
            const baseUrl = "/tsEpic/getFilteredData";
            const filterUrl = TsEpic.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsEpic.formatFiltered(res.data));
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
            epic_name: d.epic_name,
            display_name: d.display_name,
            project_id: d.project_id,
            project_name: d.project_name,
            assignment_type: d.assignment_type,
            billability_id: d.billability_id,
            billability_name: d.billability_name,
            start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
            end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
            duration: d.duration,
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

    createEpic: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/tsEpic/createEpic", data)
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

    updateEpic: (data) =>
        new Promise(function (resolve, reject) {
            API.patch("/tsEpic/updateEpic", data)
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    get: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsEpic/get";
            const filterUrl = TsEpic.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsEpic.format(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    format: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.id,
                epic_name: d.epic_name,
                project_name: d.proj_name,
                project_id: d.project_id,
                bill: d.bill,
                bill_id: d.bill_id,
                start_date: d.start_date,
                end_date: d.end_date,
                dur: d.dur,
                comments: d.comments,
                is_active: d.is_active == 'active' ? true : false,
            });
        }
        return formatted;
    },

    getAuditData: (filter) =>
        new Promise(function (resolve, reject) {
        const baseUrl = "/tsEpic/getAudit";
        const filterUrl = TsEpic.getFilterUrl(filter);
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

    getAll: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsEpic/getAll";
            const filterUrl = TsEpic.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    console.log(res.data)
                    resolve(TsEpic.formatAll(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatAll: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.id,
                epic_name: d.epic_name,
                project_name: d.proj_name,
                bill: d.bill,
                start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
                end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
                dur: d.dur,
                is_active: d.is_active == 'active' ? true : false,
            });
        }
        return formatted;
    },

    // getRecord: (filter) =>
    //     new Promise(function (resolve, reject) {
    //         const baseUrl = "/tsEpic/getRecord";
    //         const filterUrl = TsEpic.getFilterUrl(filter);
    //         API.get(`${baseUrl}?${filterUrl}`, {
    //             headers: {
    //                 "x-access-token": global.config.accessToken,
    //             },
    //         })
    //             .then(async (res) => {
    //                 resolve(TsEpic.formatById(res.data));
    //             })
    //             .catch((err) => {
    //                 reject(err);
    //             });
    //     }),

    // formatById: (data) => {
    //     const formatted = [];

    //     for (let d of data) {
    //         formatted.push({
    //             id: d.id,
    //             epic_name: d.epic_name,
    //             project_name: d.proj_name,
    //             project_id: d.project_id,
    //             bill: d.bill,
    //             bill_id: d.bill_id,
    //             start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
    //             end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
    //             dur: d.dur,
    //             comments: d.comments,
    //             is_active: d.is_active == 'active' ? true : false,
    //         });
    //     }
    //     return formatted;
    // },

    getExport: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsEpic/getExport";
            const filterUrl = TsEpic.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsEpic.formatEx(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatEx: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.id,
                epic_name: d.epic_name,
                project_name: d.proj_name,
                project_id: d.project_id,
                bill: d.bill,
                bill_id: d.bill_id,
                start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
                end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
                dur: d.dur,
                comments: d.comments,
                is_active: d.is_active == 'active' ? true : false,
            });
        }
        return formatted;
    },

    getForDropdown: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsEpic/getForDropdown";
            const filterUrl = TsEpic.getFilterUrl(filter);
            console.log(`${baseUrl}?${filterUrl}`)
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsEpic.formatProj(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatProj: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.id,
                epic_name: d.epic_name,
                project_id: d.project_id,
                is_active: d.is_active == 'active' ? true : false,
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
if (filter.name !== undefined) {
    url += "name=" + filter.name + "&";
}
if (filter.display_name !== undefined) {
    url += "display_name=" + filter.display_name + "&";
}
if (filter.project_id !== undefined) {
    url += "project_id=" + filter.project_id + "&";
}
if (filter.assignment_type !== undefined) {
    url += "assignment_type=" + filter.assignment_type + "&";
}
if (filter.billability_id !== undefined) {
    url += "billability_id=" + filter.billability_id + "&";
}
if (filter.start_date !== undefined) {
    url += "start_date=" + filter.start_date + "&";
}
if (filter.end_date !== undefined) {
    url += "end_date=" + filter.end_date + "&";
}
if (filter.duration !== undefined) {
    url += "duration=" + filter.duration + "&";
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

export default TsEpic;