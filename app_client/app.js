/**
 * Created by alex on 14/03/16.
 */
var myModule = angular.module('pointService', ['ngRoute']);
myModule.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'home/index.html'

        })
        .otherwise({redirectTo : '/'});

});

