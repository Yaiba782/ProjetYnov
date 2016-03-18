/**
 * Created by alex on 14/03/16.
 */




angular.module('pointService')
        .controller('ctrlHome', ctrlHome);

ctrlHome.$inject = ['$location', 'services', 'authentication', '$ngBootbox'];


function ctrlHome($location, services, authentication, $ngBootbox){
    var vm = this;
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.logout = function(){
        authentication.logout();
        $ngBootbox.alert('vous êtes maintenant déconnecté')
            .then(function() {
                $location.path('/registerLogin');
            });

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

