angular.module("meanFriends",["ngRoute"]).config(config);

function config($routeProvider,$locationProvider){
    $locationProvider.hashPrefix("");
    $routeProvider.when("/",{
        templateUrl: "angular-app/friend-list/friend-list.html",
        controller: "FriendsController",
        controllerAs: "vm"
    }).when("/friend/:id",{
        templateUrl: "angular-app/friend-one/friend-one.html",
        controller: "FriendController",
        controllerAs: "vm"
    })
}