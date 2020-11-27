const {getCountCollages, getCollages, createCollage, addThingToCollage} = require("../DB_requests/CollageRequests");
const {decode, auth} = require("./Hash");

exports.getCollages = async (req, res) =>{
    if (!await auth(req.cookies.token)) {
        res.sendStatus(401);
        return;
    }
    const id = decode(req.cookies.token);
    let limit = 10, offset = 0, style = null, season = null, dresscode = null;

    if (req.query.style != null) {style = req.query.style;}
    if (req.query.season != null) {season = req.query.season;}
    if (req.query.dresscode != null) {dresscode = req.query.dresscode;}
    if (req.query.limit != null) {limit = req.query.limit;}
    if (req.query.offset != null) {offset = req.query.offset;}

    try{
        let count = await getCountCollages(id, style, season, dresscode);
        let data = await getCollages(id, style, season, dresscode, limit, offset);
        const rows = data.map(u => ({...u, Photo: u.Photo.toString('base64')}));
        res.json({count, rows});
    }catch (e) {
        res.status(500).json({
            error: e.sqlMessage
        });
    }
};

exports.createCollage = async (req, res) =>{
    if (!await auth(req.cookies.token)) {
        res.sendStatus(401);
        return;
    }
    const id = decode(req.cookies.token);
    try {
        if (!req.files.Photo || !req.body.Style || !req.body.Dresscode
            || !req.body.Season || !req.body.Things) {
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

    try {
        JSON.parse(req.body.Things)
    }catch (e) {
        res.status(400).json({
            isCreated: false,
            error: "Things is not array"
        });
        return;
    }

    const file = req.files.Photo;

    try {
        let data = await createCollage(id, req.body.Style, req.body.Dresscode, req.body.Season, file.data, "#");

        for (const id of JSON.parse(req.body.Things)) {
           await addThingToCollage(data.insertId, id);
        }

        res.status(201).json({isCreated: true});
    }catch (e) {
        res.status(500).json({
            isCreated: false,
            error: e.sqlMessage
        });
    }
};

exports.deleteCollage = async (req, res) =>{

};