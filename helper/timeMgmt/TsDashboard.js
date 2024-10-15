import API from "../../utils/api";

const TsDash = {

    getEffortStatWbs: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsDashboard/getEffortStatWbs";
            const filterUrl = TsDash.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TsDash.formatwbs(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatwbs: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                wbs_id: d.wbs_id,
                wbs_name: d.wbs_name,
                tot_hrs: d.tot_hrs,
            });
        }
        return formatted;
    },

    getEffortStatProject: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsDashboard/getEffortStatProject";
            const filterUrl = TsDash.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TsDash.formatproject(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatproject: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                proj_id: d.project_id,
                proj_name: d.project_name,
                tot_hrs: d.tot_hrs,
                wbs_name: d.wbs_name,
            });
        }
        return formatted;
    },

    getEffortStatEpic: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsDashboard/getEffortStatsEpic";
            const filterUrl = TsDash.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TsDash.formatepic(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatepic: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                epic_id: d.epic_id,
                epic_name: d.epic_name,
                tot_hrs: d.tot_hrs,
                project_name: d.project_name,
                wbs_name: d.wbs_name,
            });
        }
        return formatted;
    },

    getEffortStatUS: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsDashboard/getEffortStatsUS";
            const filterUrl = TsDash.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TsDash.formatus(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatus: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                us_id: d.us_id,
                us_name: d.us_name,
                tot_hrs: d.tot_hrs,
                wbs_name: d.wbs_name,
                project_name: d.project_name,
                epic_name: d.epic_name,
            });
        }
        return formatted;
    },

    getEffortStatTask: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsDashboard/getEffortStatsTask";
            const filterUrl = TsDash.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(TsDash.formattask(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formattask: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                task_id: d.task_id,
                task_name: d.task_name,
                tot_hrs: d.tot_hrs,
            });
        }
        return formatted;
    },

    getEffortStatTot: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/tsDashboard/getEffortStatsTot";
            const filterUrl = TsDash.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
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
            if (filter.tnnt_id !== undefined) {
                url += "tnnt_id=" + filter.tnnt_id + "&";
            }
        }
        return url;
    },
};

export default TsDash;
