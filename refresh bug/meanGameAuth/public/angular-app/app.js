angular.module("meanGames", ["ngRoute","angular-jwt"]).config(config).run(run);

function config($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");

    $routeProvider.when("/", { 
        templateUrl: "angular-app/welcome/welcome.html",
        access:{restricted:false}
    }).when("/games", {
        templateUrl: "angular-app/game-list/game-list.html",
        controller: "GamesController",
        controllerAs: "vm",
        access:{restricted:false}
    }).when("/register", {
        templateUrl: "angular-app/register/register.html",
        controller: "RegisterController",
        controllerAs: "vm",
        access:{restricted:false}
    }).when("/game/:id", {
        templateUrl: "angular-app/game-one/game-one.html",
        controller: "GameController",
        controllerAs: "vm",
        access:{restricted:false}
    }).when("/profile", {
        templateUrl: "angular-app/profile/profile.html",
        access:{restricted:true}
    }).otherwise({
        redirectTo: "/"
    })
}

function run($rootScope, $location, $window, AuthFactory,$http,$window){
    $http.defaults.headers.common.Authorization = 'Bearer '+$window.sessionStorage.token;
    $rootScope.$on("$routeChangeStart",function(event,nextRoute,currentRoute){
        if(nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.auth.isLoggedIn){
            event.preventDefault();
            $location.path("/");
        }
    });
}