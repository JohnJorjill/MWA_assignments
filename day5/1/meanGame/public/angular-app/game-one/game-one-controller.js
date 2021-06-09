angular.module("meanGames").controller("GameController",GameController)

function _getStarRating(stars){
    return new Array(stars);
}

function GameController($routeParams, GameDataFactory){
    const vm = this;
    let gameId = $routeParams.id;
    GameDataFactory.getOneGame(gameId).then(function(game){
        vm.game = game;
        vm.rating = _getStarRating(vm.game.rate);
    });
}