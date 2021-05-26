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
    interest: interestSchema
});

mongoose.model("Friend", friendSchema, "friends");