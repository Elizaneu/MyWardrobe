const {UserLikeCollage} = require("../DB_requests/LikeCollageRequests");
const {
    getCountCollages, getCollages, createCollage,
    addThingToCollage, deleteCollage, getCountAllCollages,
    getAllCollages, getThingsInCollage,getCollagesByCategory,
    getCountCollagesByCategory, getCountAllCollagesByCategory, getAllCollagesByCategory
} = require("../DB_requests/CollageRequests");
const {decode, auth} = require("./Hash");

exports.getCollages = async (req, res) => {
    if (!await auth(req.cookies.token)) {
        res.sendStatus(401);
        return;
    }
    const id = decode(req.cookies.token);
    let limit = 10, offset = 0, style = "", season = "", dresscode = "", sort = "CreationDate";

    if (req.query.style != null) {
        style = req.query.style;
    }
    if (req.query.season != null) {
        season = req.query.season;
    }
    if (req.query.dresscode != null) {
        dresscode = req.query.dresscode;
    }
    if (req.query.sort != null) {
        sort = req.query.sort;
    }
    if (req.query.limit != null) {
        limit = req.query.limit;
    }
    if (req.query.offset != null) {
        offset = req.query.offset;
    }

    if (sort && sort !== "Likes" && sort !== "Dresscode"
        && sort !== "Season" && sort !== "CreationDate" && sort !== "Style") {
        res.status(400).json({
            error: "sort is not valid"
        });
        return;
    }
    if (sort === "") sort = null;

    try {
        let count = await getCountCollages(id, style, season, dresscode);
        let data = await getCollages(id, style, season, dresscode, sort, limit, offset);
        const rows = [];

        for (const u of data) {
            let th = await getThingsInCollage(u.idCollage);
            let isLike = await UserLikeCollage(id, u.idCollage);
            rows.push({...u, Photo: u.Photo.toString('base64'), Things: th, isLike})
        }
        res.json({count, rows});
    } catch (e) {
        res.status(500).json({
            error: e.sqlMessage
        });
    }
};

exports.getCollagesByCategory = async (req, res) => {
    if (!await auth(req.cookies.token)) {
        res.sendStatus(401);
        return;
    }
    const id = decode(req.cookies.token);
    const category = req.params.category;

    let limit = 10, offset = 0, sort = "CreationDate";

    if (req.query.sort != null) {
        sort = req.query.sort;
    }
    if (req.query.limit != null) {
        limit = req.query.limit;
    }
    if (req.query.offset != null) {
        offset = req.query.offset;
    }

    if (sort && sort !== "Likes" && sort !== "Dresscode"
        && sort !== "Season" && sort !== "CreationDate" && sort !== "Style") {
        res.status(400).json({
            error: "sort is not valid"
        });
        return;
    }
    if (sort === "") sort = null;
    try {
        let count = await getCountCollagesByCategory(id, category);
        let data = await getCollagesByCategory(id, category, sort, limit, offset);
        const rows = [];

        for (const u of data) {
            let th = await getThingsInCollage(u.idCollage);
            let isLike = await UserLikeCollage(id, u.idCollage);
            rows.push({...u, Photo: u.Photo.toString('base64'), Things: th, isLike})
        }
        res.json({count, rows});
    } catch (e) {
        res.status(500).json({
            error: e.sqlMessage
        });
    }
};

exports.createCollage = async (req, res) => {
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
    } catch (e) {
        res.status(400).json({
            isCreated: false,
            error: "request type is not form-data"
        });
        return;
    }

    try {
        JSON.parse(req.body.Things)
    } catch (e) {
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
    } catch (e) {
        res.status(500).json({
            isCreated: false,
            error: e.sqlMessage
        });
    }
};

exports.deleteCollage = async (req, res) => {
    if (!await auth(req.cookies.token)) {
        res.sendStatus(401);
        return;
    }
    const id = decode(req.cookies.token);

    let collageId = req.params.id;

    if (!Number(collageId)) {
        res.sendStatus(400);
        return;
    }
    try {
        await deleteCollage(id, collageId);
        res.json({
            isDeleted: true
        });
    } catch (e) {
        res.status(500).json({
            isDeleted: false,
            error: e.sqlMessage
        });
    }
};

exports.getAllCollage = async (req, res) => {
    let limit = 10, offset = 0, style = "", season = "", dresscode = "", sort = "";

    if (req.query.style != null) {
        style = req.query.style;
    }
    if (req.query.season != null) {
        season = req.query.season;
    }
    if (req.query.dresscode != null) {
        dresscode = req.query.dresscode;
    }
    if (req.query.sort != null) {
        sort = req.query.sort;
    }
    if (req.query.limit != null) {
        limit = req.query.limit;
    }
    if (req.query.offset != null) {
        offset = req.query.offset;
    }


    if (sort && sort !== "Likes" && sort !== "Dresscode"
        && sort !== "Season" && sort !== "CreationDate" && sort !== "Style") {
        res.status(400).json({
            error: "sort is not valid"
        });
        return;
    }
    if (sort === "") sort = null;

    try {
        let count = await getCountAllCollages(style, season, dresscode);
        let data = await getAllCollages(style, season, dresscode, sort, limit, offset);
        const rows = [];
        let id = null;
        if (await auth(req.cookies.token)) {
            id = decode(req.cookies.token);
        }
        for (const u of data) {
            let th = await getThingsInCollage(u.idCollage);
            let isLike = false;
            if (id) {
                isLike = await UserLikeCollage(id, u.idCollage);
            }
            rows.push({...u, Photo: u.Photo.toString('base64'), Things: th, isLike})
        }
        res.json({count, rows});
    } catch (e) {
        res.status(500).json({
            error: e.sqlMessage
        });
    }
};

exports.getAllCollagesByCategory = async (req, res) => {
    const category = req.params.category;

    let limit = 10, offset = 0, sort = "CreationDate";

    if (req.query.sort != null) {
        sort = req.query.sort;
    }
    if (req.query.limit != null) {
        limit = req.query.limit;
    }
    if (req.query.offset != null) {
        offset = req.query.offset;
    }

    if (sort && sort !== "Likes" && sort !== "Dresscode"
        && sort !== "Season" && sort !== "CreationDate" && sort !== "Style") {
        res.status(400).json({
            error: "sort is not valid"
        });
        return;
    }
    if (sort === "") sort = null;
    try {
        let count = await getCountAllCollagesByCategory(category);
        let data = await getAllCollagesByCategory(category, sort, limit, offset);
        const rows = [];

        let id = null;
        if (await auth(req.cookies.token)) {
            id = decode(req.cookies.token);
        }
        for (const u of data) {
            let th = await getThingsInCollage(u.idCollage);
            let isLike = false;
            if (id) {
                isLike = await UserLikeCollage(id, u.idCollage);
            }
            rows.push({...u, Photo: u.Photo.toString('base64'), Things: th, isLike})
        }
        res.json({count, rows});
    } catch (e) {
        res.status(500).json({
            error: e.sqlMessage
        });
    }
};