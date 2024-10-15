import API from "../utils/api";

const moduleName = {
	
        get: (filter) =>
                new Promise(function (resolve, reject) {
                        const baseUrl = "/module/get";
                        const filterUrl = moduleName.getFilterUrl(filter);
                        API.get(`${baseUrl}?${filterUrl}`)
				.then(async (res) => {
					resolve((res.data));
				})
				.catch((err) => {
					reject(err);
				});
		}),

	getById: (module_id) =>
           new Promise(function (resolve, reject) {
            API.get("/module/getid?module_id=" + module_id)
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),
        getguest: () =>
                new Promise(function (resolve, reject) {
                        API.get("/module/getguest")
                                .then(async (res) => {
                                        resolve((res.data));
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

export default moduleName;
