/**
 * Created by alex on 09/03/16.
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};
module.exports.createUser = function (req, res) {
   /* var user = new User(req.body);
    user.save(function (err, user) {
        if(err){
            sendJsonResponse(res, 400, {errors : err.errors});
        }
        if(user){
            sendJsonResponse(res, 201, {"status" : "success"});
        }
    });
    */


};
module.exports.getAllUsers = function (req, res) {
    sendJsonResponse(res, 200, {"status" : "success"});
};