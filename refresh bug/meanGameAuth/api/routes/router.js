const express = require("express");
const router = express.Router();
const controllerGame = require("../controllers/games.controller");
const controllerPublishers = require("../controllers/publishers.controller");
const controllerUsers=require("../controllers/users.controller");

router.route("/games")
      .get(controllerUsers.authenticate,controllerGame.gamesGetAll)
      .post(controllerUsers.authenticate, controllerGame.gamesAddOne)
      
router.route("/games/some")
      .get(controllerGame.gamesGetSome)

router.route("/game/:gameId")
      .get(controllerGame.gamesGetOne)
      .put(controllerGame.gamesUpdateOne)
      .delete(controllerGame.gamesDeleteOne);

router.route("/games/:gameId/publishers")
      .get(controllerPublishers.publishersGetAll)
      .post(controllerPublishers.publisherAddOne)
      .put(controllerPublishers.publisherUpdate)
      .delete(controllerPublishers.publisherDelete);

router.route("/users")
      .post(controllerUsers.usersRegister);

router.route("/auth")
      .post(controllerUsers.usersAuthenticate);

module.exports = router;