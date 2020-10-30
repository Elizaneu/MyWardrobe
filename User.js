const {decode, auth} = require("./Hash");

exports.getUser = (mysql) => async (req, res) => {
    if (! await auth(mysql, req.cookies.token)) {
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
    if (!req.body.lastName || !req.body.firstName || !req.body.email || !req.body.password) {
        res.sendStatus(400);
        return;
    }
    mysql.query(`INSERT INTO \`user\` (\`LastName\`, \`FirstName\`, \`Email\`, \`Password\`) VALUES ('${req.body.lastName}', '${req.body.firstName}', '${req.body.email}', '${req.body.password}');`,
        (error, result) => {
            if (error) {
                res.json({
                    isCreated: false,
                    error: error.sqlMessage
                });
                return;
            }
            res.json({isCreated:true})
        })
};

exports.deleteUser = (mysql) => async (req, res) => {
    if (! await auth(mysql, req.cookies.token)) {
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
            if (error) throw error;
            res.json(result);
        })
};
