/**
 * Created by alex on 14/03/16.
 */
angular.module('pointService', ['ngRoute', 'ngAnimate']);

function config ($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl : 'home/home.view.html',
            controller : 'ctrlHome',
            controllerAs : 'vm'
        })
        .when('/registerLogin', {
            templateUrl : 'auth/registerLogin/registerLogin.view.html',
            controller : 'ctrlRegisterLogin',
            controllerAs : 'vm'
        })
        .when('/addService', {
            templateUrl : 'service/addService/addService.view.html',
            controller : 'ctrlAddService',
            controllerAs : 'vm'
        })
        .when('/getAllServices', {
            templateUrl : 'service/getAllServices/getAllServices.view.html',
            controller : 'ctrlGetAllServices',
            controllerAs : 'vm'
        })
        .when('/getOneServiceById', {
            templateUrl : 'service/getOneServiceById/getOneServiceById.view.html',
            controller : 'ctrlGetOneServiceById',
            controllerAs :'vm'
        })
       
        .otherwise({redirectTo : '/'});
}

angular
    .module('pointService')
    .config(['$routeProvider', config]);


