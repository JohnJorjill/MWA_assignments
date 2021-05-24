const mongoose = require("mongoose")
const Student = mongoose.model("Student")

module.exports.addressesGetAll = function (req, res) {
    const studentId = req.params.studentId;
    Student.findById(studentId).select("address").exec(function (err, student) {
        res.status(200).json(student.address)
    })
}

module.exports.addressGetOne = function (req, res) {
    const studentId = req.params.studentId;
    const addressId = req.params.addressId;
    Student.findById(studentId).select("address").exec(function (err, student) {
        const address = student.addresses.id(addressId);
        res.status(200).json(address);
    })
}