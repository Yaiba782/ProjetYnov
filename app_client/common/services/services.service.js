/**
 * Created by alex on 16/03/16.
 */
angular
    .module('pointService')
    .service('services', services);
    services.$inject = ['$http', 'authentication'];

function services($http, authentication){
    var allServices = null;
    var serviceById = null;
    var allServiceByUsername;
    var optionValue = {
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
   var setSubCategory =  function (currentCategory, vm) {


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


    var reqGetAllServices = function () {
        return $http.get('/api/services').success(function (data) {
            saveAllServices(data);

        });
    };
    var saveAllServices = function (allServicesSave) {
        allServices = allServicesSave;
    };
    var getAllServices = function () {
      return allServices;
    };

    var addService = function (service) {
        return $http.post('/api/services', service, {
            headers : {
                Authorization : 'Bearer ' + authentication.getToken()
            }
        }).success(function (data) {
            return;
        });
    };

    var reqGetOneServiceById = function (serviceId) {
        return $http.get('/api/services/' + serviceId + '/getOneServiceById').success(function (data) {
            saveServiceById(data);
        });
    };
    var reqGetAllServiceByUsername = function (username) {
        return $http.get('/api/services/' + username + '/getAllServicesByUsername').success(function (data) {

            saveAllServiceByUsername(data);
        });
    };
    var reqUpdateServiceById = function (serviceId, service) {
        return $http.put('/api/services/' + serviceId, service, {
            headers : {
                Authorization : 'Bearer ' + authentication.getToken()
            }
        }).success(function (data) {
            console.log(data);
        });
    };
    var reqDeleteServiceById = function (serviceId) {
        return $http.delete('/api/services/' + serviceId, {
            headers : {
                Authorization : 'Bearer ' + authentication.getToken()
            }
        }).success(function(){
            return;
        });
    };
    var saveServiceById = function (saveServiceById) {
        serviceById = saveServiceById;
    };
    var getOneServiceById= function () {
        return serviceById;
    };
    var saveAllServiceByUsername = function (data) {
        allServiceByUsername = data;
    };
    var getAllServiceByUsername = function () {
        return allServiceByUsername;
    };

    var formattedError = function (vm) {
        return function (err) {
            console.log(JSON.stringify(err, null, 4));
            if(err.message !== "User validation failed" ){
                vm.formError.push(err.message);
                return;
            }
            if(err.message === "User validation failed"){
                var allErrors = err.errors;
                for(var prop in allErrors){
                    var currentError = allErrors[prop];
                    for (var propError in currentError){
                        if(propError == "message"){
                            vm.formError.push(currentError[propError]);
                        }
                    }
                }
                return;
            }
        };
    };
    var formattedErrorArray = function (vm) {
       return function () {
            var errorString = "";
            for (var i = 0; i < vm.formError.length; i++){
                errorString += vm.formError[i] + '<br>';
            }
           vm.formError = [];
            return errorString;
       }
    };



    return {
        addService : addService,
        getAllServices : getAllServices,
        getOneServiceById : getOneServiceById,
        getAllServiceByUsername : getAllServiceByUsername,
        reqUpdateServiceById: reqUpdateServiceById,
        reqDeleteServiceById  : reqDeleteServiceById,
        reqGetAllServices : reqGetAllServices,
        optionValue : optionValue,
        setSubCategory : setSubCategory,
        reqGetOneServiceById : reqGetOneServiceById,
        reqGetAllServiceByUsername : reqGetAllServiceByUsername,
        formattedError : formattedError,
        formattedErrorArray : formattedErrorArray
    }
}