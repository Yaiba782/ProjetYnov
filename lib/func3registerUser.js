/**
 * Created by alex on 12/03/16.
 */
module.exports.registerUser = function (modelUser, req, res, sendJsonResponse, done) {
    var user = new modelUser();
    var dateFormat = user.formattedDate(req.body.birthDate);
    if(typeof dateFormat == 'string'){
        sendJsonResponse(res, 400, {
            "message" : "veuillez saisir une date correct"
        });

        return;
    }
    //code spaghetti to redo
    var phoneNumber = null;
    var addressSave = null;
    user.username = req.body.username;
    user.email = req.body.email;
    user.birthDate = user.formattedDate(req.body.birthDate);
    if(req.body.firstName && req.body.lastName){
        user.lastName = req.body.lastName;
        user.firstName = req.body.firstName;
        if(req.body.mobilNumber && req.body.fixNumber){
            phoneNumber = {
                fixNumber : req.body.fixNumber,
                mobilNumber : req.body.mobile
            };
        }else if(req.body.mobilNumber) {
            phoneNumber = {
                mobilNumber : req.body.mobilNumber
            };
        }else if(req.body.fixNumber){
            phoneNumber = {
                fixNumber : req.body.fixNumber
            };
        }
        if(req.body.address && req.body.zipCode && req.body.city){
            addressSave = {
                address : req.body.address,
                zipCode : req.body.zipCode,
                city : req.body.city
            };
        }
    }
    if(phoneNumber !== null){
        user.phoneNumber.push(phoneNumber);
    }
    if(addressSave !== null){
        user.address.push(addressSave);
    }


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
            done();
            return;
        }
    });

};