angular.module("meanGames").controller("GamesController",GamesController)

function GamesController(GameDataFactory){
    const vm = this;
    vm.title = "Mean Games APP";
    GameDataFactory.getAllGames().then(function(response){
        console.log("getting all");
        vm.games = response;
    });

}