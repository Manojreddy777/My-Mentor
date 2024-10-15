import API from "../../utils/api";

const TsBill = {

    get: () =>
        new Promise(function (resolve, reject) {
            API.get("/tsBill/get")
                .then(async (res) => {
                    resolve(TsBill.format(res.data));
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
                name: d.name,
                desc: d.desc,
            });
        }
        return formatted;
    },
};

export default TsBill;

