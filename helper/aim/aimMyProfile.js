import API from "../../utils/api";
import moment from "moment";
const AimMyProfile = {

    insertRecord: (data) =>
        new Promise(function (resolve, reject) {
            API.post("/aimMyProfile/insertRecord", data, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
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
            API.patch("/aimMyProfile/updateRecord", data, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        }),
    
	getRecord: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/aimMyProfile/getRecord";
            const filterUrl = AimMyProfile.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(AimMyProfile.formatRecord(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatRecord: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                

                id: d.id,
                user_name: d.user_name,
                dob: d.dob= null ? "" : moment(d.dob ).format("DD/MM/YYYY"),
                mobile_nr: d.mobile_nr,
                email_id: d.email_id,
                gender_id: d.gender_id,
                gender_name: d.gender_name,
                membership_id: d.membership_id,
                membership_name: d.membership_name,
                lc_status_id: d.lc_status_id,
                lc_status_name: d.lc_status_name,
                is_active: d.is_active,
                created_at: d.created_at,
                created_by: d.created_by,
                tnnt_id: d.tnnt_id,

            });
        }
        return formatted;
    },

	getPageDet: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/aimMyProfile/getPageDet";
            const filterUrl = AimMyProfile.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(AimMyProfile.formatPageDet(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatPageDet: (data) => {
        const formatted = [];
console.log(data)
        for (let d of data) {
            formatted.push({
                comment_cnt: d.comment_cnt == null ? 0 : d.comment_cnt,
				

            id: d.id,
            user_name: d.user_name,
            dob: d.dob== null ? "" : moment(d.dob ).format("DD/MM/YYYY"),
            mobile_nr: d.mobile_nr,
            email_id: d.email_id,
            gender_id: d.gender_id,
            gender_name: d.gender_name,
            membership_id: d.membership_id,
            membership_name: d.membership_name,
            lc_status_id: d.lc_status_id,
            lc_status_name: d.lc_status_name,
            is_active: d.is_active,
            created_at: d.created_at,
            created_by: d.created_by,
            tnnt_id: d.tnnt_id,

            });
        }
        return formatted;
    },	

    getFilteredData: (filter) =>
        new Promise(function (resolve, reject) {
            const baseUrl = "/aimMyProfile/getFilteredData";
            const filterUrl = AimMyProfile.getFilterUrl(filter);
            API.get(`${baseUrl}?${filterUrl}`, {
                headers: {
                    "x-access-token": global.config.accessToken,
                },
            })
                .then(async (res) => {
                    resolve(AimMyProfile.formatFiltered(res.data));
                })
                .catch((err) => {
                    reject(err);
                });
        }),

    formatFiltered: (data) => {
        const formatted = [];

        for (let d of data) {
            formatted.push({
                

                id: d.id,
                user_name: d.user_name,
                dob: d.dob= null ? "" : moment(d.dob ).format("DD/MM/YYYY"),
                mobile_nr: d.mobile_nr,
                email_id: d.email_id,
                gender_id: d.gender_id,
                gender_name: d.gender_name,
                membership_id: d.membership_id,
                membership_name: d.membership_name,
                lc_status_id: d.lc_status_id,
                lc_status_name: d.lc_status_name,
                is_active: d.is_active,
                created_at: d.created_at,
                created_by: d.created_by,
                tnnt_id: d.tnnt_id,

            });
        }
        return formatted;
    },

    getFilterUrl: (filter) => {
        let url = "";

        if (filter !== undefined) {
			if (filter.com_id !== undefined) {
              url += "com_id=" + filter.com_id + "&";
            }
			//param_value

if (filter.id !== undefined) {
    url += "id=" + filter.id + "&";
}
if (filter.user_name !== undefined) {
    url += "user_name=" + filter.user_name + "&";
}
if (filter.dob !== undefined) {
    url += "dob=" + filter.dob + "&";
}
if (filter.mobile_nr !== undefined) {
    url += "mobile_nr=" + filter.mobile_nr + "&";
}
if (filter.email_id !== undefined) {
    url += "email_id=" + filter.email_id + "&";
}
if (filter.gender_id !== undefined) {
    url += "gender_id=" + filter.gender_id + "&";
}
if (filter.membership_id !== undefined) {
    url += "membership_id=" + filter.membership_id + "&";
}
if (filter.lc_status_id !== undefined) {
    url += "lc_status_id=" + filter.lc_status_id + "&";
}
if (filter.is_active !== undefined) {
    url += "is_active=" + filter.is_active + "&";
}
if (filter.created_at !== undefined) {
    url += "created_at=" + filter.created_at + "&";
}
if (filter.created_by !== undefined) {
    url += "created_by=" + filter.created_by + "&";
}
if (filter.tnnt_id !== undefined) {
    url += "tnnt_id=" + filter.tnnt_id + "&";
}

            
        }
        return url;
    },
};

export default AimMyProfile;