exports.getCountThings = (id, Category) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');

        let query = `SELECT count(*) FROM thing WHERE UserID=${id}`;
        if (Category !== "") {
            query = `SELECT count(*) FROM thing WHERE UserID=${id} AND Category='${Category}'`;
        }
        mysql.query(query, (error, result) => {
                if (error) reject(error);
                resolve(result[0]['count(*)'])
            })
    });
};

exports.getThings = (id, Category, limit, offset) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');

        let query = `SELECT * FROM thing WHERE UserID=${id} LIMIT ${limit} OFFSET ${offset}`;
        if (Category !== "") {
            query = `SELECT * FROM thing WHERE UserID=${id} AND Category='${Category}' LIMIT ${limit} OFFSET ${offset}`;
        }
        mysql.query(query, (error, result) => {
                if (error) reject(error);
                resolve(result)
            })
    });
};

exports.createThing = (Category, Photo, PhotoLink, UserID) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');

        const query = "INSERT INTO `thing` SET ?",
            values = {Category, Photo, PhotoLink, UserID};

        mysql.query(query, values, (error, result) => {
                if (error) reject(error);
                resolve(result)
            })
    });
};


exports.deleteThing = (UserID, ThingID) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');

        mysql.query(`DELETE FROM thing WHERE UserID = ${UserID} and idThing = ${ThingID}`,
            (error, result) => {
                if (error) reject(error);
                resolve(result)
            })
    });
};