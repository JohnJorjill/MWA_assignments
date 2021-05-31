const mongoose = require("mongoose")
const Friend = mongoose.model("Friend")

module.exports.friendsGetAll = function (req, res) {
    Friend.find().exec(function (err, friends) {
        console.log("Found friends", friends);
        res.status(200).json(friends);
    });
}

module.exports.friendsGetSome = function (req, res) {
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
    Friend.find().skip(offset).limit(count).exec(function (err, docs) {
        if (err) {
            res.status(500).json(err)
        } else {
            console.log("Found friends", docs);
            res.status(200).json(docs);
        }
    }
    )
}

module.exports.friendsGetOne = function (req, res) {
    const friendId = req.params.friendId;
    Friend.findById(friendId).exec(function (err, friend) {
        const response = {
            status: 200,
            message: friend
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!friend) {
            response.status = 404;
            response.message = { "msg": "not found" }
        }
        res.status(response.status).json(response.message)

    })
}

module.exports.friendsUpdateOne = function (req, res) {
    const friendId = req.params.friendId;
    Friend.findById(friendId).select("-status -interest").exec(function (err, friend) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding friend");
            response.status = 500;
            response.message = err;
        } else if (!friend) {
            response.status = 404;
            response.message = { "message": "Friend ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            friend.firstname = req.body.firstname;
            friend.lastname = req.body.lastname;
            friend.birthdate = parseInt(req.body.price);
            friend.interest = {};
            friend.save(function (err, updatedFriend) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            });
        }
    });
};

module.exports.friendsAddOne = function (req, res) {
    Friend.create({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        birthdate:parseInt(req.body.birthdate),
        interest:{sport: "",music:"",movie:""}
    },
        function (err, friend) {
            if (err) {
                console.log("Error creating friends");
                console.log(err);
                res.status(400).json(err);
            } else {
                console.log("Friend created", friend);
                res.status(201).json(friend);
            }
        });
};

module.exports.friendsDeleteOne = function (req, res) {
    const friendId = req.params.friendId;
    console.log("DELETE friendId ", friendId);
     Friend.findByIdAndRemove(friendId).exec(function (err, deletedFriend) {
        const response = { status: 204,message:deletedFriend }; 
        if (err) {
            console.log("Error finding friend"); 
            response.status = 500; 
            response.message = err;
        } else if (!deletedFriend) {
            response.status = 404;
            response.message = { "message": "Friend ID not found" };
        }
        res.status(response.status).json(response.message);
    });
};

module.exports.friendsGetOneByName = function (req, res) {
    const friendName = req.params.friendName;
    Friend.find({'firstname':friendName}).exec(function (err, friend) {
        const response = {
            status: 200,
            message: friend
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!friend) {
            response.status = 404;
            response.message = { "msg": "not found" }
        }
        res.status(response.status).json(response.message)

    })
}