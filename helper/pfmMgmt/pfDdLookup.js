import API from "../../utils/api";

const PfDdLookup = {

  getLcStatus: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDdLookup/getLcStatus";
      const filterUrl = PfDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDdLookup.formatReq(res.data));
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

  getAddrType: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDdLookup/getAddrType";
      const filterUrl = PfDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDdLookup.formatReq(res.data));
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

  getModuleId: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDdLookup/getModuleId";
      const filterUrl = PfDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDdLookup.formatReq(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatReq: (data) => {
    console.log(data)
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getComId: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDdLookup/getComId";
      const filterUrl = PfDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDdLookup.formatReq(res.data));
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

  getApiStatus: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDdLookup/getApiStatus";
      const filterUrl = PfDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDdLookup.formatReq(res.data));
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

  getApiMethod: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDdLookup/getApiMethod";
      const filterUrl = PfDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDdLookup.formatReq(res.data));
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

  getMsDet: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDdLookup/getMsDet";
      const filterUrl = PfDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDdLookup.formatReq(res.data));
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

export default PfDdLookup;
