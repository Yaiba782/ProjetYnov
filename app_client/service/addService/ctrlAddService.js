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
    vm.optionValue = {
        aideMenager :  [ 'Aide-ménagère', 'Repassage', 'Vaisselle', 'Nettoyage', 'Nettoyage', 'Cuissine', 'Autres'],
        jardinage : ['Jardinage', 'Pelouse', 'Entretien', 'Autres'],
        informatique : ['Informatique', 'Installation de matérie', 'Dépannage', 'Soutient informatique', 'Autres'],
        bienEtre : ['Bien-être','Coiffure', 'Manucure', 'Massage', 'Autres'],
        coursSoutienScolaire : ['Cours / Soutien scolaire', 'Sport', 'Cuisine', 'Décoration', 'Musique', 'Langues', 'Matières scientifiques', 'Autres'],
        bricolage : ['Bricolage', 'Peinture', 'Monter un meuble en kit', 'Réparations', 'Petits travaux', 'Autres'],
        demenagement : ['Déménagement','Aide au déménagement', 'Autres'],
        automobile : ['Automobile', 'Vidange', 'Nettoyage', 'Autres'],
        autres : ['Autres', 'Administratif', 'Autres'],
        administratif : ['Autres', 'Aide administrative', 'Autres']
    };
    vm.setSubCategory = function (currentCategory) {
        var subCategoryArray = currentCategory.split('"');

        for (var i = 0; i < subCategoryArray.length; i++){
            if(subCategoryArray[i] == "[" || subCategoryArray[i] == "," || subCategoryArray[i] == "]" ){
                subCategoryArray.splice(i, 1);
            }
        }
        vm.category = subCategoryArray.shift();


        vm.subCategoryArray = subCategoryArray;

        return true;
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