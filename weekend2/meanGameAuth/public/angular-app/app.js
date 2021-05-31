angular.module("meanGames", ["ngRoute"]).config(config);

function config($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider.when("/games", { // go to game-list.html when "/"
        templateUrl: "angular-app/game-list/game-list.html",
        controller: "GamesController",
        controllerAs: "vm"
    }).when("/register", {
        templateUrl: "angular-app/register/register.html",
        controller: "RegisterController",
        controllerAs: "vm"
    }).when("/", {
        templateUrl: "angular-app/login/login.html",
        controller: "LoginController",
        controllerAs: "vm"
    }).when("/game/:id", {
        templateUrl: "angular-app/game-one/game-one.html",
        controller: "GameController",
        controllerAs: "vm"
    }).otherwise({
        redirectTo: "/"
    })
}