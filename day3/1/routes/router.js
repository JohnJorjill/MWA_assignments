const express = require("express");
const router = express.Router();
const controller = require("../controllers/games.controller");

router.route("/games")
.get(controller.gamesGetAll)
.post(function (req, res) {
    console.log("POST JSON request");
    res.status(200).json({ "jsonData": true });
});

router.route("/games/some")
.get(controller.gamesGetSome)

module.exports = router;