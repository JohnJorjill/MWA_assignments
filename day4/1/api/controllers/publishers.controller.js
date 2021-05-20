const mongoose = require("mongoose")
const Game = mongoose.model("Game")

module.exports.publishersGetAll = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function (err, game) {
        res.status(200).json(game.publisher)
    })
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

// module.exports.publisherGetOne = function (req, res) {
//     const gameId = req.params.gameId;
//     const publisherId = req.params.publisherId;
//     Game.findById(gameId).select("publisher").exec(function (err, game) {
//         const publisher = game.publishers.id(publisherId)
//         res.status(200).json(publisher)
//     })
// }