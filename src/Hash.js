const {getUser} = require("../DB_requests/UserRequests");
const key = "foihgoei-gdfjng-dfljgn-dfgnl";

exports.encode = (id) => {
    let token = "";
    for (let i = 0; i < key.length; i++) {

        token += key.charAt(i) !== '-'
            ? String.fromCharCode(key.charCodeAt(i) + id)
            : '-';
    }
    return token;
};

exports.decode = (token) => {
    return token.charCodeAt(0) - key.charCodeAt(0)
};

exports.auth = (token) => {
    return new Promise(async (resolve, reject) => {
        if (!token)
            resolve(false);
        const id = exports.decode(token);
        if (!id)
            resolve(false);
        if (!Number(id))
            resolve(false);
        try {
            let data = await getUser(id);
            resolve(data.length > 0);
        } catch (e) {
            reject(e);
        }
    });
};