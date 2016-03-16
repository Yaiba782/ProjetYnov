/**
 * Created by alex on 14/03/16.
 */
angular.module('pointService', ['ngRoute']);

function config ($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl : 'home/index.html',
            controller : 'ctrlHome',
            controllerAs : 'vm'
        })
        .when('/connexion', {
            templateUrl : 'auth/registerLogin/registerLogin.view.html',
            controller : 'ctrlRegisterLogin',
            controllerAs : 'vm'
        })
        .otherwise({redirectTo : '/'});
}

angular
    .module('pointService')
    .config(['$routeProvider', config]);


