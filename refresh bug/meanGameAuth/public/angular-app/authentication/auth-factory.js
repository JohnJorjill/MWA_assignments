angular.module("meanGames").factory("AuthFactory",AuthFactory);

function AuthFactory($window){
    let auth = {isLoggedIn: false};
    if($window.sessionStorage.token){
        auth.isLoggedIn = true;
    }
    return {
        auth: auth
    };
}