import API from "../../utils/api";
import moment from "moment";

const PfTenant = {


    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/pfTenant/insertRecord", data)
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

    updateRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.patch("/pfTenant/updateRecord", data)
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    getAllActive: () =>
        new Promise(function (resolve, reject) {
            API.get("/pfTenant/getAllActive")
                .then(async (res) => {
                    resolve(PfTenant.format(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    format: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                tnnt_id: d.tnnt_id,
                tnnt_name: d.tnnt_name,
                abbr: d.abbr,
                user_name: d.user_name,
                admin_password: d.admin_password,
                database_name: d.database_name,
                start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
                end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
            });
        }
        return formatted;
    },
    getForDropDown: () =>
        new Promise(function (resolve, reject) {
            API.get("/pfTenant/getForDropDown")
                .then(async (res) => {
                    resolve(PfTenant.formatdd(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatdd: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                tnnt_id: d.tnnt_id,
                tnnt_name: d.tnnt_name,
            });
        }
        return formatted;
    },
    getFilteredData: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/pfTenant/getFilteredData";
            const filterUrl = PfTenant.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    resolve(PfTenant.formatfd(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatfd: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                tnnt_id: d.tnnt_id,
                tnnt_name: d.tnnt_name,
                abbr: d.abbr,
                user_name: d.user_name,
                admin_password: d.admin_password,
                database_name: d.database_name,
                start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
                end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
            });
        }
        return formatted;
    },

    checkAbbreviation: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/pfTenant/checkAbbreviation";
            const filterUrl = PfTenant.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`)
                .then(async (res) => {
                    if (res.data.code == 403) {
                        //Does not exist
                        resolve(true);
                    } else {
                        resolve(false); //Does exist
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    getFilterUrl: (filter) => {
        let url = "";

        if (filter !== undefined) {
            if (filter.abbr !== undefined) {
                url += "abbr=" + filter.abbr + "&";
            }
            if (filter.tnnt_id !== undefined) {
                url += "tnnt_id=" + filter.tnnt_id + "&";
            }
        }
        return url;
    },
};

export default PfTenant;
