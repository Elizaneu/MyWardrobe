//import mysql package
const mysql = require("mysql");

//import express package
const serv = require('express')();
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//import functions
const {createUser, getUser, deleteUser, editUser} = require("./Controllers/User");
const {isAuth, login, logout} = require("./Controllers/Auth");
const {getThings, createThing, deleteThing} = require("./Controllers/Thing");
const {getCollages, createCollage, deleteCollage, getAllCollage, getCollagesByCategory, getAllCollagesByCategory} = require("./Controllers/Collage");
const{likeCollage, deleteLikeCollage, likedCollages} = require("./Controllers/LikeCollage");

//connect to mysql serv
const mysqlConn = mysql.createConnection({
    host: '0.0.0.0',
    port: 3306,
    user:process.env.MYSQL_ROOT_USERNAME || "root",
    database:"wardrobedb",
    password:process.env.MYSQL_ROOT_PASSWORD || "T2314fHOc7"
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
serv.get("/collage/all", getAllCollage);
serv.post("/collage/", createCollage);
serv.delete("/collage/:id", deleteCollage);
serv.get("/collage/:category", getCollagesByCategory);
serv.get("/collage/all/:category", getAllCollagesByCategory);

//LikeCollageAPI
serv.get("/like/collage/", likedCollages);
serv.post("/like/collage/:id", likeCollage);
serv.delete("/like/collage/:id", deleteLikeCollage);

//TestConnectToDB
mysqlConn.connect(err =>{
    if (err){
        console.log(err);
        return err;
    }else{
//StartServer
        console.log("connect to db is OK");
        serv.listen(process.env.PORT || 8000, () => {
            console.log("server started");
        });
    }
});
