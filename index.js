//import mysql package
const mysql = require("mysql");

//import express package
const serv = require('express')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {getUser} = require("./User");

//connect to mysql serv
const mysqlConn = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"wardrobedb",
    password:"Lama1200"
});

//options
const corsOptions = {
    credentials: true, // This is important.
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
    headers: ["X-Requested-With", "content-type"]
};
serv.use(bodyParser.json());
serv.use(bodyParser.urlencoded({extended: true}));
serv.use(cookieParser());
serv.use(cors(corsOptions));

serv.get("/user/:id?", getUser(mysqlConn));

mysqlConn.connect(err =>{
    if (err){
        console.log(err);
        return err;
    }else{
        console.log("connect to db is OK");
        serv.listen(8000, () => {
            console.log("server started");
        });
    }
});
