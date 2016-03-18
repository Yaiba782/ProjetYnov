/**
 * Created by alex on 17/03/16.
 */
angular
    .module('pointService')
    .controller('ctrlUpdateServiceById', ctrlUpdateServiceById);
ctrlUpdateServiceById.$inject = ['$location', 'services', 'authentication', '$ngBootbox'];

function ctrlUpdateServiceById($location, services, authentication,  $ngBootbox){
    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();
    vm.logout = function(){
        authentication.logout();
        $ngBootbox.alert('vous êtes maintenant déconnecté')
            .then(function() {
                $location.path('/registerLogin');
            });

    };
    vm.textIfNotLogged = "Veuillez vous connecter pour modifier vos annonces";
    vm.titrePage = "modifier mon service";
    vm.textButtonSubmit = "mdofier";


    vm.currentCategory ="";
    vm.subCategoryArray = null;
    vm.formError = [];
    vm.category = "";
    vm.currentSubCategory = "";
    vm.subCategory = "";

    //object field for form
    vm.addService = {
        _id : "",
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

    //id service in the uri
    var serviceId = $location.search();

    var currentUser = authentication.currentUser();

    vm.isMyService = false;

    vm.errorGetOneServiceById ="";
    vm.serviceById = "";

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
                if(vm.isMyService){
                    setFormUpdateServiceById(vm.serviceById);
                }
                if(!vm.isMyService){
                    $ngBootbox.alert('vous ne pouvez pas modifier ce service');
                }
            });
    }

    var setFormUpdateServiceById = function (myService) {
        for (var propService in myService){
            for( var propFormService in vm.addService){
                if(propService == propFormService){
                    vm.addService[propFormService] = myService[propService];
                }
            }
        }
        //get phone number and address
        vm.addService.address = myService.addressRequest[0].address;
        vm.addService.city = myService.addressRequest[0].city;
        vm.addService.zipCode = myService.addressRequest[0].zipCode;
        vm.addService.mobilNumber = myService.phoneNumber[0].mobilNumber;

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
    //updateServiceById
    vm.onSubmitAddService = function () {
        vm.doUpdateService = function () {
            vm.formError= [];
            services
                .reqUpdateServiceById(vm.addService._id, vm.addService)
                .error(function (err) {
                    formattedError(err);
                    var stringError = formattedErrorArray();
                    $ngBootbox.alert(stringError);
                })
                .then(function () {
                    $ngBootbox.alert('votre service a été modifié correctement')
                        .then(function () {
                            $location.path('/getAllServices');
                            return true;
                        });
                });
        };
        vm.formError= [];
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
        vm.doUpdateService();
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
