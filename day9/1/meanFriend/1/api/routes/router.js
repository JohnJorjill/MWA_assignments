const express = require("express");
const router = express.Router();
const controllerFriend = require("../controllers/friends.controller");
const controllerInterests = require("../controllers/interests.controller");

router.route("/friends")
      .get(controllerFriend.friendsGetAll)
      .post(controllerFriend.friendsAddOne)
      
router.route("/friends/some")
      .get(controllerFriend.friendsGetSome)

router.route("/friends/:friendId")
      .get(controllerFriend.friendsGetOne)
      .put(controllerFriend.friendsUpdateOne)
      .delete(controllerFriend.friendsDeleteOne);

router.route("/friends/:friendId/interests")
      .get(controllerInterests.interestsGetAll)
      .post(controllerInterests.interestAddOne)
      .put(controllerInterests.interestUpdate)
      .delete(controllerInterests.interestDelete);


module.exports = router;