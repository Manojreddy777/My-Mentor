import API from "../utils/api";

const DdLookup = {

  getHeaderType: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/ddLookup/getHeaderType";
      const filterUrl = DdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(DdLookup.formatReq(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),
    
  getPfWfs: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/ddLookup/getPfWfs";
      const filterUrl = DdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(DdLookup.formatReq(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  getPfComponent: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/ddLookup/getPfComponent";
      const filterUrl = DdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(DdLookup.formatReq(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  getPfNotifWapp: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/ddLookup/getPfNotifWapp";
      const filterUrl = DdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(DdLookup.formatReq(res.data));
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

  getEvent: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/ddLookup/getEvent";
      const filterUrl = DdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(DdLookup.formatReq(res.data));
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

  getSdlcImpStatus: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/ddLookup/getSdlcImpStatus";
      const filterUrl = DdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(DdLookup.formatImpStatus(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatImpStatus: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },

  getMpAppStatus: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/ddLookup/getMpAppStatus";
      const filterUrl = DdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(DdLookup.format(res.data));
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
      });
    }
    return formatted;
  },

  getDesignType: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/ddLookup/getDesignType";
      const filterUrl = DdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(DdLookup.format(res.data));
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
      });
    }
    return formatted;
  },

  getEmpType: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/ddLookup/getEmpType";
      const filterUrl = DdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(DdLookup.format(res.data));
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
      });
    }
    return formatted;
  },

  getMpReqType: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/ddLookup/getMpReqType";
      const filterUrl = DdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(DdLookup.formatReq(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  getMpRefNum: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/ddLookup/getMpRefNum";
      const filterUrl = DdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(DdLookup.formatReq(res.data));
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

getAcWebinar: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/ddLookup/getAcWebinar";
      const filterUrl = DdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`)
        .then(async (res) => {
          resolve(DdLookup.formatAcWebinar(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),
 
  formatAcWebinar: (data) => {
    const formatted = [];
 
    for (let d of data) {
      formatted.push({
        id: d.rec_id,
        name: d.rec_name,
      });
    }
    return formatted;
  },
 
  getParticipantGrp: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/ddLookup/getParticipantGrp";
      const filterUrl = DdLookup.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`)
        .then(async (res) => {
          resolve(DdLookup.formatParticipantGrp(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),
 
  formatParticipantGrp: (data) => {
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
      if (filter.channel_email !== undefined) {
        url += "channel_email=" + filter.channel_email + "&";
      }
      if (filter.channel_wapp !== undefined) {
        url += "channel_wapp=" + filter.channel_wapp + "&";
      }
      if (filter.approval_status_id !== undefined) {
        url += "approval_status_id=" + filter.approval_status_id + "&";
      }
      if (filter.tnnt_id !== undefined) {
        url += "tnnt_id=" + filter.tnnt_id + "&";
      }
      if (filter.is_active !== undefined) {
        url += "is_active=" + filter.is_active + "&";
      }
      if (filter.status_id !== undefined) {
        url += "status_id=" + filter.status_id + "&";
      }
    }
    return url;
  },
};

export default DdLookup;
