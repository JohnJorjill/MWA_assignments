const mongoose = require("mongoose")
const Game = mongoose.model("Game")

module.exports.publishersGetAll = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function (err, game) {
        res.status(200).json(game.publisher)
    })
}

// module.exports.publisherGetOne = function (req, res) {
//     const gameId = req.params.gameId;
//     const publisherId = req.params.publisherId;
//     Game.findById(gameId).select("publisher").exec(function (err, game) {
//         const publisher = game.publisher.id(publisherId)
//         res.status(200).json(publisher)
//     })
// }

const _addPublisher = (req, res, game, response) => {
    game.publisher.name = req.body.name;
    game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)]
    game.save((err, updatedGame) => {
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.message = updatedGame;
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.publisherAddOne = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function (err, game) {
        const response = {
            status: 201,
            message: game
        };
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!game) {
            console.log("not found game");
            response.status = 404;
            response.message = { "msg": "not found game" };
        }
        if (game) {
            _addPublisher(req, res, game, response);
        } else {
            res.status(response.status).json(response.message);
        }
    })
}

const _updatePublisher = function (req, res, game) {
    game.publisher.name = req.body.name;
    game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    game.save(function (err, updatedGame) {
        const response = { status: 204, message: updatedGame };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.publisherUpdate = function (req, res) {
    const gameId = req.params.gameId;
    console.log("PUT gameId ", gameId);
    Game.findById(gameId).select("publisher").exec(function (err, game) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding game");
            response.message = err;
            response.status = 500;
        } else if (!game) {
            response.status = 404;
            response.message = { "message": "Game ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            console.log(game);
            _updatePublisher(req, res, game);
        }
    });
}

const _deletePublisher = function (req, res, game) {
    game.publisher.remove(); 
    game.save(function (err, game) {
        const response = { status: 204 }; if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.publisherDelete = function(req,res){
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function (err, game) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding game");
            response.message = err;
            response.status = 500;
        } else if (!game) {
            response.status = 404;
            response.message = { "message": "Game ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            console.log(game);
            _deletePublisher(req, res, game);
        }
    });
}