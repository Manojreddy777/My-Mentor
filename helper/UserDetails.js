import API from "../utils/api";

const UserDetails = {

    get: () =>
        new Promise(function (resolve, reject) {
            API.get("/userDetails/get")
                .then(async (res) => {
                    resolve(AcCategory.format(res.data));
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
                dob: d.dob,
            });
        }

        return formatted;
    },
};

export default UserDetails;
