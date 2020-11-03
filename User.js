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
        res.status(400).json({
            isCreated: false,
            error: "not all fields are filled in"
        });
        return;
    }
    mysql.query(`INSERT INTO \`user\` (\`LastName\`, \`FirstName\`, \`Email\`, \`Password\`) VALUES ('${req.body.LastName}', '${req.body.FirstName}', '${req.body.Email}', '${req.body.Password}');`,
        (error, result) => {
            if (error) {
                res.status(400).json({
                    isCreated: false,
                    error: error.sqlMessage
                });
                return;
            }
            res.status(201).json({isCreated: true})
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
                res.status(500).json({
                    isDeleted: false,
                    error: error.sqlMessage
                });
            else
                res.json({
                    isDeleted: true
                });
        })
};

exports.editUser = (mysql) => async (req, res) => {
    if (!await auth(mysql, req.cookies.token)) {
        res.sendStatus(401);
        return;
    }
    if (!req.body.LastName && !req.body.FirstName && !req.body.Email && !req.body.Password) {
        res.status(400).json({
            isEdited: false,
            error: "fields is empty"
        });
        return;
    }
    const id = decode(req.cookies.token);
    const query = `UPDATE user SET ` +
        `LastName=${req.body.LastName ? `'${req.body.LastName}'` : `LastName`}, ` +
        `FirstName=${req.body.FirstName ? `'${req.body.FirstName}'` : `FirstName`}, ` +
        `Email=${req.body.Email ? `'${req.body.Email}'` : `Email`}, ` +
        `Password=${req.body.Password ? `'${req.body.Password}'` : `Password`} ` +
        `WHERE idUser = ${id}`;
    mysql.query(query,
        (error, result) => {
            if (error)
                res.status(500).json({
                    isEdited: false,
                    error: error.sqlMessage,
                    query
                });
            else
                res.json({
                    isEdited: true
                });

        })
};