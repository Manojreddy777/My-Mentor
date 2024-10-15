import API from "../utils/api";
import moment from "moment";

const scopeCard = {

    get: () =>
        new Promise(function (resolve, reject) {
            API.get("/scopeCard/get")
                .then(async (res) => {
                    resolve(scopeCard.format(res.data));
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
                exam_name: moment(d.exam_name).format("DD-MMM-YYYY"),
                score: d.score,
                total_score: d.total_score,
                percentage: d.percentage,
            });
        }

        return formatted;
    },
};

export default scopeCard;
