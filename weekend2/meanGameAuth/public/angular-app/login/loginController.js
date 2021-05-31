angular.module("meanGames").controller("LoginController",LoginController);

function LoginController($http, $location){
    const vm = this;

    vm.login = function(){
        const loginUser = {
            username:vm.username,
            password: vm.password
        };
        if(!vm.username || !vm.password){
            vm.err = "Please add username and password"
        }else{
            $http.post("/api/auth",loginUser).then(function(result){
                console.log(result);
                $location.path("/games")
            }).catch(function(error){
                console.log(error);
            });
        }
    }

    vm.goRegister = function(){
        $location.path("/register")
    }
}