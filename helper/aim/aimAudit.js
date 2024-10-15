import API from "../../utils/api";

const Audit = {
  getAimBankAcct: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/aimAudit/getAimBankAcct";
      const filterUrl = Audit.getFilterUrl(filter);
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

  getAimCategoryDet: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/aimAudit/getAimCategoryDet";
      const filterUrl = Audit.getFilterUrl(filter);
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

  getAimTrxDet: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/aimAudit/getAimTrxDet";
      const filterUrl = Audit.getFilterUrl(filter);
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

export default Audit;
