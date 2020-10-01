exports.getUser = (mysql) => (req, res) =>{
    let id = req.params.id;
    if (!id) {
        id = req.cookies.id;
    }
    if (!id){
        res.sendStatus(401);
        return;
    }
    if (!Number(id)){
        res.sendStatus(400);
        return;
    }
    mysql.query(`SELECT idUser, LastName, FirstName, Email, RegistrationDate FROM user WHERE idUser = ${id}`, (error, result)=>{
        if (error) throw error;
        res.json(result);
    })
};
