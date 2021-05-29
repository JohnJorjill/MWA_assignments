const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    city:String,
    zip:Number,
    street:String
});

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    salary: Number,
    description:String,
    experience: Number,
    skills:[String],
    postDate: {type: Date, default: Date.now},
    location: locationSchema
});

mongoose.model("Job", jobSchema, "jobs");