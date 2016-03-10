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
var formattedDate = function (dateString) {
    if(dateString.length == 0){
        return "veuillez saisir une date";
    }
    if(dateString.length !== 10){
        return "veuillez saisir un format de date correct";
    }

  var dateFormattedTab = dateString.split('/');

    if(dateFormattedTab.length == 3) {
        if (parseInt(dateFormattedTab[1]) < 13 && parseInt(dateFormattedTab[1]) > 0 &&
            parseInt(dateFormattedTab[0]) > 0 && dateFormattedTab[0] < 32){
            var day = parseInt(dateFormattedTab[0], 10);
            var month = parseInt(dateFormattedTab[1], 10) - 1;
            var year = parseInt(dateFormattedTab[2], 10);
            var birthDate = new Date(year, month, day);
            return birthDate.getTime();
        }else {
            return "veuillez saisir un format date correct";
        }
    }
};


module.exports.register = function (req, res) {
  if(!req.body.username || !req.body.email || !req.body.password || !req.body.birthDate){
      sendJsonResponse(res, 400, {
          "message" : "veuillez remplir tout les champs pour vous inscrire"
      });
      return;
  }
    var dateFormat = formattedDate(req.body.birthDate);
    if(typeof dateFormat == 'string'){
        sendJsonResponse(res, 400, {
            "message" : "veuillez saisir une date correct"
        });
        return;
    }

    var user = new User();


    user.username = req.body.username;
    user.email = req.body.email;
    user.birthDate = formattedDate(req.body.birthDate);

    user.setPassword(req.body.password);
    user.save(function (err, user) {
       var token;
        if(err){
            sendJsonResponse(res, 404, err);
        }
        if(user){
            token = user.generateJwt();
            sendJsonResponse(res, 200, {
                "token" : token
            });
        }
    });
};

module.exports.login = function (res, req) {
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
            return
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
        }

    })(req, res);

};