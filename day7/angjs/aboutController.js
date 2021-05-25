angular.module("myProperApp").controller("AboutController",AboutController);

function AboutController(){
    let vm = this;
    vm.bio = "This is my bio";
}