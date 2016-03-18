/**
 * Created by alex on 16/03/16.
 */
angular
    .module('pointService')
    .controller('ctrlGetAllServices', ctrlGetAllServices);

ctrlGetAllServices.$inject = ['$location', 'services', 'authentication', '$ngBootbox'];

function ctrlGetAllServices($location, services, authentication, $ngBootbox ){

    var vm = this;
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.logout = function(){
        authentication.logout();
        $ngBootbox.alert('vous êtes maintenant déconnecté')
            .then(function() {
                $location.path('/registerLogin');
            });

    };
    var currentUser = authentication.currentUser();
    vm.currentCategory = "";
    vm.errorGetAllServices ="";
    vm.errorGetAllServicesByUsername = "";
    vm.servicesArray = [];
    vm.allServices = [];
    vm.filterServices ="";
    vm.myServices = [];
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
            return true;
        }
        $ngBootbox.alert("vous ne possédez pas de services");
        return false;
    };
    vm.getAllServices = function () {
        if(vm.allServices.length > 0){
            vm.servicesArray = vm.allServices;
            return;
        }

    };


    ////////////////////////////////////////////////////////////for navigation directive
    vm.navigationPc = {};
    vm.navigationPc.isLoggedIn = authentication.isLoggedIn();
    vm.authentication = authentication;
    vm.$ngBootbox = $ngBootbox;
    vm.$location = $location;
    vm.navigationPc.logout = authentication.alertLogout(vm);
    ////////////////////////////////////////////////////////////for navigation directive


}