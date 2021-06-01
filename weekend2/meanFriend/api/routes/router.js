const express = require("express");
const router = express.Router();
const controllerFriend = require("../controllers/friends.controller");
const controllerInterests = require("../controllers/interests.controller");
const controllerUsers = require("../controllers/users.controller");

router.route("/friends")
      .get(controllerUsers.authenticate,controllerFriend.friendsGetAll)
      .post(controllerUsers.authenticate,controllerFriend.friendsAddOne)

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

router.route("/friends/name/:friendName")
      .get(controllerFriend.friendsGetOneByName)

router.route("/users")
      .post(controllerUsers.usersRegister);

router.route("/auth")
      .post(controllerUsers.usersAuthenticate);

module.exports = router;