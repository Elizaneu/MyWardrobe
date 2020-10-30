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

exports.auth = (mysql, token) =>{
    return new Promise((resolve, reject)=>{
        if (!token)
            resolve(false);
        const id = exports.decode(token);
        if (!id)
            resolve(false);
        if (!Number(id))
            resolve(false);
        mysql.query(`SELECT * FROM user WHERE idUser = ${id}`, (err, res)=>{
            if (err) reject(err);
            resolve(res.length > 0);
        })
    });
};