import API from "../utils/api";

const project = {
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
	
	get: () =>
		new Promise(function (resolve, reject) {
			API.get("/project")
				.then(async (res) => {
					resolve(project.format(res.data));
				})
				.catch((err) => {
					reject(err);
				});
		}),
	format: (data) => {
		const formatted = [];
		for (let d of data) {
			formatted.push({
                project_id: d.project_id,
                project_name: d.project_name,
			});
		}

		return formatted;
	},
};

export default project;
