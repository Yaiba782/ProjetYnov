/**
 * Created by alex on 09/03/16.
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');
var PhoneNumber = mongoose.model('PhoneNumber');
var Address = mongoose.model('Address');

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.getAllUsers = function (req, res) {
   User.find({}, 'firstName lastName username birthDate registrationDate', function (err, user) {
       if(err){
           sendJsonResponse(res, 404, err);
           return;
       }
       if(user){
           sendJsonResponse(res, 200, user);
           return;
       }
   });
};
module.exports.getOneUserById = function (req, res) {
    if(!req.params.userid){
        sendJsonResponse(res, 404, {
            "message" : "parametre pas trouvé"
        });
        return;
    }
    User.findById(req.params.userid,'firstName lastName username birthDate registrationDate',
        function (err, user) {
        if(err){
            sendJsonResponse(res, 404, err);
            return;
        }
            sendJsonResponse(res, 200, user);
            return;
    });
};

module.exports.updateUser = function (req, res) {
    getAuthor(req, res, function (req, res, username) {
        if((!req.body.address || !req.body.zipCode || !req.body.city)
            (!req.body.fixNumber && !req.mobilNumber)){
            sendJsonResponse(res, 404, {
                "message" : "veuillez remplir tout les champs"
            });
        }
        trimValue(req);
        var phoneNumber = new PhoneNumber();
        if(req.body.fixNumber){
            phoneNumber.fixNumber = req.body.fixNumber;
        }else if(req.body.mobilNumber){
            phoneNumber.mobilNumber = req.body.mobilNumber;
        }else if(req.body.fixNumber)
        var address = new Address();
        address.address = req.body.address;
        address.city = req.body.city;
        address.zipCode = req.body.zipCode;

        User.findOne({username : username}, function (err, user) {
            if(err){
                sendJsonResponse(res, 404, err);
                return;
            }
            user.address = address;
            user.phoneNumber.push(phoneNumber);
            user.compete = true;
            user.save(function (err, user) {
                if(err){
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, user);
            });
        });
    });
};

module.exports.test = function (req, res) {

    if((!req.body.address || !req.body.zipCode || !req.body.city) || (!req.body.fixNumber && !req.mobilNumber)){
        sendJsonResponse(res, 404, {
            "message" : "veuillez remplir tout les champs"
        });
     return;
    }
    //trimValue(req);
    var phoneNumber = new PhoneNumber();
    if(req.body.fixNumber){
        phoneNumber.fixNumber = req.body.fixNumber;
    }else if(req.body.mobilNumber){
        phoneNumber.mobilNumber = req.body.mobilNumber;
    }else if(req.body.fixNumber)
        var address = new Address({
            address : req.body.address,
            zipCode : req.body.zipCode,
            city : req.body.city
        });


    User.findOne({username : req.body.username}, function (err, user) {
        if(err){
            sendJsonResponse(res, 404, err);
            return;
        }
        console.log('ok');
        user.address.push(address);
        user.phoneNumber.push(phoneNumber);
        user.complete = true;
        user.save(function (err, user) {
            if(err){
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, user);
            return;
        });
    });

};

var getAuthor = function(req ,res, callback){
    if(req.payload && req.payload.username){
        User.findOne({username : req.payload.username})
            .exec(function (err, user) {
                if(err){
                    console.log(err);
                    sendJsonResponse(res, 404, err);
                    return;
                }
                if(!user){
                   sendJsonResponse(res, 404, {
                       "message" : "l'utilisateur n'a pas etait trouvé"
                   });
                   return;
                }
                callback(req, res, user.username);
            });
    }
};