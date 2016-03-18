/**
 * Created by alex on 15/03/16.
 */
angular.module('pointService')
    .service('authentication', authentication);

    authentication.$inject = ['$window', '$http'];


function authentication($window, $http){
    var saveToken = function (token) {
          $window.localStorage['pointServiceToken'] = token;

    };
    var getToken = function () {
            return $window.localStorage['pointServiceToken'];
    };

    var register = function (user) {
        return $http.post('/api/register', user).success(function (data) {
            saveToken(data.token);
        });
    };
    var login = function (user) {
        return $http.post('/api/login', user).success(function (data) {
            saveToken(data.token);
        });
    };

    var logout = function () {
        $window.localStorage.removeItem('pointServiceToken');
    };
    var isLoggedIn = function () {
        var token = getToken();
        if(token){
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        }
        if(!token){
            return false;
        }
    };

    var currentUser = function () {
        if(isLoggedIn()){
            var token = getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return {
                _id : payload._id,
                email : payload.email,
                username : payload.username
            };
        }
        if(!isLoggedIn()){
            return false;
        }
    };

    var alertLogout = function (vm) {
        return function () {
            vm.authentication.logout();
            vm.$ngBootbox.alert("Déconnexion réussie merci pour votre confiance à bientôt")
                .then(function () {
                    vm.$location.path('/registerLogin');
                    return;
                });
        }
    };

    return {
            saveToken : saveToken,
            getToken : getToken,
            register : register,
            login : login,
            logout : logout,
            isLoggedIn : isLoggedIn,
            currentUser: currentUser,
            alertLogout : alertLogout
    }
}