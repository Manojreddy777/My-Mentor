import API from "../../utils/api";

const TaUser = {


    
    getAllActive: (filter) =>
    new Promise(function (resolve, reject) {
        const baseUrl = "/taUser/getAllActive";
        const filterUrl = SdlcModule.getFilterUrl(filter);
        API.get(`${baseUrl}?${filterUrl}`)
             .then(async (res) => {
                 resolve(TaUser.format(res.data));
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
             role_list: d.role_list,
         });
     }
     return formatted;
 },
 getFilterUrl: (filter) => {
    let url = "";

    if (filter !== undefined) {
        if (filter.tnnt_id !== undefined) {
            url += "tnnt_id=" + filter.tnnt_id + "&";
        }
    }
    return url;
},

};

export default TaUser;
