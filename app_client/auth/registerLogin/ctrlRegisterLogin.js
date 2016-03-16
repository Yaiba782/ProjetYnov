/**
 * Created by alex on 15/03/16.
 */
angular
    .module('pointService')
    .controller('ctrlRegisterLogin', ctrlRegisterLogin);
ctrlRegisterLogin.$inject = ['$location', 'authentication'];

function ctrlRegisterLogin($location, authentication){
    var vm = this;

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
        vm.formErrorLogin = "";
        vm.doLogin = function () {
            vm.formErrorLogin = "";
            authentication
                .login(vm.login)
                .error(function (err) {
                    vm.formErrorLogin = err;
                })
                .then(function () {

                    $location.path('/');
                });

        };
        if(!vm.login.username|| !vm.login.password){
            vm.formErrorLogin = "Tout les champs sont obligatoire";
            return false;
        }
        if(vm.login.email || vm.login.password){
            vm.doLogin();
        }
    };

    vm.onSubmitRegister = function () {
        vm.formErrorRegister = "";

        vm.doRegister = function () {
            vm.formErrorRegister = "";
            authentication
                .register(vm.register)
                .error(function (err) {
                    vm.formErrorRegister =err;
                })
                .then(function () {

                    $location.path('/');
                });

        };

        if(!vm.register.lastName || !vm.register.firstName || !vm.register.email || !vm.register.password
            || !vm.register.mobilNumber || !vm.register.fixNumber || !vm.register.address || !vm.register.zipCode
            || !vm.register.city || !vm.register.username || !vm.register.birthDate){
            vm.formErrorRegister = "Tout les champs sont obligatoire";
            return false;

        }
        if(vm.checkPasswordRegister != vm.register.password){
            vm.formErrorRegister = "veuillez saisir le même mot de passe dans les 2 champs pour la vérification";
            return false;
        }else {
            vm.doRegister();
            return true;
        }
    }
}