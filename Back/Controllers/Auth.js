const {getUser} = require("../DB_requests/UserRequests");
const {login} = require("../DB_requests/AuthRequests");

const {decode, encode} = require("./Hash");

exports.isAuth = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        res.json({
            isAuth: false
        });
        return;
    }
    const id = decode(token);
    if (!id) {
        res.json({
            isAuth: false
        });
        return;
    }
    if (!Number(id)) {
        res.json({
            isAuth: false
        });
        return;
    }
    try {
        let users = await getUser(id);
        if (users.length === 0) {
            res.json({
                isAuth: false
            });
        } else
            res.json({
                isAuth: true,
                ...users[0]
            })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            isAuth: false,
            error: e.sqlMessage
        })
    }
};

exports.login = async (req, res) => {
    if (!req.body.Email || !req.body.Password) {
        res.status(400).json({
            isAuth: false,
            error: "error getting data"
        });
        return;
    }
    try {
        let data = await login(req.body.Email, req.body.Password);
        if (data.length === 0) {
            res.json({
                isAuth: false,
                error: "incorrect email or password"
            });
        } else {
            if (req.body.rememberMe) {
                res.cookie('token', encode(data[0].idUser), {
                    maxAge: 1000 * 60 * 60 * 24 * 30 * 4
                })
            } else {
                res.cookie('token', encode(data[0].idUser), {
                    maxAge: 1000 * 60 * 60 * 10
                })
            }
            res.json({
                isAuth: true,
                ...data[0],
                Password: null
            })
        }
    }catch (e) {
        res.status(500).json({
            isAuth: false,
            error: e.sqlMessage
        })
    }

};

exports.logout = (req, res) => {
    res.cookie("token", undefined);
    res.json({
        isAuth: false
    })
};