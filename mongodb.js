// 1st option
// const mongo = require('mongodb');
// const mongodbClient = mongo.MongoClient;

const { ObjectId } = require('mongodb');

// 2nd option
const mongo = require('mongodb').MongoClient;

// Connection String
const dbURL = "mongodb://localhost:27017/";

mongo.connect(dbURL, async (err, db) => {
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
    if(!collectionNames.includes("newCollection2")) {
        conn.createCollection("newCollection2", (err, res)=> {
            if(err) throw err;
            console.log("Collection is created!");
            // console.log(res);
        });
    }

    // create single document
    // conn.collection("newCollection").insertOne({name: "Dinesh", subject: "NodeJs"}, (err, res) => {
    //     if(err) throw err;
    //     console.log(res);
    // });
    
    // // create single document using variable
    // var myValues = {
    //     name: "Tony",
    //     subject: "MongoDB"
    // }
    // conn.collection("newCollection").insertOne(myValues, (err, res) => {
    //     if(err) throw err;
    //     console.log(res.insertedId);
    // });

    // // create multiple documents using variable
    // var myValues = [
    //     {name: "Vishnu", subject: "HTML"},
    //     {name: "Deepak", subject: "CSS"},
    //     {name: "Merlin", subject: "Bootstrap"},
    //     {name: "Afnaan", subject: "JS"},
    //     {name: "Fouzi", subject: "NodeJs"},
    //     {name: "Selva", subject: "MongoDB"}
    // ];
    // conn.collection("newCollection").insertMany(myValues, (err, res) => {
    //     if(err) throw err;
    //     console.log(res);
    // });
    
    // // find one documents
    // conn.collection("newCollection").findOne({}, (err, res) => {
    //     if(err) throw err;
    //     console.log(res);
    // });

    // // find all documents
    // conn.collection("newCollection").find({}).toArray((err, res) => {
    //     if(err) throw err;
    //     console.log(res);
    // });

    // // find all documents without the _id field
    // conn.collection("newCollection").find({}, { projection: { name: 1 } }).toArray((err, res) => {
    //     if(err) throw err;
    //     console.log(res);
    // });

    // // find all documents matching a criteria
    // conn.collection("newCollection").find({name: "Dinesh"}).toArray((err, res) => {
    //     if(err) throw err;
    //     console.log(res);
    // });

    // // find all documents matching a criteria as a variable
    // let qry = {
    //     subject: "MongoDB"
    // };
    // conn.collection("newCollection").find(qry).toArray((err, res) => {
    //     if(err) throw err;
    //     console.log(res);
    // });

    // // find all documents matching a criteria as a variable (using Regular Expressions)
    // let qry = {
    //     subject: /mongo/i
    // };
    // conn.collection("newCollection").find(qry).toArray((err, res) => {
    //     if(err) throw err;
    //     console.log(res);
    // });

    // // sort the document
    // let qry = {
    //     subject: /mongo/i
    // };
    // let sort = {
    //     name: 1
    // };
    // conn.collection("newCollection").find(qry).sort(sort).toArray((err, res) => {
    //     if(err) throw err;
    //     console.log(res);
    // });

    // // sort and limit the document
    // let qry = {
    //     subject: /mongo/i
    // };
    // let sort = {
    //     name: 1
    // };
    // let limit = 1;
    // conn.collection("newCollection").find(qry).sort(sort).limit(limit).toArray((err, res) => {
    //     if(err) throw err;
    //     console.log(res);
    // });

    // // update 1 document
    // let qry = {
    //     name: "Dinesh"
    // };
    // let newValue = {
    //     $set : {
    //         name: "Dinesh Modified"
    //     }
    // };
    // conn.collection("newCollection").updateOne(qry, newValue, (err, res) => {
    //     if(err) throw err;
    //     console.log(res);
    // });

    // // update 1 document
    // let qry = {
    //     "_id": new ObjectId("6325e89b319a7f0639bcd292")
    // };
    // let newValue = {
    //     $set : {
    //         name: "Thambi"
    //     }
    // };
    // // conn.collection("newCollection").updateOne(qry, newValue, (err, res) => {
    // //     if(err) throw err;
    // //     console.log(res);
    // // });

    // // update many/all documents without any criteria
    // let qry = {};
    // let newValue = {
    //     $set : {
    //         active: true
    //     }
    // };
    // conn.collection("newCollection").updateMany(qry, newValue, (err, res) => {
    //     if(err) throw err;
    //     console.log(res);
    // });

    // // delete One document
    // let qry = {
    //     name: "Dinesh Modified"
    // };
    // conn.collection("newCollection").deleteOne(qry, (err, res) => {
    //     if(err) throw err;
    //     console.log(res);
    // });

    // // delete Many documents matching the criteria
    // let qry = {
    //     subject: /mongo/i
    // };
    // conn.collection("newCollection").deleteMany(qry, (err, res) => {
    //     if(err) throw err;
    //     console.log(res);
    // });
    
    // // delete a collection using "drop" method
    // conn.collection("newCollection").drop((err, res) => {
    //     if(err) throw err;
    //     console.log(res);
    // });

    // delete a collection using "dropCollection" method
    conn.dropCollection("newCollection2", (err, res) => {
        if(err) throw err;
        console.log(res);

        db.close();
    });

    
});