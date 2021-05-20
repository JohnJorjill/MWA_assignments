const dbConnection = require("../data/dbconnection");

module.exports.gamesGetAll = function (req, res) {
    const db = dbConnection.get();
    const collection = db.collection("games");
    collection.find().toArray(function (err, docs) {
        console.log("Found games", docs);
        res.status(200).json(docs);
    });
}

module.exports.gamesGetSome = function (req, res) {
    const db = dbConnection.get();
    const collection = db.collection("games");
    var offset = 0;
    var count = 3;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count<7){
        count = parseInt(req.query.count, 10);
    }

    collection.find().skip(offset).limit(count).toArray(function (err, docs) {
        console.log("Found games", docs);
        res.status(200).json(docs);
    }
    )
}