const {decode, auth} = require("./Hash");

exports.getThings = (mysql) => async (req, res) => {
    if (!await auth(mysql, req.cookies.token)) {
        res.sendStatus(401);
        return;
    }
    const id = decode(req.cookies.token);
    let limit = 10;
    let offset = 0;
    let category = "";

    if (req.query.category != null) {
        category = req.query.category;
    }
    if (req.query.limit != null) {
        limit = req.query.limit;
    }
    if (req.query.offset != null) {
        offset = req.query.offset;
    }

    let query1 = `SELECT count(*) FROM thing WHERE UserID=${id}`;
    let query = `SELECT * FROM thing WHERE UserID=${id} LIMIT ${limit} OFFSET ${offset}`;
    if (category !== "") {
        query1 = `SELECT count(*) FROM thing WHERE UserID=${id} AND Category='${category}'`;
        query = `SELECT * FROM thing WHERE UserID=${id} AND Category='${category}' LIMIT ${limit} OFFSET ${offset}`;
    }
    mysql.query(query1, (error1, result1) => {
        if (error1) {
            res.status(500).json({
                error: error1.sqlMessage
            });
            return;
        }
        mysql.query(query, (error, result) => {
            if (error) {
                res.status(500).json({
                    error: error.sqlMessage
                });
                return;
            }
            const rows = result.map(u => ({...u, Photo: u.Photo.toString('base64')}));

            res.send({count:result1[0]['count(*)'],  rows});
        })
    });
};


exports.createThing = (mysql) => async (req, res) => {
    if (!await auth(mysql, req.cookies.token)) {
        res.sendStatus(401);
        return;
    }
    const id = decode(req.cookies.token);

    if (!req.files.Photo || !req.body.Category) {
        res.status(400).json({
            isCreated: false,
            error: "not all fields are filled in"
        });
        return;
    }

    const file = req.files.Photo;
    const query = "INSERT INTO `thing` SET ?",
        values = {
            Category: req.body.Category,
            Photo: file.data,
            PhotoLink: "#",
            UserID: id
        };
    mysql.query(query, values,
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

exports.deleteThing = (mysql) => async (req, res) => {
    if (!await auth(mysql, req.cookies.token)) {
        res.sendStatus(401);
        return;
    }
    const id = decode(req.cookies.token);

    let thingId = req.params.id;

    mysql.query(`DELETE FROM thing WHERE UserID = ${id} and idThing = ${thingId}`,
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
        });
};