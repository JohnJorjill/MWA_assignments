angular.module("meanFriends",["ngRoute","angular-jwt"]).config(config).run(run);

function config($routeProvider,$locationProvider){
    $locationProvider.hashPrefix("");

    $routeProvider.when("/", {
        templateUrl: "angular-app/welcome/welcome.html",
        access:{restricted:false}
    }).when("/friends",{
        templateUrl: "angular-app/friend-list/friend-list.html",
        controller: "FriendsController",
        controllerAs: "vm"
    }).when("/register", {
        templateUrl: "angular-app/register/register.html",
        controller: "RegisterController",
        controllerAs: "vm"
    }).when("/friend/:id",{
        templateUrl: "angular-app/friend-one/friend-one.html",
        controller: "FriendController",
        controllerAs: "vm"
    }).when("/profile", {
        templateUrl: "angular-app/profile/profile.html",
        access:{restricted:true}
    }).otherwise({
        redirectTo: "/"
    })

}

function run($rootScope, $location, $window, AuthFactory){
    $rootScope.$on("$routeChangeStart",function(event,nextRoute,currentRoute){
        if(nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.auth.isLoggedIn){
            event.preventDefault();
            $location.path("/");
        }
    });
}