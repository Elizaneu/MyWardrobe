const {decode, auth} = require("./Hash");

exports.createThing = (mysql) => async (req, res) =>{
    if (!await auth(mysql, req.cookies.token)) {
        res.sendStatus(401);
        return;
    }
    const id = decode(req.cookies.token);

    if (!req.files.Photo || req.body.Category){
        
    }
};