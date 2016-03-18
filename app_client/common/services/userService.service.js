/**
 * Created by alex on 18/03/16.
 */
angular
    .module('pointService')
    .service('userService', userService);
userService.$inject = ['$http', 'authentication'];

function userService($http){

    var user = null;
    var saveUser = function (data) {
        user = data;
    };
    var reqGetOneUserById = function (userId) {
        return $http.get('/api/users/' + userId + '/userid')
            .success(function (data) {
                saveUser(data);
            });
    };
    var getUser = function () {
        return user;
    };

    return {
        reqGetOneUserById : reqGetOneUserById,
        getUser : getUser
    }
}