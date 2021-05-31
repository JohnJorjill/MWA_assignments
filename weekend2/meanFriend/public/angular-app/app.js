angular.module("meanFriends",["ngRoute"]).config(config);

function config($routeProvider,$locationProvider){
    $locationProvider.hashPrefix("");
    $routeProvider.when("/", {
        templateUrl: "angular-app/login/login.html",
        controller: "LoginController",
        controllerAs: "vm"
    }).when("/friends",{
        templateUrl: "angular-app/friend-list/friend-list.html",
        controller: "FriendsController",
        controllerAs: "vm"
    }).when("/friend/:id",{
        templateUrl: "angular-app/friend-one/friend-one.html",
        controller: "FriendController",
        controllerAs: "vm"
    }).when("/register", {
        templateUrl: "angular-app/register/register.html",
        controller: "RegisterController",
        controllerAs: "vm"
    })
}