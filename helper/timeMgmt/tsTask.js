import API from "../../utils/api";
import moment from "moment";

const TsTask = {

    getPageDet: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsTask/getPageDet";
            const filterUrl = TsTask.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsTask.formatgetPg(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatgetPg: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.id,
                us_name: d.us_name,
                name: d.name,
                prio: d.prio,
                wfs: d.wfs,
                start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
                end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
                dur: d.dur,
                assigned_to: d.assigned_to,
                pe: d.pe,
                es: d.es == null ? "0" : d.es,
                comment_cnt:d.comment_cnt == null ? "0" : d.comment_cnt,
            });
        }
        return formatted;
    },

    getKanbanDet: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsTask/getKanbanDet";
            const filterUrl = TsTask.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsTask.formatgetPg(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatgetPg: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.id,
                task_name: d.name,
                descr: d.descr,
                wfs: d.wfs,
                assigned_to: d.assigned_to,
                prio: d.prio
            });
        }
        return formatted;
    },

    getRecord: (username) =>
        new Promise(function (resolve, reject) {
            API.get("/tsTask/getRecord?user_name=" + username)
                .then(async (res) => {
                    resolve(TsTask.format(res.data));
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
            });
        }
        return formatted;
    },
    getRecordById: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsTask/getRecordById";
            const filterUrl = TsTask.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsTask.formatById(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
        formatById: (data) => {
            const formatted = [];
    
            for (let d of data) {
                formatted.push({
                    id: d.id,
                    us_id: d.us_id,
                    us_name: d.us_name,
                    role_id: d.role_id,
                    name: d.name,
                    prio: d.prio,
                    wfs_id: d.wfs_id,
                    desc: d.my_desc,
                    bill_id: d.bill_id,
                    start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
                    end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
                    dur: d.dur,
                    task_type: d.task_type,
                    lesson_learned: d.lesson_learned,
                    assigned_to: d.assigned_to,
                    files: JSON.parse(d.files),
                });
            }
            return formatted;
        },

    getRecordDropD: (username) =>
        new Promise(function (resolve, reject) {
            API.get("/tsTask/getRecord?user_name=" + username)
                .then(async (res) => {
                    resolve(TsTask.formatrdd(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatrdd: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.id,
                name: d.name,
            });
        }
        return formatted;
    },

    create: (data, component_id, custom_value) =>
        new Promise(function (resolve, reject) {
            API.post("/task", { data: data, component_id: component_id, custom_value: custom_value })
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

    updateTask: (data, component_id, custom_values) =>
        new Promise(function (resolve, reject) {
            API.patch("/task/update", { data: data, component_id: component_id, custom_values: custom_values })
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    createSubTask: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/task/createSubTask", data)
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

    insertSubTask: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/task/insertSubTask", data)
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
    updateSubTask: (data) =>
        new Promise(function (resolve, reject) {
            API.patch("/task/updateSubTask", data)
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    getSubTask: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsTask/getSubTask";
            const filterUrl = TsTask.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TsTask.formatSubTask(res.data));
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
                sub_task_name: d.subtask_name,
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
            });
        }
        return formatted;
    },

    getDropdownTaskForOps: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsTask/getDropdownTaskForOps";
            const filterUrl = TsTask.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TsTask.formatTask(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatTask: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                task_id: d.id,
                taskName: d.name,
            });
        }
        return formatted;
    },
    getOps: () =>
        new Promise(function (resolve, reject) {
            API.get("/tsTask/getOps")
                .then(async (res) => {
                    resolve(TsTask.formatOps(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatOps: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.id,
                us_id: d.us_id,
                role_id: d.role_id,
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
                effort_hrs: d.effort_hrs == null ? " 0" : d.effort_hrs,
                task_type: d.task_type,
                lesson_learned: d.lesson_learned,
                assigned_to: d.assigned_to,
                total_subTask: d.total_subTask,
                pe: d.pe,
                es: d.es == null ? " 0" : d.es,
                subTask: JSON.parse(d.subTask)
            });
        }
        return formatted;
    },

    getForDropdownUser: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsTask/getForDropdownUser";
            const filterUrl = TsTask.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TsTask.formatuser(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatuser: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                task_id: d.id,
                taskName: d.name,
            });
        }
        return formatted;
    },

    getAll: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsTask/getAll";
            const filterUrl = TsTask.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsTask.formatAll(res.data));
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
                us_name: d.us_name,
                name: d.name,
                prio: d.prio,
                wfs: d.wfs,
                start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
                end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
                dur: d.dur,
                effort_hrs: d.effort_hrs == null ? " 0" : d.effort_hrs,
                pe: d.pe,
                es: d.es == null ? " 0" : d.es,
                assigned_to: d.assigned_to,
                comment_cnt:d.comment_cnt == null ? "0" : d.comment_cnt,
                descr_audio: d.descr_audio,
            });
        }
        return formatted;
    },

    getForDropdown: (username) =>
        new Promise(function (resolve, reject) {
            API.get("/tsTask/getForDropdown?user_name=" + username)
                .then(async (res) => {
                    resolve(TsTask.formatForDropdown(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    getPerTeamTaskDropdown: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsTask/getPerTeamTaskDropdown";
            const filterUrl = TsTask.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TsTask.formatForDropdown(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatForDropdown: (data) => {
        const formatted = [];
        for (let d of data) {
            formatted.push({
                task_id: d.task_id,
                task_name: d.task_name,
            });
        }
        return formatted;
    },


    getTaskStatus: () =>
        new Promise(function (resolve, reject) {
            API.get("/tsTask/getTaskStatus")
                .then(async (res) => {
                    resolve(TsTask.formatstatus(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    formatstatus: (data) => {
        const formatted = [];
        for (let d of data) {
            formatted.push({
                id: d.id,
                status_name: d.status_name,
            });
        }
        return formatted;
    },

    updateTaskStatus: (id, wfs) =>
    new Promise(function (resolve, reject) {
        API.patch("/TsTask/updateStatus", { id: id, wfs: wfs },  {
            headers: {
            "x-access-token": global.config.accessToken,
        }
        },)
            .then(async (res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    }),

    getFilteredData: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsTask/getFilteredData";
            const filterUrl = TsTask.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TsTask.formatfd(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatfd: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.id,
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
                effort_hrs: d.effort_hrs == null ? " 0" : d.effort_hrs,
                task_type: d.task_type,
                lesson_learned: d.lesson_learned,
                assigned_to: d.assigned_to,
                role_id: d.role_id,
                pe: d.pe,
                es: d.es == null ? " 0" : d.es,
                access_code: d.access_code,
                project_stakeholder: d.project_stakeholder,
                project_manager: d.project_manager,
                total_subTask: d.total_subTask,
                subTask: JSON.parse(d.subTask),
                comment_cnt: d.comment_cnt == null ? 0 : d.comment_cnt,
            });
        }
        return formatted;
    },

    getCustomValues: (task_id) =>
        new Promise(function (resolve, reject) {
            API.get("/tsTask/getCustomValues?task_id=" + task_id)
                .then(async (res) => {
                    resolve(TsTask.formatCustomValues(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatCustomValues: (data) => {
        const formatted = [];

        Object.entries(data[0]).slice(2).map(([key, value]) => (
            formatted.push({ [key]: value })
        ));
        return formatted;
    },

    getMyTaskStatus: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsTask/getMyTaskStatus";
            const filterUrl = TsTask.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TsTask.formatStatus(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatStatus: (data) => {
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

    getMyTaskOverdue: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsTask/getMyTaskOverdue";
            const filterUrl = TsTask.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TsTask.formatOverdue(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatOverdue: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                task_id: d.task_id,
                task_name: d.task_name,
                status_name: d.status_name,
                start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
                end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
                due_count: d.due_count,
            });
        }
        return formatted;
    },

    updateStatus: (data) =>
        new Promise(function (resolve, reject) {
            API.patch("/tsTask/updateStatus", data, {
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


    	getAuditData: (filter) =>
        new Promise(function (resolve, reject) {
        const baseUrl = "/tsTask/getAudit";
        const filterUrl = TsTask.getFilterUrl(filter);
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
            if (filter.task_id !== undefined) {
                url += "id=" + filter.task_id + "&";
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
            if (filter.task_name !== undefined) {
                url += "task_name=" + filter.task_name + "&";
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

export default TsTask;
