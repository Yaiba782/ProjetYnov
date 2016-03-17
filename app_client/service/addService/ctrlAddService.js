/**
 * Created by alex on 16/03/16.
 */
angular
    .module('pointService')
    .controller('ctrlAddService', ctrlAddService);

ctrlAddService.$inject = ['$location', 'services'];

function ctrlAddService($location, services){
    var vm = this;
    vm.currentCategory ="";
    vm.subCategoryArray = null;
    vm.formErrorAddService = "";
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
            vm.formErrorAddService ="";
                services
                    .addService(vm.addService)
                    .error(function (err) {
                        vm.formErrorAddService = err;
                    })
                    .then(function () {
                        $location.path('/');
                    });
        };
        vm.formErrorAddService ="";
        if(!vm.addService.titre || !vm.category || !vm.subCategory || !vm.addService.shortDescription
            || !vm.addService.detailedDescription || !vm.addService.address || !vm.addService.city
        || !vm.addService.zipCode || !vm.addService.mobilNumber || !vm.addService.pointNumber){
            vm.formErrorAddService = "veuillez saisir tout les champs";
            return false;
        }
        vm.addService.subCategory = vm.subCategory;
        vm.addService.category = vm.category;
        vm.doAddService();
        return true;
    }














}