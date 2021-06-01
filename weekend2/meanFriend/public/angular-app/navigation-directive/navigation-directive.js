angular.module("meanFriends").directive("friendsNavigation", FriendsNavigation)

function FriendsNavigation(){
    return {
        restrict:"E",
        templateUrl: "angular-app/navigation-directive/navigation-directive.html"
    };
}