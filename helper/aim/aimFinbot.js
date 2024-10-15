import API from "../../utils/api";

const Finbot = {
  insertChatHistory: (data) =>
    new Promise(function (resolve, reject) {
      API.post("/aimFinbot/insertChatHistory", data, {
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

  get: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/aimFinbot/get";
      const filterUrl = Finbot.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(Finbot.format(res.data));
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
        chat_id: d.chat_id,
        title: d.title,
        is_bot: true,
        options_id: d.options_id,
        keywords_ids: d.keywords_ids,
        options: JSON.parse(d.options),
      });
    }
    return formatted;
  },

  getTextResponse: (filter) =>
    new Promise(function (resolve, reject) {
      const baseUrl = "/aimFinbot/getTextResponse";
      const filterUrl = Finbot.getFilterUrl(filter);
      API.get(`${baseUrl}?${filterUrl}`, {
        headers: {
          "x-access-token": global.config.accessToken,
        },
      })
        .then(async (res) => {
          resolve(Finbot.formatTR(res.data));
        })
        .catch((err) => {
          reject(err);
        });
    }),

  formatTR: (data) => {
    const formatted = [];

    for (let d of data) {
      formatted.push({
        id: d.id,
        chat_id: d.chat_id,
        next_id: d.next_id,
        options: d.options,
        is_bot: true,
      });
    }
    return formatted;
  },

  getFilterUrl: (filter) => {
    let url = "";

    if (filter !== undefined) {
      if (filter.chat_id !== undefined) {
        url += "chat_id=" + filter.chat_id + "&";
      }
      if (filter.keywords !== undefined) {
        url += "keywords=" + filter.keywords + "&";
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

export default Finbot;
