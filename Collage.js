const {decode, auth} = require("./Hash");

exports.getCollages = (mysql) => async (req, res) =>{
    if (!await auth(mysql, req.cookies.token)) {
        res.sendStatus(401);
        return;
    }
    const id = decode(req.cookies.token);
    let limit = 10;
    let offset = 0;
    let style = null;
    let season = null;
    let dresscode = null;

    if (req.query.style != null) {style = req.query.style;}
    if (req.query.season != null) {season = req.query.season;}
    if (req.query.dresscode != null) {dresscode = req.query.dresscode;}
    if (req.query.limit != null) {limit = req.query.limit;}
    if (req.query.offset != null) {offset = req.query.offset;}

    let query = `SELECT * FROM collage WHERE UserID=${id} AND `+
        `Style=${style ? `'${style}'` : `Style`} AND ` +
        `Season=${season ? `'${season}'` : `Season`} AND ` +
        `Dresscode=${dresscode ? `'${dresscode}'` : `Dresscode`} ` +
        `LIMIT ${limit} OFFSET ${offset}`;

    mysql.query(query,
        (error, result)=>{
            if (error) {
                res.status(400).json({
                    error: error.sqlMessage
                });
                return;
            }
            const rows = result.map(u => ({...u, Photo: u.Photo.toString('base64')}));
            res.json([...rows]);
        })
};

exports.createCollage = (mysql) => async (req, res) =>{
    if (!await auth(mysql, req.cookies.token)) {
        res.sendStatus(401);
        return;
    }
    const id = decode(req.cookies.token);
    try {
        if (!req.files.Photo || !req.body.Style || !req.body.Dresscode || !req.body.Season) {
            res.status(400).json({
                isCreated: false,
                error: "not all fields are filled in"
            });
            return;
        }
    }catch (e) {
        res.status(400).json({
            isCreated: false,
            error: "request type is not form-data"
        });
        return;
    }

    const file = req.files.Photo;
    const query = "INSERT INTO `collage` SET ?",
        values = {
            Style: req.body.Style,
            Dresscode: req.body.Dresscode,
            Season: req.body.Season,
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

exports.deleteCollage = (mysql) => (req, res) =>{

};