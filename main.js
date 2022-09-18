let http = require('http');
let url = require('url');

// Basic HTTP
// http.createServer((req, res)=>{
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hi, this is Dinesh!');
//     console.log("This is a test message");
// }).listen(4001);

// with URL
// http.createServer((req, res)=>{
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     let qry = url.parse(req.url, true).query;
//     res.write("Name: " + qry.txtName + ", Password: " + qry.paPassword);
//     // res.write(req.url);
//     res.end();
// }).listen(4001);

// with MongoDB
const mongo = require('mongodb').MongoClient;
const connURL = "mongodb://localhost:27017/";
http.createServer(function (req, response) {
    response.writeHead(200, {'Content-Type': 'application/json'});
    
    mongo.connect(connURL, async (err, db) => {
        if(err) throw err;

        // connect or create database
        let conn = db.db("studentsNew");
        console.log("Database Connected!");

        // get all existing Collections from the database
        let collections = await conn.listCollections().toArray();
        let collectionNames = collections.map(c => c.name);

        if(!collectionNames.includes("newCollection")) {
            conn.createCollection("newCollection", (err, res)=> {
                if(err) throw err;
                console.log("Collection is created!");
                // console.log(res);
            });
        }

        // // create single document
        // conn.collection("newCollection").insertOne({name: "NEW", subject: "NEW SUBJECT"}, (err, res) => {
        //     if(err) throw err;
        //     response.write(JSON.stringify(res, null, 3));
        // });
        
        // find one documents
        let qry = url.parse(req.url, true).query;
        let name = qry.name;
        let subject = qry.subject;
        let noSQL = {};
        if(name!=="") noSQL.name = name;
        if(subject!="") noSQL.subject = subject;

        console.log(name);
        console.log(subject);
        
        conn.collection("newCollection").find({name: name, subject: subject}).toArray((err, res) => {
            if(err) throw err;
            response.write(JSON.stringify(res, null, 3));
            response.end();
        });

        response.end();
    });

    response.end();

}).listen(4001);

//3000 = FE
//4000 = BE
//5000 = BE