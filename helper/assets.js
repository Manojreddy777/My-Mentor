import API from "../utils/api";
import Constants from "../constants/api";

const assets = {
	upload: (file, name) =>
		new Promise(function (resolve, reject) {
			const formData = new FormData();

			formData.append("file", file, file.name);
			formData.append("name", name);

			API.post("/asset", formData)
				.then(async (res) => {
					if (res.status === 200) {
						if (res.data.code == 200) {
							res.data.url =
								Constants.BASE_URL + "/" + res.data.url;
						}
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

export default assets;
