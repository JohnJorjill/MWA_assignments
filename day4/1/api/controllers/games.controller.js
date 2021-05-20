const mongoose = require("mongoose")
const Game = mongoose.model("Game")

module.exports.gamesGetAll = function (req, res) {
    Game.find().exec(function (err, games){
        console.log("Found games", games);
        res.status(200).json(games);
    });
}

module.exports.gamesGetSome = function (req, res) {
    var offset = 0;
    var count = 3;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count < 7) {
        count = parseInt(req.query.count, 10);
    }
    Game.find().skip(offset).limit(count).exec(function (err, docs) {
        console.log("Found games", docs);
        res.status(200).json(docs);
    }
    )
}

module.exports.gamesGetOne = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function (err, game) {
        res.status(200).json(game)
    })
}