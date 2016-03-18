/**
 * Created by alex on 16/03/16.
 */
angular
    .module('pointService')
    .controller('ctrlGetOneServiceById', ctrlGetOneServiceById);

ctrlGetOneServiceById.$inject = ['$location', 'services', 'authentication', '$ngBootbox'];

function ctrlGetOneServiceById($location, services, authentication, $ngBootbox){
    var vm = this;
    var currentUser = authentication.currentUser();
    vm.formError = [];

    vm.errorGetOneServiceById ="";
    vm.serviceById = "";
    var serviceId = $location.search();
    vm.isMyService = false;

    if(serviceId){
        services
            .reqGetOneServiceById(serviceId.id)
            .error(function (err) {
                formattedError(err);
                var stringError = formattedErrorArray();
                $ngBootbox.alert(stringError);
            })
            .then(function () {
                vm.serviceById = services.getOneServiceById();
                vm.isMyService = vm.serviceById.username === currentUser.username;
            });
    }
    vm.deleteMyService = function () {
        if(serviceId){
            services
                .reqDeleteServiceById(serviceId.id)
                .error(function () {
                    formattedError(err);
                    var stringError = formattedErrorArray();
                    $ngBootbox.alert(stringError);
                })
                .then(function () {
                    $ngBootbox.alert('Votre service a bien été supprimé')
                        .then(function() {
                            $location.path('/getAllServices');
                        });
                })
        }
    };

    var formattedError = services.formattedError(vm);

    var formattedErrorArray = services.formattedErrorArray(vm);

    ////////////////////////////////////////////////////////////for navigation directive
    vm.navigationPc = {};
    vm.navigationPc.isLoggedIn = authentication.isLoggedIn();
    vm.authentication = authentication;
    vm.$ngBootbox = $ngBootbox;
    vm.$location = $location;
    vm.navigationPc.logout = authentication.alertLogout(vm);
    ////////////////////////////////////////////////////////////for navigation directive

}