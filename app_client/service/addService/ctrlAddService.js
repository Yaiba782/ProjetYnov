/**
 * Created by alex on 16/03/16.
 */
angular
    .module('pointService')
    .controller('ctrlAddService', ctrlAddService);

ctrlAddService.$inject = ['$location', 'services', 'authentication', '$ngBootbox'];

function ctrlAddService($location, services, authentication, $ngBootbox){

    var vm = this;




    vm.isLoggedIn = authentication.isLoggedIn();
    vm.textIfNotLogged = "Veuillez vous connecter pour publier un service";
    vm.titrePage = "Création service";
    vm.textButtonSubmit = "Publier";
    vm.currentCategory ="";
    vm.subCategoryArray = null;
    vm.formError = [];
    vm.category = "";
    vm.currentSubCategory = "";
    vm.subCategory = "";

    vm.addService = {
        titre : "",
        category : "",
        subCategory : "",
        shortDescription : "",
        detailedDescription : "",
        address : "",
        city : "",
        zipCode : "",
        mobilNumber : "",

        pointNumber : 0
    };
    vm.optionValue = services.optionValue;
    vm.setSubCategory = function (currentCategory) {
        services.setSubCategory(currentCategory, vm);
    };
    vm.getCurrentSubCategory = function (currentSubCategory) {
        if(currentSubCategory.length){
            vm.subCategory = currentSubCategory;
           return true;
        }
        return false;
    };

    vm.onSubmitAddService = function () {
        vm.doAddService = function () {
            vm.formError =[];
            services
                .addService(vm.addService)
                .error(function (err) {
                    formattedError(err);
                    var stringError = formattedErrorArray();
                    $ngBootbox.alert(stringError);
                })
                .then(function () {
                        $ngBootbox.alert('Votre service à bien été crée')
                            .then(function() {
                                $location.path('/getAllServices');
                            });
                });
        };
        vm.formError =[];
        if(!vm.addService.titre || !vm.category || !vm.subCategory || !vm.addService.shortDescription
            || !vm.addService.detailedDescription || !vm.addService.address || !vm.addService.city
        || !vm.addService.zipCode || !vm.addService.mobilNumber || !vm.addService.pointNumber){
            vm.formError.push("veuillez saisir tout les champs");
            var stringError = formattedErrorArray();
            $ngBootbox.alert(stringError);
            return false;
        }
        vm.addService.subCategory = vm.subCategory;
        vm.addService.category = vm.category;
        vm.doAddService();
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