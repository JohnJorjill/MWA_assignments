angular.module("meanFriends").factory("FriendDataFactory",FriendDataFactory);

function FriendDataFactory($http){
    return {
        getAllFriends: getAllFriends,
        getOneFriend: getOneFriend,
        addOneFriend: addOneFriend,
        deleteFriend: deleteFriend,
        searchFriend: searchFriend
    };

    function addOneFriend(friend){
        return $http.post("/api/friends/",friend).then(complete).catch(failed);
    }

    function deleteFriend(friendId){
        return $http.delete("/api/friends/"+friendId).then(complete).catch(failed);
    }

    function getAllFriends(){
        return $http.get("/api/friends").then(complete).catch(failed);
    };

    function getOneFriend(id){
        return $http.get("/api/friends/"+id).then(complete).catch(failed);
    };

    function searchFriend(name){
        return $http.get("/api/friends/name/"+name).then(complete).catch(failed);
    };

    function complete(response){
        return response.data;
    };

    function failed(error){
        return error.status.statusText;
    }
}