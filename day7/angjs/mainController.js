angular.module("myProperApp").controller("MainController",MainController);

function MainController($http){
    let vm = this;
    $http.get("https://animechan.vercel.app/api/quotes").then(function(response){
        vm.quotes = response.data;
    });
}