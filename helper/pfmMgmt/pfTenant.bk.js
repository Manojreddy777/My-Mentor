import API from "../../utils/api";
import moment from "moment";

const PfTenant = {

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
            database_name: d.database_name,
            start_date: d.start_date == null ? "" : moment(d.start_date).format("DD-MMM-YYYY"),
            end_date: d.end_date == null ? "" : moment(d.end_date).format("DD-MMM-YYYY"),
        });
    }
    return formatted;
}

};

export default PfTenant;
