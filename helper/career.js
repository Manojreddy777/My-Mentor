import API from "../utils/api";

const career = {
	get: () =>
		new Promise(function (resolve, reject) {
			API.get("/career")
				.then(async (res) => {
					console.log(res.data);
					resolve(career.format(res.data));
				})
				.catch((err) => {
					reject(err);
				});
		}),
	format: (data) => {
		const formatted = [];

		for (let d of data) {
			formatted.push({
				job_id: d.job_id,
				role: d.role,
				job_description: d.job_description,
				skills_required: d.skills_required,
				is_active: d.is_active == 0 ? false : true,
			});
		}

		return formatted;
	},
	getWithId: (job_id) =>
		new Promise(function (resolve, reject) {
			API.get("/career/id?job_id=" + job_id)
				.then(async (res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err);
				});
		}),
};

export default career;
