import moment from "moment";
import API from "../utils/api";

const audit = {
	update: (data) =>
		new Promise(function (resolve, reject) {
			API.post("/audit/logout", data, {
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
	getDet: () =>
		new Promise(function (resolve, reject) {
			API.get("/audit/getlogin")
				.then(async (res) => {
					resolve(audit.formatSession(res.data));
				})
				.catch((err) => {
					reject(err);
				});
		}),
	formatSession: (data) => {
		const formattedData = [];

		for (const d of data) {
			formattedData.push({
				clt_id: d.clt_id,
				account_name: d.account_name,
				session_id: d.session_id,
				login_timestamp: moment(d.login_timestamp).format("hh:mm A, DD/MM/YYYY"),
				logoff_timestamp: d.logoff_timestamp == null ? "" : moment(d.logoff_timestamp).format("hh:mm A, DD/MM/YYYY"),
				device: d.device,
			});
		}

		return formattedData;
	},

	create: (data) =>
		new Promise(function (resolve, reject) {
			API.post("/audit/details", data)
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
			API.get("/audit/updates", {
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
};

export default audit;
