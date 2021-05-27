const mongoose = require("mongoose")
const Friend = mongoose.model("Friend")

module.exports.interestsGetAll = function (req, res) {
    const friendId = req.params.friendId;
    Friend.findById(friendId).select("interest").exec(function (err, friend) {
        res.status(200).json(friend.interest)
    })
}

const _addInterest = (req, res, friend, response) => {
    friend.interest.sport = req.body.sport;
    friend.interest.music = req.body.music;
    friend.interest.movie = req.body.movie;
    friend.save((err, updatedFriend) => {
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.message = updatedFriend;
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.interestAddOne = function (req, res) {
    const friendId = req.params.friendId;
    Friend.findById(friendId).select("interest").exec(function (err, friend) {
        const response = {
            status: 201,
            message: friend
        };
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!friend) {
            console.log("not found friend");
            response.status = 404;
            response.message = { "msg": "not found friend" };
        }
        if (friend) {
            _addInterest(req, res, friend, response);
        } else {
            res.status(response.status).json(response.message);
        }
    })
}

const _updateInterest = function (req, res, friend) {
    friend.interest.sport = req.body.sport;
    friend.interest.music = req.body.music;
    friend.interest.movie = req.body.movie;
    friend.save(function (err, updatedFriend) {
        const response = { status: 204, message: updatedFriend };
        if (err) {
            console.log("Error finding friend");
            response.status = 500;
            response.message = err
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.interestUpdate = function (req, res) {
    const friendId = req.params.friendId;
    console.log("PUT friendId ", friendId);
    Friend.findById(friendId).select("interest").exec(function (err, friend) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding friend");
            response.message = err;
            response.status = 500;
        } else if (!friend) {
            response.status = 404;
            response.message = { "message": "Friend ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            console.log(friend);
            _updateInterest(req, res, friend);
        }
    });
}

const _deleteInterest = function (req, res, friend) {
    friend.interest.remove(); 
    friend.save(function (err, friend) {
        const response = { status: 204 }; if (err) {
            console.log("Error finding friend");
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.interestDelete = function(req,res){
    const friendId = req.params.friendId;
    Friend.findById(friendId).select("interest").exec(function (err, friend) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding friend");
            response.message = err;
            response.status = 500;
        } else if (!friend) {
            response.status = 404;
            response.message = { "message": "Friend ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            console.log(friend);
            _deleteInterest(req, res, friend);
        }
    });
}