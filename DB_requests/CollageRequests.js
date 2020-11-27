exports.getCountCollages = (id, style, season, dresscode) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');

        let query = `SELECT count(*) FROM collage WHERE UserID=${id} AND `+
            `Style=${style !==""? `'${style}'` : `Style`} AND ` +
            `Season=${season !==""? `'${season}'` : `Season`} AND ` +
            `Dresscode=${dresscode !==""? `'${dresscode}'` : `Dresscode`}`;

        mysql.query(query, (error, result) => {
            if (error) reject(error);
            resolve(result[0]['count(*)'])
        })
    });
};

exports.getCollages = (id, style, season, dresscode, limit, offset) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');

        let query = `SELECT * FROM collage WHERE UserID=${id} AND `+
            `Style=${style ? `'${style}'` : `Style`} AND ` +
            `Season=${season ? `'${season}'` : `Season`} AND ` +
            `Dresscode=${dresscode ? `'${dresscode}'` : `Dresscode`} ` +
            `LIMIT ${limit} OFFSET ${offset}`;

        mysql.query(query,
            (error, result) => {
                if (error) reject(error);
                resolve(result)
            })
    });
};

exports.createCollage = (UserID, Style, Dresscode, Season, Photo, PhotoLink) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');

        const query = "INSERT INTO `collage` SET ?",
            values = {Style, Dresscode, Season, Photo, PhotoLink, UserID};

        mysql.query(query,values,
            (error, result) => {
                if (error) reject(error);
                resolve(result)
            })
    });
};

exports.addThingToCollage = (CollageID, ThingID) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');

        const query = "INSERT INTO `things_in_collage` SET ?",
            values = {CollageID, ThingID};

        mysql.query(query, values,
            (error, result) => {
                if (error) reject(error);
                resolve(result)
            })
    });
};