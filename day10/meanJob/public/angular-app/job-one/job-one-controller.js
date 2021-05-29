angular.module("meanJobs").controller("JobController",JobController)

function JobController($routeParams, JobDataFactory, $route){
    const vm = this;
    const jobId = $routeParams.id;

    JobDataFactory.getOneJob(jobId).then(function(job){
        vm.job = job;
    });
    
    
    vm.updateJob = function(){
        const editedJob = {
            title:vm.editedJobTitle,
            salary:vm.editedJobSalary,
            description:vm.editedJobDescription,
            experience: vm.editedJobExperience,
            skills: vm.editedJobSkills,
            postDate:vm.editedJobPostDate
        };
        JobDataFactory.replaceOneGame(jobId,editedJob).then(function(){
            $route.reload();
        }).catch(function(error){
            console.log(error);
        });
    }

}