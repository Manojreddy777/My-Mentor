import API from "../../utils/api";

const pfNotifTemplate = {
  insertRecord: (data) =>
    new Promise(function (resolve, reject) {
      API.post("/pfNotifEmailTemplate/insertRecord", data, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
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

  updateRecord: (data) =>
    new Promise(function (resolve, reject) {
      API.patch("/pfNotifEmailTemplate/updateRecord", data, {
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

  getRecord: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfNotifEmailTemplate/getRecord";
      const filterUrl = pfNotifTemplate.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(pfNotifTemplate.formatRecord(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatRecord: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.id,
        event_id: d.event_id,
        templ_name: d.templ_name,
        email_sub: d.email_sub,
        email_attachment1: d.email_attachment1,
        email_attachment2: d.email_attachment2,
        email_content: d.email_content,
        is_active: d.is_active,
      });
    }
    return formatted;
  },

  getPageDet: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfNotifEmailTemplate/getPageDet";
      const filterUrl = pfNotifTemplate.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(pfNotifTemplate.formatPageDet(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatPageDet: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.id,
        event_id: d.event_id,
        templ_name: d.templ_name,
        email_sub: d.email_sub,
        email_content: d.email_content,
        email_attachment1: d.email_attachment1,
        email_attachment2: d.email_attachment2,
        is_active: d.is_active,
        comment_cnt: d.comment_cnt == null ? 0 : d.comment_cnt,
      });
    }
    return formatted;
  },

  getFilteredData: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfNotifEmailTemplate/getFilteredData";
      const filterUrl = pfNotifTemplate.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(pfNotifTemplate.formatFiltered(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatFiltered: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.id,
        event_id: d.event_id,
        templ_name: d.templ_name,
        email_sub: d.email_sub,
        email_content: d.email_content,
        email_attachment1: d.email_attachment1,
        email_attachment2: d.email_attachment2,
        is_active: d.is_active,
      });
    }
    return formatted;
  },

  getFilterUrl: (filter) => {
    let url = "";

    if (filter !== undefined) {
      if (filter.id !== undefined) {
        url += "id=" + filter.id + "&";
      }
      if (filter.com_id !== undefined) {
        url += "com_id=" + filter.com_id + "&";
      }
      if (filter.is_active !== undefined) {
        url += "is_active=" + filter.is_active + "&";
      }
      if (filter.tnnt_id !== undefined) {
        url += "tnnt_id=" + filter.tnnt_id + "&";
      }
    }
    return url;
  },
};

export default pfNotifTemplate;
