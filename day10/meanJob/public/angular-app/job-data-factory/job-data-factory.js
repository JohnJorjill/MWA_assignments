angular.module("meanJobs").factory("JobDataFactory",JobDataFactory);

function JobDataFactory($http){
    return {
       getAllJobs: getAllJobs,
        getOneJob: getOneJob,
        addOneJob: addOneJob,
        replaceOneJob: replaceOneJob,
        deleteJob: deleteJob
    };

    function getOneJob(id){
        return $http.get("/api/jobs/"+id).then(complete).catch(failed);
    }
    function replaceOneJob(jobId,job){
        return $http.put("/api/job/"+jobId,job).then(complete).catch(failed);
    }

    function deleteJob(jobId){
        return $http.delete("api/job/"+jobId).then(complete).catch(failed);
    }

    function getAllJobs(){
        return $http.get("/api/jobs").then(complete).catch(failed);
    };

    function addOneJob(id){
        console.log("getting one");
        return $http.get("/api/job/"+id).then(complete).catch(failed);
    };

    function complete(response){
        return response.data;
    };

    function failed(error){
        return error.status.statusText;
    }
}