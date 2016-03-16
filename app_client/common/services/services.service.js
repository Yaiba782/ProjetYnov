/**
 * Created by alex on 16/03/16.
 */
angular
    .module('pointService')
    .service('services', services);
    services.$inject = ['$http', 'authentication'];

function services($http, authentication){
    var addService = function (service) {
        return $http.post('/api/services', service, {
            headers : {
                Authorization : 'Bearer ' + authentication.getToken()
            }
        }).success(function (data) {
            return;
        });
    };
    var getAllServices = function () {
        return $http.get('/api/services');
    };
    var getOneServiceById = function (serviceId) {
        return $http.get('/api/services/' + serviceId + '/getOneServiceById');
    };
    var getAllServiceByUsername = function (username) {
        return $http.get('/api/services/' + username + '/getAllServiceByUsername');
    };
    var updateServiceById = function (serviceId, service) {
        return $http.put('/api/services/' + serviceId, service, {
            headers : {
                Authorization : 'Bearer ' + authentication.getToken()
            }
        });
    };
    var deleteServiceById = function (serviceId) {
        return $http.delete('/api/services/' + serviceId, {
            headers : {
                Authorization : 'Bearer ' + authentication.getToken()
            }
        });
    };

    return {
        addService : addService,
        getAllServices : getAllServices,
        getOneServiceById : getOneServiceById,
        getAllServiceByUsername : getAllServiceByUsername,
        updateServiceById: updateServiceById,
        deleteServiceById : deleteServiceById

    }
}