angular.module("meanFriends").controller("FriendsController",FriendsController)

function FriendsController(FriendDataFactory, AuthFactory){
    
    const vm = this;
    vm.title = "Mean Friends APP";

    FriendDataFactory.getAllFriends().then(function(response){
        vm.friends = response;
    });

    vm.isLoggedIn = function(){
        return AuthFactory.auth.isLoggedIn;
    };

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

    vm.searchFriend=function(){
        if(vm.friendForm.$valid){
            FriendDataFactory.searchFriend(vm.friendName).then(function(response){
                vm.friends = response;
            }).catch(function(error){
                console.log(error);
            });
        }
    }

}