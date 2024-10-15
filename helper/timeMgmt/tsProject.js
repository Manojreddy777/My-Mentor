import API from "../../utils/api";
import moment from "moment";

const TsProject = {

    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/tsProject/insertRecord", data, {
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
            API.patch("/tsProject/updateRecord", data, {
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
            const baseUrl = "/tsProject/getRecord";
            const filterUrl = TsProject.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsProject.formatRecord(res.data));
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
                proj_name: d.proj_name,
                wbs_id: d.wbs_id,
                wbs_name: d.wbs_name,
                billability_id: d.billability_id,
                billability_name: d.billability_name,
                start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
                end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
                duration: d.duration,
                access_code: d.access_code,
                budget: d.budget,
                stakeholders: d.stakeholders,
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
            const baseUrl = "/tsProject/getPageDet";
            const filterUrl = TsProject.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsProject.formatPageDet(res.data));
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
                proj_name: d.proj_name,
                wbs_id: d.wbs_id,
                wbs_name: d.wbs_name,
                billability_id: d.billability_id,
                billability_name: d.billability_name,
                start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
                end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
                duration: d.duration,
                access_code: d.access_code,
                budget: d.budget,
                stakeholders: d.stakeholders,
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
            const baseUrl = "/tsProject/getFilteredData";
            const filterUrl = TsProject.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsProject.formatFiltered(res.data));
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
                proj_name: d.proj_name,
                wbs_id: d.wbs_id,
                wbs_name: d.wbs_name,
                billability_id: d.billability_id,
                billability_name: d.billability_name,
                start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
                end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
                duration: d.duration,
                access_code: d.access_code,
                budget: d.budget,
                stakeholders: d.stakeholders,
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

    createProject: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/tsProject/createProject", data)
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

    updateProject: (data) =>
        new Promise(function (resolve, reject) {
            API.patch("/tsProject/updateProject", data)
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    insertTeamMembers: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/tsProject/insertTeamMembers", data)
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

    updateTeamMembers: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/tsProject/updateTeamMembers", data)
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

    getNextProjectId: () =>
        new Promise(function (resolve, reject) {
            API.get("/tsProject/getNextId", {
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

    getTeamMembers: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsProject/getTeamMembers";
            const filterUrl = TsProject.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsProject.formatTeam(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatTeam: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.id,
                proj_id: d.proj_id,
                project_name: d.project_name,
                access_code: d.access_code,
                project_manager: d.project_manager,
                manager: JSON.parse(d.manager),
                staff: JSON.parse(d.staff),
            });
        }
        return formatted;
    },

    getAccessCode: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsProject/getAccessCode";
            const filterUrl = TsProject.getFilterUrl(filter);
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
    
    	getAuditData: (filter) =>
        new Promise(function (resolve, reject) {
        const baseUrl = "/tsProject/getAudit";
        const filterUrl = TsProject.getFilterUrl(filter);
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

    get: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsProject/get";
            const filterUrl = TsProject.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsProject.format(res.data));
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
                project_name: d.project_name,
                wbs_name: d.wbs_name,
                wbs_id: d.wbs_id,
                bill: d.bill,
                access_code: d.access_code,
                start_date: d.start_date,
                end_date: d.end_date,
                dur: d.dur,
                budget: d.budget,
                stakeholders: d.stakeholders,
                billability: d.billability,
                comments: d.comments,
                is_active: d.is_active == 'active' ? true : false,
            });
        }
        return formatted;
    },

    getUnAssignedProject: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsProject/getUnAssignedProject";
            const filterUrl = TsProject.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsProject.formatgetUnAssignedProject(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatgetUnAssignedProject: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.id,
                project_name: d.project_name,
                access_code: d.access_code,
            });
        }
        return formatted;
    },

    getAll: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsProject/getAll";
            const filterUrl = TsProject.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsProject.formatAll(res.data));
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
                project_name: d.project_name,
                wbs_name: d.wbs_name,
                wbs_id: d.wbs_id,
                bill: d.bill,
                start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
                end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
                dur: d.dur,
                is_active: d.is_active == 'active' ? true : false,
            });
        }
        return formatted;
    },

    getExport: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsProject/getRecord";
            const filterUrl = TsProject.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    console.log(res.data)
                    resolve(TsProject.formatex(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatex: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.id,
                project_name: d.project_name,
                wbs_name: d.wbs_name,
                wbs_id: d.wbs_id,
                bill: d.bill,
                access_code: d.access_code,
                start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
                end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
                dur: d.dur,
                budget: d.budget,
                stakeholders: d.stakeholders,
                billability: d.billability,
                comments: d.comments,
                is_active: d.is_active == 'active' ? true : false,
            });
        }
        return formatted;
    },

    getForDropdown: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsProject/getForDropdown";
            const filterUrl = TsProject.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TsProject.formatProj(res.data));
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
                project_name: d.project_name,
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
            if (filter.proj_name !== undefined) {
                url += "proj_name=" + filter.proj_name + "&";
            }
            if (filter.wbs_id !== undefined) {
                url += "wbs_id=" + filter.wbs_id + "&";
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
            if (filter.access_code !== undefined) {
                url += "access_code=" + filter.access_code + "&";
            }
            if (filter.budget !== undefined) {
                url += "budget=" + filter.budget + "&";
            }
            if (filter.stakeholders !== undefined) {
                url += "stakeholders=" + filter.stakeholders + "&";
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
        }
        return url;
    },
};

export default TsProject;