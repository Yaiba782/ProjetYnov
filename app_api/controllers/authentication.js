/**
 * Created by alex on 10/03/16.
 */
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};



module.exports.register = function (req, res) {
  if(!req.body.username || !req.body.email || !req.body.password || !req.body.birthDate){
      sendJsonResponse(res, 400, {
          "message" : "veuillez remplir tout les champs pour vous inscrire"
      });
      return;
  }


    var user = new User();
    var dateFormat = user.formattedDate(req.body.birthDate);
    if(typeof dateFormat == 'string'){
        sendJsonResponse(res, 400, {
            "message" : "veuillez saisir une date correct"
        });
        return;
    }


    


    user.username = req.body.username;
    user.email = req.body.email;
    user.birthDate = user.formattedDate(req.body.birthDate);

    user.setPassword(req.body.password);
    user.save(function (err, user) {
       var token;
        if(err){
            sendJsonResponse(res, 404, err);
            return;
        }
        if(user){
            token = user.generateJwt();
            sendJsonResponse(res, 200, {
                "token" : token
            });
            return;
        }
    });
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
                "toke" : token
            });
            return;
        }

    })(req, res);

};