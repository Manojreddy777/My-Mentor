import API from "../../utils/api";
import moment from "moment";

const TsSubTask = {
    getSubTask: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsSubTask/getSubTask";
            const filterUrl = TsSubTask.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TsSubTask.formatSubTask(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    getFilteredData: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsSubTask/getFilteredData";
            const filterUrl = TsSubTask.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TsSubTask.formatSubTask(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatSubTask: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.id,
                sub_task_id: d.subtask_id,
                subtask_name: d.subtask_name,
                us_id: d.us_id,
                us_name: d.us_name,
                name: d.name,
                prio: d.prio,
                wfs_id: d.wfs_id,
                wfs: d.wfs,
                desc: d.my_desc,
                bill_id: d.bill_id,
                bill: d.bill,
                start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
                end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
                dur: d.dur,
                task_type: d.task_type,
                lesson_learned: d.lesson_learned,
                assigned_to: d.assigned_to,
                role_id: d.role_id,
                project_stakeholder: d.project_stakeholder,
                files: JSON.parse(d.files),
            });
        }
        return formatted;
    },

    getMySubTaskStatus: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsSubTask/getMySubTaskStatus";
            const filterUrl = TsSubTask.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TsSubTask.formatLeave(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatLeave: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                status_name: d.status_name,
                status_count: d.status_count,
                total_count: d.total_count,
                percentage: d.percentage,
            });
        }
        return formatted;
    },

    	getAuditData: (filter) =>
        new Promise(function (resolve, reject) {
        const baseUrl = "/tsSubtask/getAudit";
        const filterUrl = TsSubtask.getFilterUrl(filter);
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
            if (filter.assigned_to !== undefined) {
                url += "assigned_to=" + filter.assigned_to + "&";
            }
            if (filter.wfs !== undefined) {
                url += "wfs=" + filter.wfs + "&";
            }
            if (filter.prio !== undefined) {
                url += "prio=" + filter.prio + "&";
            }
            if (filter.project_id !== undefined) {
                url += "project_id=" + filter.project_id + "&";
            }
            if (filter.task_id !== undefined) {
                url += "task_id=" + filter.task_id + "&";
            }
            if (filter.task_name !== undefined) {
                url += "task_name=" + filter.task_name + "&";
            }
            if (filter.subtask_name !== undefined) {
                url += "subtask_name=" + filter.subtask_name + "&";
            }
            if (filter.us_id !== undefined) {
                url += "us_id=" + filter.us_id + "&";
            }
            if (filter.epic_id !== undefined) {
                url += "epic_id=" + filter.epic_id + "&";
            }
            if (filter.access_code !== undefined) {
                url += "access_code=" + filter.access_code + "&";
            }
            if (filter.username !== undefined) {
                url += "username=" + filter.username + "&";
            }
            if (filter.search !== undefined) {
                url += "search=" + filter.search + "&";
            }
            if (filter.tnnt_id !== undefined) {
                url += "tnnt_id=" + filter.tnnt_id + "&";
            }
            if (filter.start_date !== "Invalid date" && filter.start_date !== undefined) {
                url += "start_date=" + filter.start_date + "&";
            }
            if (filter.end_date !== "Invalid date" && filter.end_date !== undefined) {
                url += "end_date=" + filter.end_date + "&";
            }
            if (filter.ref_id !== undefined) { 
              url += "ref_id=" + filter.ref_id + "&";
            }
        }
        return url;
    },

};

export default TsSubTask;
