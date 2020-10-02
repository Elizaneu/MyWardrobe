exports.getUser = (mysql) => (req, res) => {
    let id = req.params.id;
    if (!id) {
        id = req.cookies.id;
    }
    if (!id) {
        res.sendStatus(401);
        return;
    }
    if (!Number(id)) {
        res.sendStatus(400);
        return;
    }
    mysql.query(`SELECT idUser, LastName, FirstName, Email, RegistrationDate FROM user WHERE idUser = ${id}`,
        (error, result) => {
            if (error) throw error;
            res.json(result);
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
                    error: error.sqlMessage
                })
            }
            res.json(result)
        })

};
