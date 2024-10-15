import API from "../../utils/api";

const PfTableDesc = {

    getFilteredData: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/pfTableDesc/getFilteredData";
            const filterUrl = PfTableDesc.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(PfTableDesc.formatfd(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    formatfd: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                id: d.id,
                Field: d.Field,
                Type: d.Type,
                Null: d.Null,
                Key: d.Key,
                Default: d.Default,
                Extra: d.Extra,
            });
        }
        return formatted;
    },

    getFilterUrl: (filter) => {
        let url = "";

        if (filter !== undefined) {
            if (filter.table_name !== undefined) {
                url += "table_name=" + filter.table_name + "&";
            }
            if (filter.rec_id !== undefined) {
                url += "rec_id=" + filter.rec_id + "&";
            }
            if (filter.com_id !== undefined) {
                url += "com_id=" + filter.com_id + "&";
            }
            if (filter.tnnt_id !== undefined) {
                url += "tnnt_id=" + filter.tnnt_id + "&";
            }
            if (filter.is_active !== undefined) {
                url += "is_active=" + filter.is_active + "&";
            }
        }
        return url;
    },
};

export default PfTableDesc;
