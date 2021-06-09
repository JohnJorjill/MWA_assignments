const express = require("express");
const router = express.Router();
const controllerGame = require("../controllers/games.controller");

router.route("/games")
      .get(controllerGame.gamesGetAll)
      .post(controllerGame.gamesAddOne)
      
router.route("/games/some")
      .get(controllerGame.gamesGetSome)

router.route("/game/:gameId")
      .get(controllerGame.gamesGetOne)
      .put(controllerGame.gamesUpdateOne)
      .delete(controllerGame.gamesDeleteOne);

module.exports = router;