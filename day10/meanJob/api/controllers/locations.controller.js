const mongoose = require("mongoose")
const Job = mongoose.model("Job")

module.exports.locationsGetAll = function (req, res) {
    const jobId = req.params.jobId;
    Job.findById(jobId).select("location").exec(function (err, job) {
        res.status(200).json(job.location)
    })
}

// module.exports.publisherGetOne = function (req, res) {
//     const gameId = req.params.gameId;
//     const publisherId = req.params.publisherId;
//     Game.findById(gameId).select("publisher").exec(function (err, game) {
//         const publisher = game.publisher.id(publisherId)
//         res.status(200).json(publisher)
//     })
// }

const _addLocation = (req, res, job, response) => {
    job.location.city = req.body.city;
    job.location.zip = req.body.zip;
    job.location.street = req.body.street;
    job.save((err, updatedJob) => {
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.message = updatedJob;
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.locationAddOne = function (req, res) {
    const jobId = req.params.jobId;
    Job.findById(jobId).select("location").exec(function (err, job) {
        const response = {
            status: 201,
            message: job
        };
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!job) {
            console.log("not found job");
            response.status = 404;
            response.message = { "msg": "not found job" };
        }
        if (job) {
            _addLocation(req, res, job, response);
        } else {
            res.status(response.status).json(response.message);
        }
    })
}

const _updateLocation = function (req, res, job) {
    job.location.city = req.body.city;
    job.location.zip = req.body.zip;
    job.location.street = req.body.street;
    job.save(function (err, updatedJob) {
        const response = { status: 204, message: updatedJob };
        if (err) {
            console.log("Error finding job");
            response.status = 500;
            response.message = err
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.locationUpdate = function (req, res) {
    const jobId = req.params.jobId;
    console.log("PUT jobId ", jobId);
    Job.findById(jobId).select("location").exec(function (err, job) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding job");
            response.message = err;
            response.status = 500;
        } else if (!job) {
            response.status = 404;
            response.message = { "message": "Job ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            console.log(job);
            _updateLocation(req, res, job);
        }
    });
}

const _deleteLocation = function (req, res, job) {
    job.location.remove(); 
    job.save(function (err, job) {
        const response = { status: 204 }; 
        if (err) {
            console.log("Error finding job");
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.locationDelete = function(req,res){
    const jobId = req.params.jobId;
    Job.findById(jobId).select("location").exec(function (err, job) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding job");
            response.message = err;
            response.status = 500;
        } else if (!job) {
            response.status = 404;
            response.message = { "message": "Job ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            console.log(job);
            _deleteLocation(req, res, job);
        }
    });
}