/**
 * Created by alex on 18/03/16.
 */
angular
    .module('pointService')
    .controller('ctrlMyProfile', ctrlMyProfile);

ctrlMyProfile.$inject = ['$location', 'services', 'authentication', '$ngBootbox', 'userService'];

function ctrlMyProfile($location, services, authentication, $ngBootbox, userService){
    var vm = this;
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.logout = function(){
        authentication.logout();
        $ngBootbox.alert('vous êtes maintenant déconnecté')
            .then(function() {
                $location.path('/registerLogin');
            });

    };
    vm.formError = [];
    vm.user = {};
    var currentUser = authentication.currentUser();
    if(currentUser){
        userService
            .reqGetOneUserById(currentUser._id)
            .error(function (err) {
                formattedError(err);
                var stringError = formattedErrorArray();
                $ngBootbox.alert(stringError);
            })
            .then(function () {
                vm.user = userService.getUser();

                console.log(vm.user);
            });
    }



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