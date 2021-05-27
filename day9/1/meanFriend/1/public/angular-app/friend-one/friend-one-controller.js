angular.module("meanFriends").controller("FriendController",FriendController)

function FriendController($routeParams, FriendDataFactory){
    const vm = this;
    const friendId = $routeParams.id;
    FriendDataFactory.getOneFriend(friendId).then(function(response){
        console.log(response);
        vm.friend = response;
    });

    vm.deleteFriend = function(){
        FriendDataFactory.deleteFriend(friendId).then(function(){
            console.log("deleted");
        }).catch(function(error){
            console.log(error);
        });
    }
}