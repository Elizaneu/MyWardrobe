const {decode, encode} = require("./Hash");

exports.isAuth = (mysql) => (req, res) => {
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
    mysql.query(`SELECT idUser, LastName, FirstName, Email, RegistrationDate FROM user WHERE idUser = ${id}`, (error, result) => {
        if (error) throw error;
        if (result.length === 0) {
            res.json({
                isAuth: false
            });
        } else
            res.json({
                isAuth: true,
                ...result[0]
            })
    })
};

exports.login = (mysql) => (req, res) => {
    if (!req.body.Email || !req.body.Password) {
        res.json({
            isAuth: false,
            error: "error getting data"
        });
        return;
    }
    mysql.query(`SELECT * FROM user WHERE Email = '${req.body.Email}' AND Password = '${req.body.Password}'`,
        (error, result) => {
            if (error) throw error;
            if (result.length === 0) {
                res.json({
                    isAuth: false,
                    error: "incorrect email or password"
                });
            } else{
                if (req.body.rememberMe) {
                    res.cookie('token', encode(result[0].idUser), {
                        maxAge: 1000 * 60 * 60 * 24 * 30 * 4
                    })
                } else {
                    res.cookie('token', encode(result[0].idUser), {
                        maxAge: 1000 * 60 * 60 * 10
                    })
                }

                res.json({
                    isAuth: true,
                    ...result[0],
                    Password: null
                })
            }
        })
};

exports.logout = (mysql) => (req, res) =>{
    res.cookie("token", null);
    res.json({
        isAuth: false
    })
};