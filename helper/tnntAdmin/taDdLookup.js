import API from "../../utils/api";

const TaDdLookup = {

    getMsDet: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/taDdLookup/getMsDet";
      const filterUrl = TaDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(TaDdLookup.formatReq(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatReq: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getFunctionDet: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/taDdLookup/getFunctionDet";
      const filterUrl = TaDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(TaDdLookup.formatReq(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatReq: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
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
      if (filter.is_active !== undefined) {
        url += "is_active=" + filter.is_active + "&";
      }
    }
    return url;
  },
};

export default TaDdLookup;
