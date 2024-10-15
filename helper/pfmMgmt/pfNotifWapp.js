import API from "../../utils/api";
import moment from "moment";

const pfNotif = {
  insertRecord: (data) =>
    new Promise(function (resolve, reject) {
      API.post("/pfNotifWapp/insertRecord", data, {
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
      API.patch("/pfNotifWapp/updateRecord", data, {
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
      const baseUrl = "/pfNotifWapp/getRecord";
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
        from_id: d.from_id,
        to_id: d.to_id,
        template_id: d.template_id,
        template_name: d.template_name,
        msg_header_type_id: d.msg_header_type_id,
        msg_header: d.msg_header,
        msg_image_url: d.msg_image_url,
        msg_content: d.msg_content,
        sent_timestamp: d.sent_timestamp,
        delivery_receipt: d.delivery_receipt,
        read_receipt: d.read_receipt,
        status_id: d.status_id,
        status_name: d.status_name,
        msg_id: d.msg_id,
        is_active: d.is_active,
        sched_date: d.sched_date,
        sched_time: d.sched_time,
      });
    }
    return formatted;
  },

  getPageDet: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfNotifWapp/getPageDet";
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
        evt_id: d.evt_id,
        from_id: d.from_id,
        to_id: d.to_id,
        template_id: d.template_id,
        template_name: d.template_name,
        sent_timestamp: d.sent_timestamp,
        delivery_receipt: d.delivery_receipt,
        read_receipt: d.read_receipt,
        status_id: d.status_id,
        status_name: d.status_name,
        is_active: d.is_active,
        sched_date: d.sched_date,
        sched_time: d.sched_time,
        comment_cnt: d.comment_cnt == null ? 0 : d.comment_cnt,
      });
    }
    return formatted;
  },

  getFilteredData: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfNotifWapp/getFilteredData";
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
        from_id: d.from_id,
        to_id: d.to_id,
        template_id: d.template_id,
        template_name: d.template_name,
        sent_timestamp: d.sent_timestamp,
        delivery_receipt: d.delivery_receipt,
        read_receipt: d.read_receipt,
        status_id: d.status_id,
        status_name: d.status_name,
        msg_id: d.msg_id,
        is_active: d.is_active,
        sched_date: d.sched_date,
        sched_time: d.sched_time,
      });
    }
    return formatted;
  },

  getWhattsAppCount: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfNotifWapp/getWhattsAppCount";
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

  genWapp: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/pfNotifWapp/genWapp";
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
