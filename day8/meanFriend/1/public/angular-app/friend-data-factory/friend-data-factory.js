angular.module("meanFriends").factory("FriendDataFactory",FriendDataFactory);

function FriendDataFactory($http){
    return {
        getAllFriends: getAllFriends,
        getOneFriend: getOneFriend
    };

    function getAllFriends(){
        return $http.get("/api/friends").then(complete).catch(failed);
    };

    function getOneFriend(id){
        return $http.get("/api/friends/"+id).then(complete).catch(failed);
    };

    function complete(response){
        return response.data;
    };

    function failed(error){
        return error.status.statusText;
    }
}