import API from "../../utils/api";

const custom = {
  create: (data) =>
    new Promise(function (resolve, reject) {
      API.post("/customField", data)
        .then(async (res) => {
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.data.msg);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }),

    update: (data) =>
    new Promise(function (resolve, reject) {
      API.patch("/customField/update", data)
        .then(async (res) => {
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.data.msg);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }),

  createTable: (data) =>
    new Promise(function (resolve, reject) {
      API.post("/customField/createTable", data)
        .then(async (res) => {
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.data.msg);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }),

  insertRecord: (data) =>
    new Promise(function (resolve, reject) {
      API.post("/customField/insertRecord", data)
        .then(async (res) => {
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.data.msg);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }),

  getTableName: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/customField/getTableName";
      const filterUrl = custom.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`)
        .then(async (res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    }),


  getDropdown: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/customField/getDropdown";
      const filterUrl = custom.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`)
        .then(async (res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    }),

  get: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/customField/get";
      const filterUrl = custom.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`)
        .then(async (res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    }),

  getAll: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/customField/getAll";
      const filterUrl = custom.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`)
        .then(async (res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    }),

    getRecord: (filter) =>
      new Promise(function (resolve, reject) {
        const baseUrl = "/customField/getRecord";
        const filterUrl = custom.getFilterUrl(filter);
        API.get(`${baseUrl}?${filterUrl}`)
          .then(async (res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      }),

  insertvalues: (component_id, data) =>
    new Promise(function (resolve, reject) {
      API.post("/customField/insertvalues", {
        component_id: component_id,
        data: data,
      })
        .then(async (res) => {
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.data.msg);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }),


  getCustomValues: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/customField/getCustomValues";
      const filterUrl = custom.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`)
        .then(async (res) => {
          resolve(custom.formatCustomValues(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatCustomValues: (data) => {
    const formatted = [];

    data.length != 0 && (
      Object.entries(data[0]).slice(2).map(([key, value]) => (
        formatted.push({ [key]: value })
      ))
    )
    return formatted;
  },

  getFilterUrl: (filter) => {
    let url = "";

    if (filter !== undefined) {
      if (filter.component_id !== undefined) {
        url += "component_id=" + filter.component_id + "&";
      }
      if (filter.mod_id !== undefined) {
        url += "mod_id=" + filter.mod_id + "&";
      }
      if (filter.field_type !== undefined) {
        url += "field_type=" + filter.field_type + "&";
      }
      if (filter.id !== undefined) {
        url += "id=" + filter.id + "&";
      }
      if (filter.table_name !== undefined) {
        url += "table_name=" + filter.table_name + "&";
      }
      if (filter.tnnt_id !== undefined) {
        url += "tnnt_id=" + filter.tnnt_id + "&";
      }
    }

    return url;
  },
};

export default custom;

