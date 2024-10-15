import API from "../../utils/api";

const TaEndUser = {


    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/taEndUser/insertRecord", data)
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
            API.patch("/taEndUser/updateRecord", data)
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    getAllActive: () =>
        new Promise(function (resolve, reject) {
            API.get("/taEndUser/getAllActive")
                .then(async (res) => {
                    resolve(TaEndUser.format(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    format: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                user_id: d.user_id,
                user_name: d.user_name,
                role_list: d.role_list
            });
        }
        return formatted;
    },
   
};

export default TaEndUser;
