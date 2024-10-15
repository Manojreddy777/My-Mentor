import API from "../../utils/api";

const TaUserComClm = {
  
    insertRecord: (data) =>
    new Promise(function (resolve, reject) {
        API.post("/taRoleUserClm/insertRecord", data)
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

    getAllActive: (filter) =>
    new Promise(function (resolve, reject) {
        const baseUrl = "/taUserComClm/getAllActive";
        const filterUrl = TaUserComClm.getFilterUrl(filter);
         API.get(`${baseUrl}?${filterUrl}`)
             .then(async (res) => {
                 resolve(TaUserComClm.format(res.data));
             })
             .catch((err) => {
                 reject(err);
             });
     }),

     format: (data) => {
     const formatted = [];

     for (let d of data) {
         formatted.push({
             claim_id: d.claim_id,
             com_id: d.com_id,
             com_name: d.com_name,
             user_id: d.user_id,
             user_name: d.user_name,
             clm_view: d.clm_view,
             clm_create: d.clm_create,
             clm_update: d.clm_update,
             clm_export: d.clm_export,
         });
     }
     return formatted;
 },

    getClaim: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/taUserComClm/getClaim";
            const filterUrl = TaUserComClm.getClaimUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(TaUserComClm.formatClaim(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatClaim: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                com_id: d.com_id,
                user_name: d.user_name,
                role_id: d.role_id,
                clm_view: d.clm_view,
                clm_create: d.clm_create,
                clm_update: d.clm_update,
                clm_export: d.clm_export,
            });
        }
        return formatted;
    },

    getClaimUrl: (filter) => {
        let url = "";

        if (filter !== undefined) {

            if (filter.user_name !== undefined) {
                url += "user_name=" + filter.user_name + "&";
            }

            if (filter.com_id !== undefined) {
                url += "com_id=" + filter.com_id + "&";
            }

            if (filter.tnnt_id !== undefined) {
                url += "tnnt_id=" + filter.tnnt_id + "&";
            }
        }
        return url;
    },

};

export default TaUserComClm;
