const {decode, auth} = require("./Hash");

exports.getUser = (mysql) => async (req, res) => {
    if (!await auth(mysql, req.cookies.token)) {
        res.sendStatus(401);
        return;
    }
    let id = req.params.id;
    if (!id) {
        id = decode(req.cookies.token);
    }
    if (!Number(id)) {
        res.sendStatus(400);
        return;
    }
    mysql.query(`SELECT idUser, LastName, FirstName, Email, RegistrationDate FROM user WHERE idUser = ${id}`,
        (error, result) => {
            if (error) throw error;
            res.json({...result[0]});
        })
};

exports.createUser = (mysql) => (req, res) => {
    if (!req.body.LastName || !req.body.FirstName || !req.body.Email || !req.body.Password) {
        res.sendStatus(400);
        return;
    }
    mysql.query(`INSERT INTO \`user\` (\`LastName\`, \`FirstName\`, \`Email\`, \`Password\`) VALUES ('${req.body.LastName}', '${req.body.FirstName}', '${req.body.Email}', '${req.body.Password}');`,
        (error, result) => {
            if (error) {
                res.json({
                    isCreated: false,
                    error: error.sqlMessage
                });
                return;
            }
            res.json({isCreated: true})
        })
};

exports.deleteUser = (mysql) => async (req, res) => {
    if (!await auth(mysql, req.cookies.token)) {
        res.sendStatus(401);
        return;
    }
    let id = req.params.id;
    if (!id) {
        id = decode(req.cookies.token);
    }
    if (!Number(id)) {
        res.sendStatus(400);
        return;
    }
    mysql.query(`DELETE FROM user WHERE idUser = ${id}`,
        (error, result) => {
            if (error)
                res.json({
                    isDeleted: false,
                    error:error.sqlMessage
                });
            else
                res.json({
                    isDeleted: true
                });
        })
};
