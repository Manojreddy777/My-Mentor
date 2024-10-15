import API from "../utils/api";

const application = {
	create: (data) =>
		new Promise(function (resolve, reject) {
			API.post("/application", data)
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
};

export default application;
