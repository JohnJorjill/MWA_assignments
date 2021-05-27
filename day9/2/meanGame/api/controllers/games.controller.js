const mongoose = require("mongoose")
const Game = mongoose.model("Game")

const runGeoQuery = function (req, res) {
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);
    console.log("Geo searching");
    const query = {
        "publisher.location": {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat]
                },
                $maxDistance: 1000,
                $minDistance: 0
            }
        }
    };
    Game.find(query).exec(function (err, games) {
        if (err) {
            console.log(err);
        };
        console.log("Found Games");
        res.status(200).json(games);
    });
}

module.exports.gamesGetAll = function (req, res) {
    Game.find().exec(function (err, games) {
        if (req.query && req.query.lat && req.query.lng) {
            runGeoQuery(req, res);
            return;
        }
        console.log("Found games", games);
        res.status(200).json(games);
    });
}

module.exports.gamesGetSome = function (req, res) {
    let maxCount = 100;
    let offset = 0;
    let count = 3;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (isNaN(count) || isNaN(offset)) {
        res.status(400).json({ "msg": "Error: query should be numbers" })
        return
    }
    if (count > maxCount) {
        res.status(400).json({
            "message": "cannot exceed" + maxCount
        })
        return
    }
    Game.find().skip(offset).limit(count).exec(function (err, docs) {
        if (err) {
            res.status(500).json(err)
        } else {
            console.log("Found games", docs);
            res.status(200).json(docs);
        }
    }
    )
}

module.exports.gamesGetOne = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function (err, game) {
        const response = {
            status: 200,
            message: game
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!game) {
            response.status = 404;
            response.message = { "msg": "not found" }
        }
        res.status(response.status).json(response.message)

    })
}

module.exports.gamesUpdateOne = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("-reviews -publisher").exec(function (err, game) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } else if (!game) {
            response.status = 404;
            response.message = { "message": "Game ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            game.title = req.body.title;
            game.year = parseInt(req.body.year);
            game.price = parseFloat(req.body.price);
            game.designer = req.body.designer;
            game.minPlayers = parseInt(req.body.minPlayers);
            game.maxPlayers = parseInt(req.body.maxPlayers);
            game.rate = parseFloat(req.body.rate);
            game.minAge = parseInt(req.body.minAge);
            game.publisher = {};
            game.save(function (err, updatedGame) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            });
        }
    });
};

module.exports.gamesAddOne = function (req, res) {
    Game.create({
        title: req.body.title,
        year: parseInt(req.body.year),
        price: parseFloat(req.body.price),
        designer: req.body.designer,
        publisher: { name: "empty", location: [] },
        minPlayers: parseInt(req.body.minPlayers),
        maxPlayers: parseInt(req.body.maxPlayers),
        rate: parseFloat(req.body.rate)
    },
        function (err, game) {
            if (err) {
                console.log("Error creating games");
                res.status(400).json(err);
            } else {
                console.log("Game created", game);
                res.status(201).json(game);
            }
        });
};

module.exports.gamesDeleteOne = function (req, res) {
    const gameId = req.params.gameId;
    console.log("DELETE gameId ", gameId);
     Game.findByIdAndRemove(gameId).exec(function (err, deletedGame) {
        const response = { status: 204,message:deletedGame }; 
        if (err) {
            console.log("Error finding game"); 
            response.status = 500; 
            response.message = err;
        } else if (!deletedGame) {
            response.status = 404;
            response.message = { "message": "Game ID not found" };
        }
        res.status(response.status).json(response.message);
    });
};