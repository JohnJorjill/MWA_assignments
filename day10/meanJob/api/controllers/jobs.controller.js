const mongoose = require("mongoose")
const Job = mongoose.model("Job")

module.exports.jobsGetAll = function (req, res) {
    Job.find().exec(function (err, jobs) {
        const response = {
            status: 200,
            message: jobs
        };
        if(err){
            response.status = 500;
            response.message = err;
        }else if (!jobs){
            response.status = 404;
            response.message = {"message":"not found"};
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.jobsGetSome = function (req, res) {
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
    Job.find().skip(offset).limit(count).exec(function (err, docs) {
        if (err) {
            res.status(500).json(err);
        } else {
            console.log("Found jobs", docs);
            res.status(200).json(docs);
        }
    }
    )
}

module.exports.jobsGetOne = function (req, res) {
    const jobId = req.params.jobId;
    Job.findById(jobId).exec(function (err, job) {
        const response = {
            status: 200,
            message: job
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!job) {
            response.status = 404;
            response.message = { "msg": "not found" }
        }
        res.status(response.status).json(response.message)

    })
}

module.exports.jobsUpdateOne = function (req, res) {
    const jobId = req.params.jobId;
    Job.findById(jobId).select("-reviews -publisher").exec(function (err, job) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding job");
            response.status = 500;
            response.message = err;
        } else if (!job) {
            response.status = 404;
            response.message = { "message": "Job ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            job.title = req.body.title;
            job.salary = parseInt(req.body.salary);
            job.description = req.body.description;
            job.experience = parseInt(req.body.experience);
            job.skills = req.body.skills;
            job.postDate = Date.parse(req.body.postDate);
            job.location = {};

            job.save(function (err, updatedJob) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            });
        }
    });
};

module.exports.jobsAddOne = function (req, res) {
    Job.create({
        title: req.body.title,
        salary: parseInt(req.body.salary),
        description: req.body.description,
        experience: parseInt(req.body.experience),
        skills: req.body.skills,
        postDate: Date.parse(req.body.postDate),
        location: {city:"",zip:0,street:""}
    },
        function (err, job) {
            if (err) {
                console.log("Error creating job");
                res.status(400).json(err);
            } else {
                console.log("Job created", job);
                res.status(201).json(job);
            }
        });
};

module.exports.jobsDeleteOne = function (req, res) {
    const jobId = req.params.jobId;
    console.log("DELETE jobId ", jobId);
     Job.findByIdAndRemove(jobId).exec(function (err, deletedJob) {
        const response = { status: 204,message:deletedJob }; 
        if (err) {
            console.log("Error finding job"); 
            response.status = 500; 
            response.message = err;
        } else if (!deletedJob) {
            response.status = 404;
            response.message = { "message": "Job ID not found" };
        }
        res.status(response.status).json(response.message);
    });
};