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
http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    let val = url.parse(req.url, true).query;
    
    mongo.connect(connURL, async (err, db) => {
        if(err) throw err;

        // connect or create database
        let conn = db.db("studentsNew");
        console.log("Database Connected!");

        // get all existing Collections from the database
        let collections = await conn.listCollections().toArray();
        let collectionNames = collections.map(c => c.name);

        if(!collectionNames.includes("newCollection")) {
            conn.createCollection("newCollection", (err, res1)=> {
                if(err) throw err;
                console.log("Collection is created!");
                // console.log(res1);
            });
        }

        // // create single document
        // conn.collection("newCollection").insertOne({name: "NEW", subject: "NEW SUBJECT"}, (err, res1) => {
        //     if(err) throw err;
        //     response.end(JSON.stringify(res1, null, 3));
        // });
        
        // find one documents (OPTION 1 WORKS)
        let qry = url.parse(req.url, true).query;
        let name = qry.name;
        let subject = qry.subject;
        let noSQL = {};
        // noSQL.name = name;
        // noSQL.subject = subject;
        if(typeof name === "undefined" || name === null || name == "") {} else noSQL.name = name;
        if(typeof subject === "undefined" || subject === null || subject == "") {} else noSQL.subject = subject;
        conn.collection("newCollection").find(noSQL).toArray((err, res1) => {
            if(err) throw err;
            res.end(JSON.stringify(res1, null, 3));
        });


        // (OPTION 2 WORKS)
        // conn.collection("newCollection").find({$or: [{name: val.name}, {subject: val.subject}]}, { projection: {_id: 0}}).toArray((err, res1) => {
        //     if (err) throw err;
        //     console.log(res1);
        //     res.end(JSON.stringify(res1,null,3));
        //     // db.close();
        // });
    });
}).listen(4002);

//3000 = FE
//4000 = BE
//5000 = BE
