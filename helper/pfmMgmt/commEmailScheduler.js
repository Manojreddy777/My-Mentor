import API from "../../utils/api";

const pfNotif = {
  insertRecord: (data) =>
    new Promise(function (resolve, reject) {
      API.post("/commEmailScheduler/insertRecord", data, {
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
      API.patch("/commEmailScheduler/updateRecord", data, {
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
      const baseUrl = "/commEmailScheduler/getRecord";
      const filterUrl = pfNotif.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(pfNotif.formatRecord(res.data));
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
        com_id: d.com_id,
        com_rec_id: d.com_rec_id,
        evt_id: d.evt_id,
        template_id: d.template_id,
        from_id: d.from_id,
        to_id: d.to_id,
        email_subject: d.email_subject,
        email_content: d.email_content,
        sent_timestamp: d.sent_timestamp,
        delivery_receipt: d.delivery_receipt,
        read_receipt: d.read_receipt,
        status_id: d.status_id,
        tag_1: d.tag_1,
        tag_2: d.tag_2,
        tag_3: d.tag_3,
        tag_4: d.tag_4,
        tag_5: d.tag_5,
        tag_6: d.tag_6,
        tag_7: d.tag_7,
        tag_8: d.tag_8,
        tag_9: d.tag_9,
        tag_10: d.tag_10,
        tag_11: d.tag_11,
        tag_12: d.tag_12,
        tag_13: d.tag_13,
        tag_14: d.tag_14,
        tag_15: d.tag_15,
        tag_16: d.tag_16,
        tag_17: d.tag_17,
        tag_18: d.tag_18,
        tag_19: d.tag_19,
        tag_20: d.tag_20,
        is_active: d.is_active,
      });
    }
    return formatted;
  },

  getPageDet: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/commEmailScheduler/getPageDet";
      const filterUrl = pfNotif.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(pfNotif.formatPageDet(res.data));
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
        com_id: d.com_id,
        com_rec_id: d.com_rec_id,
        evt_id: d.evt_id,
        template_id: d.template_id,
        from_id: d.from_id,
        to_id: d.to_id,
        email_subject: d.email_subject,
        email_content: d.email_content,
        sent_timestamp: d.sent_timestamp,
        delivery_receipt: d.delivery_receipt,
        read_receipt: d.read_receipt,
        status_id: d.status_id,
        is_active: d.is_active,
        comment_cnt: d.comment_cnt == null ? 0 : d.comment_cnt,
      });
    }
    return formatted;
  },

  getFilteredData: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/commEmailScheduler/getFilteredData";
      const filterUrl = pfNotif.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(pfNotif.formatFiltered(res.data));
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
        com_id: d.com_id,
        com_rec_id: d.com_rec_id,
        evt_id: d.evt_id,
        template_id: d.template_id,
        from_id: d.from_id,
        to_id: d.to_id,
        email_subject: d.email_subject,
        email_content: d.email_content,
        sent_timestamp: d.sent_timestamp,
        delivery_receipt: d.delivery_receipt,
        read_receipt: d.read_receipt,
        status_id: d.status_id,
        msg_id: d.msg_id,
        is_active: d.is_active,
      });
    }
    return formatted;
  },

  genEmail: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/commEmailScheduler/genEmail";
      const filterUrl = pfNotif.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
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

    getEmailCount: (filter) =>
      new Promise(function (resolve, reject) {
        const baseUrl = "/commEmailScheduler/getEmailCount";
        const filterUrl = pfNotif.getFilterUrl(filter);
        API.get(`${baseUrl}?${filterUrl}`, {
          headers: {
            "x-access-token": global.config.accessToken,
          },
        })
          .then(async (res) => {
            resolve(pfNotif.formatCount(res.data));
          })
          .catch((err) => {
            reject(err);
          });
      }),

      formatCount: (data) => {
        const formatted = [];
    
        for (let d of data) {
          formatted.push({
            total_count: d.total_count,
            delivery_count: d.delivery_count,
            read_count: d.read_count,
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

export default pfNotif;
