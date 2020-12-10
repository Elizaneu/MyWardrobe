const {getUser, createUser, deleteUser, editUser} = require("../DB_requests/UserRequests");
const {decode, auth} = require("./Hash");

exports.getUser = async (req, res) => {
    if (!await auth(req.cookies.token)) {
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
    try {
        let data = await getUser(id);
        res.json({...data[0]});
    } catch (e) {
        res.status(500).json({
            error: e.sqlMessage
        })

    }
};

exports.createUser = async (req, res) => {
    if (!req.body.LastName || !req.body.FirstName || !req.body.Email || !req.body.Password) {
        res.status(400).json({
            isCreated: false,
            error: "not all fields are filled in"
        });
        return;
    }
    try {
        await createUser(req.body.LastName, req.body.FirstName, req.body.Email, req.body.Password);
        res.status(201).json({isCreated: true})
    } catch (e) {
        res.status(500).json({
            isCreated: false,
            error: e.sqlMessage
        });
    }
};

exports.deleteUser = async (req, res) => {
    if (!await auth(req.cookies.token)) {
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
    try {
        let data = await deleteUser(id);
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

exports.editUser = async (req, res) => {
    if (!await auth(req.cookies.token)) {
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

    try {
        await editUser(id, req.body.LastName, req.body.FirstName, req.body.Email, req.body.Password);
        res.json({
            isEdited: true
        });
    } catch (e) {
        res.status(500).json({
            isEdited: false,
            error: e.sqlMessage
        });
    }
};