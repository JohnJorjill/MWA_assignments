const express = require("express");
const router = express.Router();
const controllerStudent = require("../controllers/student.controller");
const controllerAddress = require("../controllers/address.controller");

router.route("/students")
.get(controllerStudent.studentsGetAll)

router.route("/students/:studentId")
.get(controllerStudent.studentGetOne)

router.route("/students/:studentId/addresses")
.get(controllerAddress.addressesGetAll)

router.route("/students/:studentId/:addressId")
.get(controllerAddress.addressGetOne)

module.exports = router;