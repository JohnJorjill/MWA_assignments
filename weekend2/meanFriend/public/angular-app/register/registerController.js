angular.module("meanFriends").controller("RegisterController",RegisterController);

function RegisterController($http,$location){
    const vm = this;

    vm.register = function(){
        const newUser = {
            name: vm.name,
            username:vm.username,
            password: vm.password
        };
        if(!vm.username || !vm.password){
            vm.err = "Please add username and password"
        }else{
            if(vm.password !== vm.passwordrepeat){
                vm.err="Please make sure the passwords match.";
            }else{
                $http.post("/api/users",newUser).then(function(result){
                    console.log(result);
                    vm.message = "Successful registration, please login";
                    vm.err = "";
                    $location.path("/")
                }).catch(function(error){
                    console.log(error);
                });
            }
        }
    }

    vm.goLogin = function(){
        $location.path("/")
    }
}