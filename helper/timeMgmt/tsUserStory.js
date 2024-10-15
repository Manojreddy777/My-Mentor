import API from "../../utils/api";
import moment from "moment";

const TsUS = {

    createUserStory: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/tsUserStory/createUserStory", data)
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

    updateUserStory: (data) =>
        new Promise(function (resolve, reject) {
            API.patch("/tsUserStory/updateUserStory", data)
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    get: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsUserStory/get";
            const filterUrl = TsUS.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsUS.format(res.data));
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
                epic_id: d.epic_id,
                us_name: d.us_name,
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

    getAll: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsUserStory/getAll";
            const filterUrl = TsUS.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsUS.formatAll(res.data));
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
                us_name: d.us_name,
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
    //         const baseUrl = "/tsUserStory/getRecord";
    //         const filterUrl = TsUS.getFilterUrl(filter);
    //         API.get(`${baseUrl}?${filterUrl}`, {
    //             headers: {
    //                 "x-access-token": global.config.accessToken,
    //             },
    //         })
    //             .then(async (res) => {
    //                 resolve(TsUS.formatRec(res.data));
    //             })
    //             .catch((err) => {
    //                 reject(err);
    //             });
    //     }),

    // formatRec: (data) => {
    //     const formatted = [];

    //     for (let d of data) {
    //         formatted.push({
    //             id: d.id,
    //             epic_id: d.epic_id,
    //             us_name: d.us_name,
    //             bill_id: d.bill_id,
    //             start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
    //             end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
    //             dur: d.dur,
    //             is_active: d.is_active == 'active' ? true : false,
    //         });
    //     }
    //     return formatted;
    // },

    getExport: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsUserStory/getAll";
            const filterUrl = TsUS.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsUS.formatEx(res.data));
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
                us_name: d.us_name,
                bill: d.bill,
                start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
                end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
                dur: d.dur,
                is_active: d.is_active == 'active' ? true : false,
            });
        }
        return formatted;
    },

    getfortask: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsUserStory/getfortask";
            const filterUrl = TsUS.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsUS.formattt(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    getforsubtask: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsUserStory/getforsubtask";
            const filterUrl = TsUS.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsUS.formattt(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formattt: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                my_data: d.my_data,
                us_id: d.us_id,
            });
        }
        return formatted;
    },

    getForDropdown: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsUserStory/getForDropdown";
            const filterUrl = TsUS.getFilterUrl(filter);
            console.log(`${baseUrl}?${filterUrl}`)
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsUS.formatDd(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatDd: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                my_data: d.us_name,
                us_id: d.us_id,
                access_code: d.access_code,
            });
        }
        return formatted;
    },

    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/tsUserStory/insertRecord", data, {
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
            API.patch("/tsUserStory/updateRecord", data, {
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
            const baseUrl = "/tsUserStory/getRecord";
            const filterUrl = TsUS.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsUS.formatRecord(res.data));
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
            us_name: d.us_name,
            epic_id: d.epic_id,
			epic_name: d.epic_name,
            billability_id: d.billability_id,
			billability_name: d.billability_name,
            start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
            end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
            duration: d.duration,
            display_name: d.display_name,
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
            const baseUrl = "/tsUserStory/getPageDet";
            const filterUrl = TsUS.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsUS.formatPageDet(res.data));
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
            us_name: d.us_name,
            epic_id: d.epic_id,
			epic_name: d.epic_name,
            billability_id: d.billability_id,
			billability_name: d.billability_name,
            start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
            end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
            duration: d.duration,
            display_name: d.display_name,
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
            const baseUrl = "/tsUserStory/getFilteredData";
            const filterUrl = TsUS.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsUS.formatFiltered(res.data));
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
            us_name: d.us_name,
            epic_id: d.epic_id,
			epic_name: d.epic_name,
            billability_id: d.billability_id,
			billability_name: d.billability_name,
            start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
            end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
            duration: d.duration,
            display_name: d.display_name,
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
        const baseUrl = "/tsUserStory/getAudit";
        const filterUrl = TsUserStory.getFilterUrl(filter);
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
            if (filter.us_name !== undefined) {
                url += "us_name=" + filter.us_name + "&";
            }
            if (filter.epic_id !== undefined) {
                url += "epic_id=" + filter.epic_id + "&";
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
            if (filter.display_name !== undefined) {
                url += "display_name=" + filter.display_name + "&";
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
            if (filter.access_code !== undefined) {
                url += "access_code=" + filter.access_code + "&";
            }
            if (filter.tnnt_id !== undefined) {
                url += "tnnt_id=" + filter.tnnt_id + "&";
            }
            if (filter.ref_id !== undefined) { 
 url += "ref_id=" + filter.ref_id + "&";
}
        }
        return url;
    },
};

export default TsUS;
