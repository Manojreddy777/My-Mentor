import API from "../../utils/api";

const TsTaskHandler = {

    getRecords: (filter) =>
       new Promise(function (resolve, reject) {
            const baseUrl = "/tsTask/getRecords";
            const filterUrl = TsTaskHandler.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
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
                us_name: d.us_name,
                name: d.name,
                prio: d.prio,
                wfs: d.wfs,
                desc: d.desc,
                bill: d.bill,
                start_date: d.start_date,
                end_date: d.end_date,
                dur: d.dur,
                task_type: d.task_type,
            });
        }
        return formatted;
    },
   
    getFilterUrl: (filter) => {
		let url = "";

		if (filter !== undefined) {
			if (filter.assigned_to !== undefined) {
				url += "assigned_to=" + filter.assigned_to + "&";
			}
			if (filter.selectedUS !== undefined) {
				url += "selectedUS=" + filter.selectedUS + "&";
			}
		}
		return url;
	},
};

export default TsTaskHandler;
