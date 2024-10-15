import API from "../../utils/api";

const CommScheduler = {

    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/pfCronDet/insertRecord", data, {
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
            API.patch("/pfCronDet/updateRecord", data, {
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
            const baseUrl = "/pfCronDet/getRecord";
            const filterUrl = CommScheduler.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(CommScheduler.formatRecord(res.data));
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
                sch_minute: d.sch_minute,
                sch_hour: d.sch_hour,
                sch_day: d.sch_day,
                sch_month: d.sch_month,
                sch_week: d.sch_week,
                process_id: d.process_id,             
                lc_status_id: d.lc_status_id,
                is_active: d.is_active,
                created_by: d.created_by,

            });
        }
        return formatted;
    },

    getPageDet: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/pfCronDet/getPageDet";
            const filterUrl = CommScheduler.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(CommScheduler.formatPageDet(res.data));
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
                sch_minute: d.sch_minute,
                sch_hour: d.sch_hour,
                sch_day: d.sch_day,
                sch_month: d.sch_month,
                sch_week: d.sch_week,
                process_id: d.process_id,             
                lc_status_id: d.lc_status_id,
                is_active: d.is_active,
                created_by: d.created_by,

            });
        }
        return formatted;
    },

    getFilteredData: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/pfCronDet/getFilteredData";
            const filterUrl = CommScheduler.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(CommScheduler.formatFiltered(res.data));
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
                sch_minute: d.sch_minute,
                sch_hour: d.sch_hour,
                sch_day: d.sch_day,
                sch_month: d.sch_month,
                sch_week: d.sch_week,
                process_id: d.process_id,             
                lc_status_id: d.lc_status_id,
                is_active: d.is_active,
                created_by: d.created_by,

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
            if (filter.sch_minute !== undefined) {
                url += "sch_minute=" + filter.sch_minute + "&";
            }
            if (filter.sch_hour !== undefined) {
                url += "sch_hour=" + filter.sch_hour + "&";
            }
            if (filter.sch_day !== undefined) {
                url += "sch_day=" + filter.sch_day + "&";
            }
            if (filter.sch_month !== undefined) {
                url += "sch_month=" + filter.sch_month + "&";
            }
            if (filter.sch_week !== undefined) {
                url += "sch_week=" + filter.sch_week + "&";
            }
            if (filter.process_id !== undefined) {
                url += "process_id=" + filter.process_id + "&";
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

export default CommScheduler;