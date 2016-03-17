/**
 * Created by alex on 16/03/16.
 */
angular
    .module('pointService')
    .controller('ctrlGetAllServices', ctrlGetAllServices);

ctrlGetAllServices.$inject = ['$location', 'services', 'authentication', '$scope'];

function ctrlGetAllServices($location, services, authentication, $scope){
    var vm = this;
    var currentUser = authentication.currentUser();
    vm.currentCategory = "";
    vm.errorGetAllServices ="";
    vm.errorGetAllServicesByUsername = "";
    vm.servicesArray = null;
    vm.allServices = null;
    vm.filterServices ="";
    vm.myServices = null;
    services
        .reqGetAllServices()
        .error(function (err) {
            vm.errorGetAllServices ="";
            return false;
        })
        .then(function () {
            vm.servicesArray = services.getAllServices();
            vm.allServices  = services.getAllServices();


        });
    if(currentUser.username){
        services
            .reqGetAllServiceByUsername(currentUser.username)
            .error(function (err) {
                vm.errorGetAllServicesByUsername = err;
                return false;
            })
            .then(function () {
                vm.myServices = services.getAllServiceByUsername();
            });

    }

    vm.optionValue = services.optionValue;
    vm.setSubCategory = function (currentCategory) {
        services.setSubCategory(currentCategory, vm);
    };
    vm.setFilterServices = function (currentSubCategory) {
        vm.filterServices = currentSubCategory;
        return true;
    };
    
    vm.getMyService = function () {
        if(vm.myServices.length > 0){
            vm.servicesArray = vm.myServices;
        }


    };
    vm.getAllServices = function () {
        if(vm.allServices.length > 0){
            vm.servicesArray = vm.allServices;
            return;
        }

    }

}