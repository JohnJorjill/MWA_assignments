angular.module("meanJobs").controller("JobsController",JobsController)

function JobsController(JobDataFactory){
    const vm = this;
    vm.title = "Mean Jobs APP";
   JobDataFactory.getAllJobs().then(function(response){
        vm.jobs = response;
    });
    vm.addJob=function(){
        const newJob={
            title: vm.newJobTitle,
            salary: vm.newJobSalary,
            description: vm.newJobDescription,
            experience: vm.newJobExperience,
            skills: vm.newJobSkills,
            postDate: vm.newJobPostDate,
        };
        if(vm.jobForm.$valid){
            console.log(newJob);
            JobDataFactory.addOneJob(newJob).then(function(response){
                console.log(response);
            }).catch(function(error){
                console.log(error);
            });
        }

    }
}