const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    city: String,
    street: String
});

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    birthdate: Number,
    gpa: Number,
    address: addressSchema
});

mongoose.model("Student", studentSchema, "Students");