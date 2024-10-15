import API from "../../utils/api";

const TsDdLookup = {

  getProjName: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/tsDdLookup/getProjName";
      const filterUrl = TsDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(TsDdLookup.formatReq(res.data));
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

  getWbsName: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/tsDdLookup/getWbsName";
      const filterUrl = TsDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(TsDdLookup.formatReq(res.data));
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

  getBillStatus: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/tsDdLookup/getBillStatus";
      const filterUrl = TsDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(TsDdLookup.formatReq(res.data));
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

  getEpicName: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/tsDdLookup/getEpicName";
      const filterUrl = TsDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(TsDdLookup.formatReq(res.data));
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

  getTaskStatus: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/tsDdLookup/getTaskStatus";
      const filterUrl = TsDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(TsDdLookup.formatReq(res.data));
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

export default TsDdLookup;
