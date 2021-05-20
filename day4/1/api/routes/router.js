const express = require("express");
const router = express.Router();
const controllerGame = require("../controllers/games.controller");


router.route("/games")
.get(controllerGame.gamesGetAll)

router.route("/games/some")
.get(controllerGame.gamesGetSome)

router.route("/games/:gameId")
.get(controllerGame.gamesGetOne)

module.exports = router;