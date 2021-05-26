angular.module("meanFriends").controller("FriendsController",FriendsController)

function FriendsController(FriendDataFactory){
    const vm = this;
    vm.title = "Mean Friends APP";
    FriendDataFactory.getAllFriends().then(function(response){
        vm.friends = response;
    });

}