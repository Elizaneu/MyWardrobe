const {getThingsInCollage} = require("../DB_requests/CollageRequests");
const {increaseCountLikeAtCollage,decreaseCountLikeAtCollage,
    addUserByLike, deleteUserByLike, UserLikeCollage, getLikedCollages, getCountLikedCollages} = require("../DB_requests/LikeCollageRequests");
const {decode, auth} = require("./Hash");

exports.likedCollages = async (req, res) => {
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

    try{
        let count = await getCountLikedCollages(id, style, season, dresscode);
        let data = await getLikedCollages(id, style, season, dresscode, sort, limit, offset);
        const rows = [];

        for (const u of data) {
            let th = await getThingsInCollage(u.idCollage);
            let isLike = await UserLikeCollage(id, u.idCollage);
            rows.push({...u, Photo: u.Photo.toString('base64'), Things: th, isLike})
        }
        res.json({count, rows});
    }catch (e) {
        res.status(500).json({
            error: e.sqlMessage
        });
    }

};

exports.likeCollage = async (req, res) =>{
    if (!await auth(req.cookies.token)) {
        res.sendStatus(401);
        return;
    }
    const id = decode(req.cookies.token);
    let collageId = req.params.id;
    if (!Number(collageId)) {
        res.status(400).json({
            error: "id is not valid"
        });
        return;
    }
    try {
        let data = await UserLikeCollage(id, collageId);
        if (!data){
            await increaseCountLikeAtCollage(collageId);
            await addUserByLike(id, collageId);
            res.status(201).json({isLike: true})
        }else{
            res.status(400).json({
                error:"already liked"
            })
        }
    }catch (e) {
        res.status(500).json({
            error: e.sqlMessage
        })
    }
};

exports.deleteLikeCollage = async (req, res) =>{
    if (!await auth(req.cookies.token)) {
        res.sendStatus(401);
        return;
    }
    const id = decode(req.cookies.token);
    let collageId = req.params.id;
    if (!Number(collageId)) {
        res.status(400).json({
            error: "id is not valid"
        });
        return;
    }
    let data = await UserLikeCollage(id, collageId);
    if (data){
        await decreaseCountLikeAtCollage(collageId);
        await deleteUserByLike(id, collageId);
        res.status(200).json({isDeleteLike: true})
    }else{
        res.status(400).json({
            error:"already dont like"
        })
    }
};