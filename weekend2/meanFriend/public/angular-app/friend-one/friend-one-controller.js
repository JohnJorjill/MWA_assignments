angular.module("meanFriends").controller("FriendController",FriendController)

function FriendController($routeParams, FriendDataFactory,AuthFactory){
    const vm = this;
    const friendId = $routeParams.id;
    FriendDataFactory.getOneFriend(friendId).then(function(response){
        vm.friend = response;
    });

    vm.isLoggedIn = function(){
        return AuthFactory.auth.isLoggedIn;
    };

    vm.deleteFriend = function(){
        FriendDataFactory.deleteFriend(friendId).then(function(){
            console.log("deleted");
        }).catch(function(error){
            console.log(error);
        });
    }
}