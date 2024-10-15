import API from "../../utils/api";

const CommDdLookup = {

  getValueType: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/commDdLookup/getValueType";
      const filterUrl = CommDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(CommDdLookup.formatReq(res.data));
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

  getCollectOf: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/commDdLookup/getCollectOf";
      const filterUrl = CommDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(CommDdLookup.formatReq(res.data));
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

  getCollectDet: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/commDdLookup/getCollectDet";
      const filterUrl = CommDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(CommDdLookup.formatReq(res.data));
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

export default CommDdLookup;
