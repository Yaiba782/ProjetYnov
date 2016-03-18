/**
 * Created by alex on 15/03/16.
 */
angular
    .module('pointService')
    .controller('ctrlRegisterLogin', ctrlRegisterLogin);
ctrlRegisterLogin.$inject = ['$location', 'authentication', 'services', '$ngBootbox'];

function ctrlRegisterLogin($location, authentication, services, $ngBootbox){
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

    vm.login = {
        username : "",
        password : ""
    };

    vm.checkPasswordRegister = "";
    vm.register = {
        username : "",
        lastName: "",
        firstName : "",
        email : "",
        password : "",
        mobilNumber : "",
        fixNumber : "",
        address : "",
        zipCode : "",
        city : "",
        birthDate : ""

    };
    vm.onSubmitLogin = function () {
        vm.formErrorLogin =  [];
        vm.doLogin = function () {
            vm.formErrorLogin = [];
            authentication
                .login(vm.login)
                .error(function (err) {
                    formattedError(err);
                    var stringError = formattedErrorArray();
                    $ngBootbox.alert(stringError);
                })
                .then(function () {
                    $ngBootbox.alert('connexion réussie')
                        .then(function() {
                            $location.path('/getAllServices');
                        });

                });

        };
        if(!vm.login.username|| !vm.login.password){
            vm.formError.push("Tout les champs sont obligatoire");
            var stringError = formattedErrorArray();
            $ngBootbox.alert(stringError);
            return false;
        }
        if(vm.login.email || vm.login.password){
            vm.doLogin();
        }
    };

    vm.onSubmitRegister = function () {
        vm.formError = [];

        vm.doRegister = function () {
            vm.formError = [];
            authentication
                .register(vm.register)
                .error(function (err) {
                    formattedError(err);
                    var stringError = formattedErrorArray();
                    $ngBootbox.alert(stringError);

                })
                .then(function () {
                    $ngBootbox.alert('inscription réussie, vous êtes connecté')
                        .then(function() {
                            $location.path('/getAllServices');
                            return;
                        });


                });

        };

        if(!vm.register.lastName || !vm.register.firstName || !vm.register.email || !vm.register.password
            || !vm.register.mobilNumber || !vm.register.fixNumber || !vm.register.address || !vm.register.zipCode
            || !vm.register.city || !vm.register.username || !vm.register.birthDate){
            vm.formError.push("Tout les champs sont obligatoire");
            var stringError = formattedErrorArray();
            $ngBootbox.alert(stringError);

            return false;

        }
        if(vm.checkPasswordRegister != vm.register.password){
            vm.formError.push("veuillez saisir le même mot de passe dans les 2 champs pour la vérification");
            stringError = formattedErrorArray();
            $ngBootbox.alert(stringError);
            return false;
        }
        vm.doRegister();
        return true;

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