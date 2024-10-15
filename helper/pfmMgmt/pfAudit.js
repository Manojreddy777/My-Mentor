import API from "../../utils/api";

const PfAudit = {
  getAddrDet: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/PfAudit/getAddrDet";
      const filterUrl = PfAudit.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
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

    getFilterUrl: (filter) => {
      let url = "";
  
      if (filter !== undefined) {
        if (filter.ref_id !== undefined) {
          url += "ref_id=" + filter.ref_id + "&";
        }
        if (filter.tnnt_id !== undefined) {
          url += "tnnt_id=" + filter.tnnt_id + "&";
        }
      }
      return url;
    },
    
};

export default PfAudit;
