angular.module("meanGames").directive("gameRating",GameRating); // canelcase

function GameRating(){
    return {
        restrict: "E", // elemet or attribute
        templateUrl: "angular-app/game-rating-directive/rating.html",
        bindToController: true,
        controller:"GameController",
        controllerAs:"vm",
        scope:{
            stars:"@" // = @ & scopes (isolation level of directive)
        }
    }
};