exports.UserLikeCollage = (UserID, CollageID) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');

        mysql.query(`SELECT count(*) FROM user_liked_collage where UserID = ${UserID} AND CollageID = ${CollageID}`,
            (error, result) => {
                if (error) reject(error);
                else resolve(result[0]['count(*)'] !== 0)
            })
    });
};

exports.increaseCountLikeAtCollage = (id) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');

        mysql.query(`UPDATE collage SET \`Likes\` = \`Likes\` + 1 where idCollage=${id};`,
            (error, result) => {
                if (error) reject(error);
                else resolve(result)
            })
    });
};

exports.decreaseCountLikeAtCollage = (id) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');

        mysql.query(`UPDATE collage SET \`Likes\` = \`Likes\` - 1 where idCollage=${id};`,
            (error, result) => {
                if (error) reject(error);
                else resolve(result)
            })
    });
};

exports.addUserByLike = (UserID, CollageID) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');

        const query = "INSERT INTO `user_liked_collage` SET ?",
            values = {UserID, CollageID};
        mysql.query(query, values,
            (error, result) => {
                if (error) reject(error);
                else resolve(result)
            })
    });
};

exports.deleteUserByLike = (UserID, CollageID) => {
    return new Promise((resolve, reject) => {
        const {mysql} = require('./../index');

        const query = `DELETE FROM user_liked_collage WHERE UserID=${UserID} AND CollageID=${CollageID}`;
        mysql.query(query,
            (error, result) => {
                if (error) reject(error);
                else resolve(result)
            })
    });
};