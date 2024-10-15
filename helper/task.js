import API from "../utils/api";

const task = {
    create: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/task", data)
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

    update: (data) =>
        new Promise(function (resolve, reject) {
            API.patch("/task/update", data)
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

    get: () =>
        new Promise(function (resolve, reject) {
            API.get("/task/get")
                .then(async (res) => {
                    resolve(task.format(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    format: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                log_id:d.log_id,
                task_id: d.task_id,
                task_name: d.task_name,
                task_status: d.task_status,
                wbs: d.wbs,
                project_name: d.project_name,
                epic: d.epic,
                story: d.story,
                date: d.date,
                hours: d.hours,
                billing: d.billing,
            });
        }

        return formatted;
    },

    getEpic: () =>
    new Promise(function (resolve, reject) {
        API.get("/task/getEpic")
            .then(async (res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    }),
};

export default task;
