angular.module("meanFriends").controller("FriendController",FriendController)

function FriendController($routeParams, FriendDataFactory){
    const vm = this;
    let friendId = $routeParams.id;
    FriendDataFactory.getOneFriend(friendId).then(function(response){
        console.log(response);
        vm.friend = response;
    });
}