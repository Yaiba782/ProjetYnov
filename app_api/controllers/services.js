/**
 * Created by alex on 12/03/16.
 */

var getAuthor = require("../../lib/func6getAuthor");
var sendJsonResponse = require("../../lib/func5SendJsonResponse");
var User = require('mongoose').model('User');
var formattedJsonService = require("../../lib/func7FormattedJsonService");
var matchServiceById = require("../../lib/func8matchServiceById");

module.exports.addService = function(req, res){
    getAuthor(req, res, function (req, res, username) {
        if(!req.body.titre || !req.body.category || !req.body.subCategory || !req.body.shortDescription ||
            !req.body.detailedDescription || !req.body.addressRequest || !req.body.phoneNumber ||
            !req.body.pointNumber){
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
                user.services.push(req.body);
                user.save(function (err) {
                    if(err){
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    if(user){
                        sendJsonResponse(res, 200, {
                            "message" : "le service a était ajouter correcte"
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
                        "message" : "service pas trouvé1"
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