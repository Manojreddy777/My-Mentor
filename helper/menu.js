import API from "../utils/api";

const menu = {
    get: (username, token) =>
        new Promise(function (resolve, reject) {
            API.get("/menu/get?user_name=" + username, {
                headers: {
                    "x-access-token": token,
                },
            })
                .then(async (res) => {
                    console.log(res.data)
                    resolve(menu.format(res.data));
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
                title: d.title,
                open: false,
                subMenu: JSON.parse(d.subMenu)
            });
        }

        return formatted;
    },
};

export default menu;