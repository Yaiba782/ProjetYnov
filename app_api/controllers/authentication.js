/**
 * Created by alex on 10/03/16.
 */
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var func4RegisterFinal = require('../../lib/func4register');

var sendJsonResponse = require("../../lib/func5SendJsonResponse");


module.exports.register = function (req, res) {
  if(!req.body.username || !req.body.email || !req.body.password || !req.body.birthDate){
      sendJsonResponse(res, 400, {
          "message" : "veuillez remplir tout les champs pour vous inscrire"
      });
      return;
  }
    func4RegisterFinal.registerFinal(req, res, User, false);
};

module.exports.login = function (req, res) {
    if(!req.body.username || !req.body.password){
        sendJsonResponse(res, 400, {
            "message" : "veuillez indiquer tout les champs necessaire"
        });
        return;
    }
    passport.authenticate('local', function (err, user, info) {
        var token;
        if(err){
            sendJsonResponse(res, 404, err);
            return;
        }
        if(!user){
            sendJsonResponse(res, 401, info);
            return;
        }
        if(user){
            token = user.generateJwt();
            sendJsonResponse(res, 200, {
                "token" : token
            });
            return;
        }
    })(req, res);
};