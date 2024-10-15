import API from "../../utils/api";

const PfDashboard = {
  getPortlet1: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet1";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        formatted.push({
          Employment_Type: d.Employment_Type,
          Head_Count:d.Head_Count,
        });
      }
    return formatted;
  },


  getPortlet2: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet2";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet3: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet3";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet4: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet4";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet5: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet5";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet6: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet6";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet7: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet7";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet8: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet8";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet9: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet9";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet10: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet10";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet11: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet11";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet12: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet12";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet13: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet13";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet14: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet14";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet15: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet15";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet16: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet16";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet17: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet17";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet18: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet18";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet19: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet19";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet20: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet20";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet21: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet21";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet22: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet22";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet23: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet23";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet24: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet24";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet25: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet25";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet26: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet26";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet27: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet27";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet28: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet28";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet29: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet29";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet30: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet30";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet31: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet31";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format31(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format31: (data) => {
      const formatted = [];
      // const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        // const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          yet_to_start: d.yet_to_start,
          in_progress:d.in_progress,
          for_review: d.for_review,
          done: d.done,
          discard: d.discard,
          on_hold: d.on_hold,
          blocked: d.blocked,
        });
      }
      
    return formatted;
  },

  getPortlet32: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet32";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format32(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format32: (data) => {
      const formatted = [];

      for (let d of data) {
        // const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          yet_to_start: d.yet_to_start,
          in_progress:d.in_progress,
          for_review: d.for_review,
          done: d.done,
          discard: d.discard,
          on_hold: d.on_hold,
          blocked: d.blocked,
  
        });
      }
    return formatted;
  },

  getPortlet33: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet33";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format33(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    format33: (data) => {
      const formatted = [];
      // const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        // const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          total_stalls: d.total_stalls,
          total_contracts_signed: d.total_contracts_signed,
          total_contracts_wip: d.total_contracts_wip,
          total_payment_collected: d.total_payment_collected,
  
        });
      }
    return formatted;
  },

  getPortlet34: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet34";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format34(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format34: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + parseInt(d.count), 0);
  
      for (let d of data) {
        const percentage = (d.count/ totalCount) * 100;
        console.log(percentage)
        formatted.push({
          state: d.state,
          count:d.count,
          percentage:percentage.toFixed(2) + '%',
          totalCount: totalCount,
        });
      }
    return formatted;
  },

  getPortlet35: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet35";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet36: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet36";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format36(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format36: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.count, 0);
      for (let d of data) {
        const percentage = (d.count/ totalCount) * 100;
        formatted.push({
          Country: d.Country,
          count:d.count,
          percentage:percentage.toFixed(2) + '%',
          totalCount: totalCount,
        });
      }
    return formatted;
  },

  getPortlet37: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet37";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format37(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format37: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + parseInt(d.count), 0);
      for (let d of data) {
        const percentage = (d.count/ totalCount) * 100;
        formatted.push({
          yes: d.yes,
          no:d.no,
          count:d.count,
          Percentage:percentage.toFixed(2) + '%',
          totalCount: totalCount,
        });
      }
    return formatted;
  },

  getPortlet38: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet38";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format38(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    format38: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          day: d.day,
          raised: d.raised,
          closed: d.closed,
          outstanding: d.outstanding,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
        });
      }
    return formatted;
  },

  getPortlet39: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet39";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format39(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    format39: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          assigned_to: d.assigned_to,
          count:d.count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet40: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet40";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format40(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    format40: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          status: d.status,
          count:d.count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet41: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet41";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format41(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

    format41: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          ticket_id: d.ticket_id,
          age:d.age,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet42: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet42";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format42(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format42: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          status: d.status,
          total:d.total,
          sq_meter: d.sq_meter,
          percentage:d.percentage,
  
        });
      }
    return formatted;
  },

  getPortlet43: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet43";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format43(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format43: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        console.log(data)
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          status: d.status,
          total:d.total,
          sq_meter: d.sq_meter,
          percentage:d.percentage,
  
        });
      }
    return formatted;
  },

  getPortlet44: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet44";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format44(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format44: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          status: d.status,
          total:d.total,
          sq_meter: d.sq_meter,
          percentage:d.percentage,
  
        });
      }
    return formatted;
  },

  getPortlet45: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet45";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format45(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format45: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          status: d.status,
          total:d.total,
          sq_meter: d.sq_meter,
          percentage:d.percentage,
  
        });
      }
    return formatted;
  },

  getPortlet46: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet46";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet47: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet47";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet48: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet48";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet49: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet49";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
        });
      }
    return formatted;
  },

  getPortlet50: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfDashboard/getPortlet50";
      const filterUrl = PfDashboard.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(PfDashboard.format(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  format: (data) => {
      const formatted = [];
      const totalCount = data.reduce((sum, d) => sum + d.head_count, 0);
  
      for (let d of data) {
        const percentage = (d.head_count/ totalCount) * 100;
        formatted.push({
          Employment_Type: d.emp_type,
          Head_Count:d.head_count,
          Percentage:percentage.toFixed(2) + '%',
  
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
      if (filter.user_name !== undefined) {
        url += "user_name=" + filter.user_name + "&";
      }
      if (filter.proj_id !== undefined) {
        url += "proj_id=" + filter.proj_id + "&";
      }
      if (filter.com_id !== undefined) {
        url += "com_id=" + filter.com_id + "&";
      }
    }
    return url;
  },
};

export default PfDashboard;
