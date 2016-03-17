/**
 * Created by alex on 16/03/16.
 */
angular
    .module('pointService')
    .controller('ctrlGetOneServiceById', ctrlGetOneServiceById);

ctrlGetOneServiceById.$inject = ['$location', 'services', 'authentication'];

function ctrlGetOneServiceById($location, services, authentication){
    var vm = this;
    var currentUser = authentication.currentUser();

    vm.errorGetOneServiceById ="";
    vm.serviceById = "";
    var serviceId = $location.search();
    vm.isMyService = false;


    console.log(serviceId.id);
    if(serviceId){
        services
            .reqGetOneServiceById(serviceId.id)
            .error(function (err) {
                vm.errorGetOneServiceById = err;
            })
            .then(function () {
                vm.serviceById = services.getOneServiceById();
                vm.isMyService = vm.serviceById.username === currentUser.username;

            });


    }


}