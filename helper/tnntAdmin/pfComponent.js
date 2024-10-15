import API from "../../utils/api";

const PfComponent = {

    getAllActive: () =>
        new Promise(function (resolve, reject) {
            API.get("/pfComponent/getAllActive")
                .then(async (res) => {
                    resolve(PfComponent.format(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    format: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.com_id,
                com_name: d.com_name,
                mod_id: d.mod_id,
                mod_name: d.mod_name,
                abbr: d.abbr,

            });
        }
        return formatted;
    },
    getForDropDown: () =>
        new Promise(function (resolve, reject) {
            API.get("/pfComponent/getForDropDown")
                .then(async (res) => {
                    resolve(PfComponent.formatdd(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatdd: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.com_id,
                com_name: d.com_name,
            });
        }
        return formatted;
    },
};

export default PfComponent;
