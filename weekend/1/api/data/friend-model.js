const mongoose = require("mongoose");

const interestSchema = new mongoose.Schema({
    sport: String,
    music: String,
    movie: String
});

const friendSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    birthdate: Number,
    rate: {
        type: Number,
        min: 1,
        max: 5,
        "default": 1
    },
    minFriends: {
        type: Number,
        min: 1,
        max: 10
    },
    maxFriends: Number,
    minAge: Number,
    interest: interestSchema
});

mongoose.model("Friend", friendSchema, "friends");