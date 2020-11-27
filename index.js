//import mysql package
const mysql = require("mysql");

//import express package
const serv = require('express')();
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//import functions
const {createUser, getUser, deleteUser, editUser} = require("./src/User");
const {isAuth, login, logout} = require("./src/Auth");
const {getThings, createThing, deleteThing} = require("./src/Thing");
const {getCollages, createCollage, deleteCollage} = require("./src/Collage");


//connect to mysql serv
const mysqlConn = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"wardrobedb",
    password:"Lama1200"
});
exports.mysql = mysqlConn;

//Server options
const corsOptions = {
    credentials: true, // This is important.
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
    headers: ["X-Requested-With", "content-type"]
};
serv.use(bodyParser.json());
serv.use(bodyParser.urlencoded({extended: true}));
serv.use(cookieParser());
serv.use(cors(corsOptions));
serv.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

//UserAPI
serv.get("/user/:id?", getUser);
serv.post("/user/", createUser);
serv.delete("/user/:id?", deleteUser);
serv.put("/user/", editUser);

//AuthAPI
serv.get("/auth/", isAuth);
serv.post("/auth/", login);
serv.delete("/auth/", logout);

//ThingAPI
serv.get("/thing/", getThings);
serv.post("/thing/", createThing);
serv.delete("/thing/:id", deleteThing);

//CollageAPI
serv.get("/collage/", getCollages);
serv.post("/collage/", createCollage);
serv.delete("/collage/:id", deleteCollage);


//TestConnectToDB
mysqlConn.connect(err =>{
    if (err){
        console.log(err);
        return err;
    }else{
//StartServer
        console.log("connect to db is OK");
        serv.listen(8000, () => {
            console.log("server started");
        });
    }
});
