import API from "../../utils/api";

const PfLabel = {

    getComLabel: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/PfLabel/getComLabel";
            const filterUrl = PfLabel.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`,{
                headers: {
                  "x-access-token": global.config.accessToken,
                },
              })
                .then(async (res) => {
                    resolve(res.data);
                    // resolve(PfLabel.formatfd(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    // formatfd: (data) => {
    //     const formatted = [];

    //     for (let d of data) {
    //         formatted.push({
    //             mod_id: d.mod_id,
    //             mod_name: d.mod_name,
    //             abbr: d.abbr,
    //         });
    //     }
    //     return formatted;
    // },

    getFilterUrl: (filter) => {
        let url = "";

        if (filter !== undefined) {
            if (filter.com_id !== undefined) {
                url += "com_id=" + filter.com_id + "&";
            }
            if (filter.is_active !== undefined) {
                url += "is_active=" + filter.is_active + "&";
            }
            if (filter.language_id !== undefined) {
                url += "language_id=" + filter.language_id + "&";
            }
        }
        return url;
    },
};

export default PfLabel;
