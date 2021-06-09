angular.module("meanGames").factory("GameDataFactory",GameDataFactory);

function GameDataFactory($http){
    return {
        getAllGames: getAllGames,
        getOneGame: getOneGame,
        addOneGame: addOneGame
    };

    function addOneGame(game){
        return $http.post("/api/games",game).then(complete).catch(failed);
    }

    function getAllGames(){
        return $http.get("/api/games").then(complete).catch(failed);
    };

    function getOneGame(id){
        console.log("getting one");
        return $http.get("/api/game/"+id).then(complete).catch(failed);
    };

    function complete(response){
        return response.data;
    };

    function failed(error){
        return error.status.statusText;
    }
}