/**
 * Created by alex on 12/03/16.
 */

var getAuthor = require("../../lib/func6getAuthor");
var sendJsonResponse = require("../../lib/func5SendJsonResponse");
var User = require('mongoose').model('User');
var formattedJsonService = require("../../lib/func7FormattedJsonService");
var matchServiceById = require("../../lib/func8matchServiceById");
var findIndexService = require("../../lib/func9FindIndexService");
var createObjectService = require("../../lib/func10CreateObjectService");

module.exports.addService = function(req, res){
    getAuthor(req, res, function (req, res, username) {
        if(!req.body.titre || !req.body.category || !req.body.subCategory || !req.body.shortDescription
            || !req.body.detailedDescription || !req.body.address || !req.body.city || !req.body.zipCode
            || !req.body.pointNumber){
            sendJsonResponse(res, 404, {
                "message" : "veuillez entrer les champs necessaire pour creer votre service"
            });
            return;
        }
        User.findOne({username : username}, 'services', function (err, user) {
            if(err){
                sendJsonResponse(res, 404, err);
                return;
            }
            if(user){
                req.body.username = username;
                var service = createObjectService(req.body);
                user.services.push(service);
                user.save(function (err) {
                    if(err){
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    if(user){
                        var lenghth = user.services.length;

                        sendJsonResponse(res, 200, {
                            "message" : "le service a était ajouter correcte",
                            "serviceIdAdded" : user.services[lenghth - 1]._id
                        });
                        return;
                    }
                });
            }
            return;
        });
    }, sendJsonResponse, User);
};

module.exports.getAllServices = function (req, res) {
    var allServicesTab = [];
    var query = User.find({});
    query.select('services');
    query.exec(function (err, user) {
       if(err){
           sendJsonResponse(res, 404, err);
           return;
       }
        if(!user){
            sendJsonResponse(res, 404, {
                "message" : "il y a aucun service dans la base"
            });
        }
        if(user){
            formattedJsonService(user, allServicesTab);
            if(allServicesTab.length > 0) {
                sendJsonResponse(res, 200, allServicesTab);
                return;
            }
            if(allServicesTab.length === 0){
                sendJsonResponse(res, 404, {
                    "message" : "il y a aucun service dans la base"
                });
            }
        }
    });
};

module.exports.getOneServiceById = function (req, res) {
    if(!req.params.serviceId){
        sendJsonResponse(res, 404, {
            "message" : "service pas trouvé"
        });
    }
    var matchService;
    var allServicesTab = [];
    var query = User.find({});
    query.select('services');
    query.exec(function (err, user) {
       if(err){
           sendJsonResponse(res, 404, err);
           return;
       }
        if(!user){
            sendJsonResponse(res, 404, {
                "message" : "aucun service dans la base"
            });
            return;
        }
        if(user){
            formattedJsonService(user, allServicesTab);
            if(allServicesTab.length > 0){
                matchService = matchServiceById(allServicesTab, req.params.serviceId);
                if(!matchService){
                    sendJsonResponse(res, 404, {
                        "message" : "service pas trouvé"
                    });
                    return;
                }
                if(matchService){
                    sendJsonResponse(res, 200, matchService);
                    return;
                }
            }
        }
        return;
    });
    return;
};

module.exports.getAllServicesByUsername = function (req, res) {
    if(!req.params.username){
        sendJsonResponse(res, 404,{
            "message" : "aucun service trouvé"
        });
        return;
    }
    User.findOne({username : req.params.username}, 'services', function (err, user) {
       if(err){
           sendJsonResponse(res, 404, err);
           return;
       }
        if(!user){
            sendJsonResponse(res, 404, {
                "message" : "l'utilisateur n'existe pas"
            });
            return;
        }
        if(user.services.length == 0){
            sendJsonResponse(res, 200, {
                "message" : "vous n'avez aucun service"
            });
            return;
        }
        sendJsonResponse(res, 200, user.services);
        return;
    });
    return;

};
module.exports.updateServiceById = function (req, res) {
    getAuthor(req, res, function (req, res, username) {
        if(!req.params.serviceId || !username){
            sendJsonResponse(res, 404, {
                "message" : "service pas trouvé"
            });
        }
        if(!req.body.titre || !req.body.category || !req.body.subCategory || !req.body.shortDescription
            || !req.body.detailedDescription || !req.body.address || !req.body.city || !req.body.zipCode
            || !req.body.pointNumber){
            sendJsonResponse(res, 404, {
                "message" : "veuillez entrer les champs necessaire pour creer votre service"
            });
            return;
        }
        User.findOne({username : username}, 'services', function (err, user) {
            if(err){
                sendJsonResponse(res, 404, err);
                return;
            }
            if(!user){
                sendJsonResponse(res, 404, {
                    "message" : "utilisateur pas trouvé"
                });
                return;
            }
            if(user){
                var indexService = null;
                indexService = findIndexService(user.services, req.params.serviceId);
                if(indexService === null){
                    sendJsonResponse(res, 404, {
                        "message" : "erreur de modification de service"
                    });
                    return;
                }
                if(indexService !== null){
                    var elementRemoved = user.services.splice(indexService, 1);
                    var service = createObjectService(req.body);

                    user.services.push(service);
                    user.save(function (err, user) {
                       if(err){
                           sendJsonResponse(res, 404, err);
                           return;
                       }
                        if(!user){
                            sendJsonResponse(res, 404, {
                                "message" : "erreur de modification"
                            });
                            return;
                        }
                        if(user){
                            sendJsonResponse(res, 200, {
                                "message" : "votre service a été modifié avec succces"
                            });
                            // console.log(user);

                            return;
                        }
                    });
                }
            }
        });
    }, sendJsonResponse, User);
};
module.exports.deleteServiceById = function (req, res) {
    getAuthor(req, res, function (req, res, username) {
        if(!req.params.serviceId){
            sendJsonResponse(res, 404, {
                "message" : "il manque le paramètre"
            });
            return;
        }
        if(!username){
            sendJsonResponse(res, status, {
                "message" : "pas d'utilisateur touvé"
            });
            return;
        }
        User.findOne({username : username}, 'services', function (err, user) {
            if(err){
                sendJsonResponse(res, 404, err);
                return;
            }
            if(!user){
                sendJsonResponse(res, 404, {
                    "message" : "pas d'utilisateur trouvé"
                });
                return;
            }
            if(user.services.length == 0){
                sendJsonResponse(res, 404, {
                    "message" : "vous ne possedez pas de service"
                });
                return;
            }
            var index;
            index = findIndexService(user.services, req.params.serviceId);
            if(index === null){
                sendJsonResponse(res, 404, {
                    "message" : "vous ne pouvez pas supprimer pas ce service"
                });
                return;
            }
            user.services.splice(index, 1);
            user.save(function (err, user) {
                if(err){
                    sendJsonResponse(res, 404, err);
                    return;
                }
                if(!user){
                    sendJsonResponse(res, 404, {
                        "message" : "utilisateur pas trouvé"
                    });
                    return;
                }
                sendJsonResponse(res, 204, {
                   "message" : "votre service à bien était suprimé"
                });
                return;
            });
            return;

        });
        return;


    }, sendJsonResponse, User);
};