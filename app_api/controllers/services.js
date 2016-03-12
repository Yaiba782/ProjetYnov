/**
 * Created by alex on 12/03/16.
 */
var User = require('mongoose').model('User');
var sendJsonResponse = require("../../lib/func5SendJsonResponse");

module.exports.addService = function (req, res) {

    if(!req.body.titre || !req.body.category || !req.body.subCategory || !req.body.shortDescription ||
    !req.body.detailedDescription || !req.body.addressRequest || !req.body.phoneNumber || !req.body.pointNumber
    || !req.body.username){
        sendJsonResponse(res, 404, {
            "message" : "veuillez entrer les champs necessaire pour creer votre service"
        });
        return;
    }

    User.findOne({username : req.body.username}, 'services', function (err, user) {

       if(err){
           sendJsonResponse(res, 404, err);
           return;
       }
        if(user){
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
};





