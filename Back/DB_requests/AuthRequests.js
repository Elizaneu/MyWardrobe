exports.login = (Email, Password) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');
        mysql.query(`SELECT * FROM user WHERE Email = '${Email}' AND Password = '${Password}'`,
            (error, result) => {
                if (error) reject(error);
                else resolve(result)
            })
    });
};