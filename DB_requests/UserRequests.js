exports.getUser = (id) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');
        mysql.query(`SELECT idUser, LastName, FirstName, Email, RegistrationDate FROM user WHERE idUser = ${id}`,
            (error, result) => {
                if (error) reject(error);
                resolve(result)
            })
    });
};

exports.createUser = (LastName, FirstName, Email, Password) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');
        mysql.query(`INSERT INTO \`user\` (\`LastName\`, \`FirstName\`, \`Email\`, \`Password\`) VALUES ('${LastName}', '${FirstName}', '${Email}', '${Password}');`,
            (error, result) => {
                if (error) reject(error);
                resolve(result)
            })
    });
};

exports.deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');
        mysql.query(`DELETE FROM user WHERE idUser = ${id}`,
            (error, result) => {
                if (error) reject(error);
                resolve(result)
            })
    });
};

exports.editUser = (id, LastName, FirstName, Email, Password) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');
        const query = `UPDATE user SET ` +
            `LastName=${LastName ? `'${LastName}'` : `LastName`}, ` +
            `FirstName=${FirstName ? `'${FirstName}'` : `FirstName`}, ` +
            `Email=${Email ? `'${Email}'` : `Email`}, ` +
            `Password=${Password ? `'${Password}'` : `Password`} ` +
            `WHERE idUser = ${id}`;
        mysql.query(query,
            (error, result) => {
                if (error) reject(error);
                resolve(result)
            })
    });
};