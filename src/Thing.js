const {getCountThings, getThings, createThing, deleteThing} = require("../DB_requests/ThingRequests");
const {decode, auth} = require("./Hash");

exports.getThings = async (req, res) => {
    if (!await auth(req.cookies.token)) {
        res.sendStatus(401);
        return;
    }
    const id = decode(req.cookies.token);

    let limit = 10, offset = 0, category = "";

    if (req.query.category != null) {category = req.query.category;}
    if (req.query.limit != null) {limit = req.query.limit;}
    if (req.query.offset != null) {offset = req.query.offset;}

    try{
        let count = await getCountThings(id, category);
        let data = await getThings(id, category, limit, offset);
        const rows = data.map(u => ({...u, Photo: u.Photo.toString('base64')}));
        res.send({count, rows});
    }catch (e) {
        res.status(500).json({
            error: e.sqlMessage
        });
    }
};


exports.createThing = async (req, res) => {
    if (!await auth(req.cookies.token)) {
        res.sendStatus(401);
        return;
    }
    const id = decode(req.cookies.token);
    try {
        if (!req.files.Photo || !req.body.Category) {
            res.status(400).json({
                isCreated: false,
                error: "not all fields are filled in"
            });
            return;
        }
    } catch (e) {
        res.status(400).json({
            isCreated: false,
            error: "request type is not form-data"
        });
        return;
    }

    const file = req.files.Photo;
    try{
        await createThing(req.body.Category, file.data, "#", id);
        res.status(201).json({isCreated: true})
    }catch (e) {
        res.status(500).json({
            isCreated: false,
            error: e.sqlMessage
        });
    }
};

exports.deleteThing = async (req, res) => {
    if (!await auth(req.cookies.token)) {
        res.sendStatus(401);
        return;
    }
    const id = decode(req.cookies.token);

    let thingId = req.params.id;

    if (!Number(thingId)) {
        res.sendStatus(400);
        return;
    }
    try {
        await deleteThing(id, thingId);
        res.json({
            isDeleted: true
        });
    }catch (e) {
        res.status(500).json({
            isDeleted: false,
            error: e.sqlMessage
        });
    }
};