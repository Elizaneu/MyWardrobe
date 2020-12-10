exports.getCountCollages = (id, style, season, dresscode) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');

        let query = `SELECT count(*) FROM collage WHERE UserID=${id} AND ` +
            `Style=${style !== "" ? `'${style}'` : `Style`} AND ` +
            `Season=${season !== "" ? `'${season}'` : `Season`} AND ` +
            `Dresscode=${dresscode !== "" ? `'${dresscode}'` : `Dresscode`}`;

        mysql.query(query, (error, result) => {
            if (error) reject(error);
            else resolve(result[0]['count(*)'])
        })
    });
};

exports.getCollages = (id, style, season, dresscode, sort, limit, offset) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');

        let query = `SELECT * FROM collage WHERE UserID=${id} AND ` +
            `Style=${style ? `'${style}'` : `Style`} AND ` +
            `Season=${season ? `'${season}'` : `Season`} AND ` +
            `Dresscode=${dresscode ? `'${dresscode}'` : `Dresscode`} ` +
            `ORDER BY ${sort} DESC LIMIT ${limit} OFFSET ${offset};`;

        mysql.query(query,
            (error, result) => {
                if (error) reject(error);
                else resolve(result)
            })
    });
};

exports.getCountCollagesByCategory = (id, category) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');

        let query = `select  count(DISTINCT c.idCollage)
            from collage c, thing t, things_in_collage p
            where t.Category = '${category}' and t.idThing = p.ThingID and c.idCollage = p.CollageID and c.UserID = ${id}`;

        mysql.query(query,
            (error, result) => {
                if (error) reject(error);
                else resolve(result[0]['count(DISTINCT c.idCollage)'])
            })
    });
};


exports.getCollagesByCategory = (id, category, sort, limit, offset) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');

        let query = `select DISTINCT  c.*
            from collage c, thing t, things_in_collage p
            where t.Category = '${category}' and t.idThing = p.ThingID and c.idCollage = p.CollageID and c.UserID = ${id} ` +
            `ORDER BY ${sort} DESC LIMIT ${limit} OFFSET ${offset};`;

        mysql.query(query,
            (error, result) => {
                if (error) reject(error);
                else resolve(result)
            })
    });
};


exports.createCollage = (UserID, Style, Dresscode, Season, Photo, PhotoLink) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');

        const query = "INSERT INTO `collage` SET ?",
            values = {Style, Dresscode, Season, Photo, PhotoLink, UserID};

        mysql.query(query, values,
            (error, result) => {
                if (error) reject(error);
                else resolve(result)
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
                else resolve(result)
            })
    });
};

exports.deleteCollage = (UserID, CollageID) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');

        mysql.query(`DELETE FROM collage WHERE UserID = ${UserID} and idCollage = ${CollageID}`,
            (error, result) => {
                if (error) reject(error);
                else resolve(result)
            })
    });
};

exports.getCountAllCollages = (style, season, dresscode) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');

        let query = `SELECT count(*) FROM collage WHERE ` +
            `Style=${style !== "" ? `'${style}'` : `Style`} AND ` +
            `Season=${season !== "" ? `'${season}'` : `Season`} AND ` +
            `Dresscode=${dresscode !== "" ? `'${dresscode}'` : `Dresscode`}`;

        mysql.query(query, (error, result) => {
            if (error) reject(error);
            else resolve(result[0]['count(*)'])
        })
    });
};

exports.getAllCollages = (style, season, dresscode, sort, limit, offset) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');

        let query = `SELECT * FROM collage WHERE ` +
            `Style=${style ? `'${style}'` : `Style`} AND ` +
            `Season=${season ? `'${season}'` : `Season`} AND ` +
            `Dresscode=${dresscode ? `'${dresscode}'` : `Dresscode`} ` +
            `ORDER BY ${sort} DESC LIMIT ${limit} OFFSET ${offset};`;

        mysql.query(query,
            (error, result) => {
                if (error) reject(error);
                else resolve(result)
            })
    });
};

exports.getCountAllCollagesByCategory = (category) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');

        let query = `select  count(DISTINCT c.idCollage)
            from collage c, thing t, things_in_collage p
            where t.Category = '${category}' and t.idThing = p.ThingID and c.idCollage = p.CollageID`;

        mysql.query(query,
            (error, result) => {
                if (error) reject(error);
                else resolve(result[0]['count(DISTINCT c.idCollage)'])
            })
    });
};


exports.getAllCollagesByCategory = (category, sort, limit, offset) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');

        let query = `select DISTINCT  c.*
            from collage c, thing t, things_in_collage p
            where t.Category = '${category}' and t.idThing = p.ThingID and c.idCollage = p.CollageID ` +
            `ORDER BY ${sort} DESC LIMIT ${limit} OFFSET ${offset};`;

        mysql.query(query,
            (error, result) => {
                if (error) reject(error);
                else resolve(result)
            })
    });
};

exports.getThingsInCollage = (idCollage) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require("./../index");

        mysql.query(`SELECT ThingID FROM things_in_collage WHERE CollageID=${idCollage}`,
            (error, result) => {
                if (error) reject(error);
                else resolve(result.map(u => u.ThingID));
            })
    });
};