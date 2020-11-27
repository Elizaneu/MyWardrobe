const {getCollages, createCollage} = require("../DB_requests/CollageRequests");
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
        let data = await getCollages(id, style, season, dresscode, limit, offset);
        const rows = data.map(u => ({...u, Photo: u.Photo.toString('base64')}));
        res.json([...rows]);
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

    const file = req.files.Photo;

    try {
        await createCollage(id, req.body.Style, req.body.Dresscode, req.body.Season, file.data, "#");
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