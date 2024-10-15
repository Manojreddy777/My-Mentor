import API from "../../utils/api";

const pfNotifTemplate = {
  insertRecord: (data) =>
    new Promise(function (resolve, reject) {
      API.post("/pfNotifWappTemplate/insertRecord", data, {
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
      API.patch("/pfNotifWappTemplate/updateRecord", data, {
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
      const baseUrl = "/pfNotifWappTemplate/getRecord";
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
        evt_id: d.evt_id,
        templ_name: d.templ_name,
        msg_header_type_id: d.msg_header_type_id,
        msg_header: d.msg_header,
        msg_image_url: d.msg_image_url,
        msg_content: d.msg_content,
        is_active: d.is_active,
      });
    }
    return formatted;
  },

  getPageDet: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfNotifWappTemplate/getPageDet";
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
        evt_id: d.evt_id,
        templ_name: d.templ_name,
        msg_content: d.msg_content,
        is_active: d.is_active,
        comment_cnt: d.comment_cnt == null ? 0 : d.comment_cnt,
      });
    }
    return formatted;
  },

  getFilteredData: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfNotifWappTemplate/getFilteredData";
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
        evt_id: d.evt_id,
        templ_name: d.templ_name,
        msg_header_type_id: d.msg_header_type_id,
        msg_header: d.msg_header,
        msg_image_url: d.msg_image_url,
        msg_content: d.msg_content,
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
