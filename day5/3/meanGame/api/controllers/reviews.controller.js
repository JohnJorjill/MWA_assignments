const mongoose = require("mongoose")
const Game = mongoose.model("Game")

module.exports.reviewsGetAll = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function (err, game) {
        res.status(200).json(game.publisher)
    })
}

module.exports.reviewsAddOne = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function (err, game) {
        const response = {
            status: 201,
            message: game
        };
        if (err) {
            console.log(err);
            response.status = 500;
            response.message = err;
        } else if (!game) {
            console.log("not found game");
            response.status = 404;
            response.message = { "msg": "not found game" };
        }
        if (game) {
            game.reviews.push({name:req.body.name, review: req.body.review, date: parseInt(req.body.date)});
            game.save((err, updatedGame) => {
                if (err) {
                    response.status = 500;
                    response.message = err;
                } else {
                    response.message = updatedGame;
                }
                res.status(response.status).json(response.message);
            })
        } else {
            res.status(response.status).json(response.message);
        }
    })
}

const _updateReview = function (req, res, game) {
    game.review.name = req.body.name;
    
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

module.exports.reviewUpdate = function (req, res) {
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