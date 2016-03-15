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

        })
        .otherwise({redirectTo : '/'});
}

angular
    .module('pointService')
    .config(['$routeProvider', config]);


