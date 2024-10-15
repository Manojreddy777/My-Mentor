import API from "../../utils/api";

const PfClaim = {

    getAllActive: () =>
    new Promise(function (resolve, reject) {
        API.get("/pfClaim/getAllActive")
            .then(async (res) => {
                resolve(PfClaim.format(res.data));
            })
            .catch((err) => {
                reject(err);
            });
    }),

   format: (data) => {
    const formatted = [];

    for (let d of data) {
        formatted.push({
            id: d.claim_id,
            claim_group: d.claim_group,
            claim_name: d.claim_name,
        });
    }
    return formatted;
}

};

export default PfClaim;
