angular.module("meanGames").controller("GameController",GameController)

function _getStarRating(stars){
    return new Array(stars);
}

function GameController($routeParams, GameDataFactory, $route){
    const vm = this;
    const gameId = $routeParams.id;

    GameDataFactory.getOneGame(gameId).then(function(game){
        vm.game = game;
        vm.rating = _getStarRating(vm.game.rate);
        //populate edit form
        vm.editedGamePrice = game.price;
        vm.editedGameMinPlayers = game.minPlayers;
        vm.editedGameMaxPlayers = game.maxPlayers;
        vm.editedGameMinAge = game.minAge;
    });

    vm.updateGame = function(){
        const editedGame = {
            title:vm.game.title,
            year:vm.game.year,
            rate:vm.game.rate,
            price: vm.editedGamePrice,
            minPlayers: vm.editedGameMinPlayers,
            maxPlayers:vm.editedGameMaxPlayers,
            minAge:vm.editedGameMinAge,
            designers:vm.game.designers,
            publisher:vm.game.publisher
        };
        GameDataFactory.replaceOneGame(gameId,editedGame).then(function(){
            $route.reload();
        }).catch(function(error){
            console.log(error);
        });
    }

    vm.deleteGame = function(){
        GameDataFactory.deleteGame(gameId).then(function(){
            console.log("deleted");
        }).catch(function(error){
            console.log(error);
        });
    }
}