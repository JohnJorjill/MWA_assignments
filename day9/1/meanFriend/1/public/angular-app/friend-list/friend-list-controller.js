angular.module("meanFriends").controller("FriendsController",FriendsController)

function FriendsController(FriendDataFactory){
    const vm = this;
    vm.title = "Mean Friends APP";
    FriendDataFactory.getAllFriends().then(function(response){
        vm.friends = response;
    });
    vm.addFriend=function(){
        const newFriend={
            firstname: vm.newFriendFirstname,
            lastname: vm.newFriendLastname,
            birthdate: vm.newFriendBirthdate
        };
        if(vm.friendForm.$valid){
            console.log(newFriend);
            FriendDataFactory.addOneFriend(newFriend).then(function(response){
                console.log(response);
            }).catch(function(error){
                console.log(error);
            });
        }
    }
}