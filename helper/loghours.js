import API from "../utils/api";
import moment from "moment";

const loghours = {
    create: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/loghours", data)
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

    updateLog: (data) =>
        new Promise(function (resolve, reject) {
            API.patch("/loghours/update", data)
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    getlogdetails: (username) =>
        new Promise(function (resolve, reject) {
            API.get("/loghours/getdetails?user_name=" + username)
                .then(async (res) => {
                    resolve(loghours.format(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    format: (data) => {
        const formatted = [];

        data.forEach((d) => {
            formatted.push({
                log_id: d.log_id,
                task_id: d.task_id,
                date: moment(d.date).format("DD/MMM/YYYY"),
                project_name: d.project_name,
                wbs_name: d.wbs_name,
                work_items: d.work_items,
                billing: d.billing_status,
                loghours: d.hours,
                user_name: d.user_name,
                description: d.description,
            });
        });
        return formatted;
    },

    get: () =>
        new Promise(function (resolve, reject) {
            API.get("/loghours/getall")
                .then(async (res) => {
                    resolve(loghours.formatData(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    formatData: (data) => {
        const formatted = [];

        data.forEach((d) => {
            formatted.push({
                user_name: d.user_name,
                loghours: d.hours,
                open: false,
            });
        });

        return formatted;
    },

    getDayLog: (user_name, date) =>
        new Promise(function (resolve, reject) {
            API.post("/loghours/getDayLog", {
                user_name: user_name,
                date: date,
            })
                .then(async (res) => {
                    resolve(loghours.formatDayLog(res.data));
                    // if (res.status === 200) {
                    //     resolve(loghours.formatDayLog(res.data));
                    // } else {
                    //     reject(res.data.msg);
                    // }
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    formatDayLog: (data) => {
        const formatted = [];

        data.length > 0 &&
            data.forEach((d) => {
                formatted.push({
                    date: moment(d.date).format("DD/MM/YYYY"),
                    project_name: d.project_name,
                    work_items: d.work_items,
                    billing_status: d.billing_status,
                    loghours: d.hours,
                    wbs_name:d.wbs_name,
                });
            });

        return formatted;
    },

    getDayTotalHours: (user_name, date) =>
        new Promise(function (resolve, reject) {
            API.post("/loghours/getdaytotalhours", {
                user_name: user_name,
                date: date,
            })
                .then(async (res) => {
                    resolve(loghours.formatDayTotalHours(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    formatDayTotalHours: (data) => {
        const formatted = [];

        data.forEach((d) => {
            formatted.push({
                total_hours: d.hours,
                date: moment(d.date).format("DD/MM/YYYY"),
            });
        });

        return formatted;
    },

    getWeek: (username, month) =>
        new Promise(function (resolve, reject) {
            // API.get("/loghours/getweek?user_name=" + data)
            API.post("/loghours/getweek", {
                user_name: username,
                month: month,
            })
                .then(async (res) => {
                    resolve(loghours.formatgetWeek(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    formatgetWeek: (data) => {
        const formatted = [];

        data.forEach((d) => {
            formatted.push({
                week: d.week,
                hours: d.hours,
            });
        });
        return formatted;
    },

    getMonthHours: (user_name, date) =>
        new Promise(function (resolve, reject) {
            API.post("/loghours/monthhours", {
                user_name: user_name,
                date: date,
            })
                .then(async (res) => {
                    resolve(loghours.formatMonthHours(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    formatMonthHours: (data) => {
        const formatted = [];
        data.forEach((d) => {
            formatted.push({
                hours: d.hours,
            });
        });

        return formatted;
    },

    getWBS: () =>
        new Promise(function (resolve, reject) {
            API.get("/loghours/getWBS")
                .then(async (res) => {
                    resolve(loghours.formatWBS(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    formatWBS: (data) => {
        const formatted = [];
        for (let d of data) {
            formatted.push({
                wbs_id: d.wbs_id,
                wbs_name: d.wbs_name,
            });
        }

        return formatted;
    },

    getHoursPerDay: (username, month) =>
        new Promise(function (resolve, reject) {
            API.post("/loghours/getHoursPerDay", {
                user_name: username,
                month: month,
            })
                .then(async (res) => {
                    resolve(loghours.formatgetHoursPerDay(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    formatgetHoursPerDay: (data) => {
        const formatted = [];

        data.forEach((d) => {
            formatted.push({
                date: moment(d.date).format("DD/MMM/YYYY"),
                hours: d.hours,
            });
        });
        return formatted;
    },
};

export default loghours;
