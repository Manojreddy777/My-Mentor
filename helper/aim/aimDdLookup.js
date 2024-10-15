import API from "../../utils/api";

const AimDdLookup = {
  getBankDet: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/aimDdLookup/getBankDet";
      const filterUrl = AimDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(AimDdLookup.formatAimBankList(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatAimBankList: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getCategoryGrp: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/aimDdLookup/getCategoryGrp";
      const filterUrl = AimDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(AimDdLookup.formatCategoryGrp(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    formatCategoryGrp: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getAimRecordStatus: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/AimDdLookup/getAimRecordStatus";
      const filterUrl = AimDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(AimDdLookup.formatAimRecordStatus(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatAimRecordStatus: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getAimCodeYesNo: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/aimDdLookup/getAimCodeYesNo";
      const filterUrl = AimDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(AimDdLookup.formatAimCodeYesNo(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatAimCodeYesNo: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getGenderType: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/aimDdLookup/getGenderType";
      const filterUrl = AimDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(AimDdLookup.formatGenderType(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    formatGenderType: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getMembershipType: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/aimDdLookup/getMembershipType";
      const filterUrl = AimDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(AimDdLookup.formatAimMembershipType(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatAimMembershipType: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getTrxType: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/aimDdLookup/getTrxType";
      const filterUrl = AimDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(AimDdLookup.formatTrxType(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    formatTrxType: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getCategoryDet: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/aimDdLookup/getCategoryDet";
      const filterUrl = AimDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(AimDdLookup.formatCategoryDet(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    formatCategoryDet: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getAssistUc: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/aimDdLookup/getAssistUc";
      const filterUrl = AimDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(AimDdLookup.formatAssistUc(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    formatAssistUc: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getAccountNumber: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/aimDdLookup/getAccountNumber";
      const filterUrl = AimDdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(AimDdLookup.formatAccountNumber(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    formatAccountNumber: (data) => {
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

export default AimDdLookup;
