const express = require("express");
const router = express.Router();
const controllerJobs = require("../controllers/jobs.controller");
const controllerLocations = require("../controllers/locations.controller");

router.route("/jobs")
      .get(controllerJobs.jobsGetAll)
      .post(controllerJobs.jobsAddOne)

router.route("/jobs/some")
      .get(controllerJobs.jobsGetSome)

router.route("/jobs/:jobId")
      .get(controllerJobs.jobsGetOne)
      .put(controllerJobs.jobsUpdateOne)
      .delete(controllerJobs.jobsDeleteOne)

router.route("/jobs/:jobId/locations")
      .get(controllerLocations.locationsGetAll)
      .post(controllerLocations.locationAddOne)
      .put(controllerLocations.locationUpdate)
      .delete(controllerLocations.locationDelete)

module.exports = router;