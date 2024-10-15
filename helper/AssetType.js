import API from "../utils/api";

const AssetType = {

    get: () =>
        new Promise(function (resolve, reject) {
            API.get("/assetType/get")
                .then(async (res) => {
                    resolve(AssetType.format(res.data));
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
                asset_type: d.asset_type,
            });
        }

        return formatted;
    },
};

export default AssetType;

