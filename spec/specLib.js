/**
 * Created by alex on 12/03/16.
 */
describe('when check if user exist', function () {
    var func1;
    var func2;
    var func3;
    var func4;
    var mongoose;
    var User;
    var username = "alex";
    var password = "123456";
    var email = "exemple@ynov.com";
    var birthDate = '14/01/1993';
    var reqTest = {};
    reqTest.body = {
        username : username,
        password : password,
        email : email,
        birthDate : birthDate
    };
   var resTest = {};
    resTest.status = function (statusNumber) {
        console.log(statusNumber);
    };
    resTest.json = function (content) {
      console.log(content);
    };

    var sendJsonResponseTest = function (resTest, statusNumber, content) {
        resTest.status(statusNumber);
        resTest.json(content);
    };

    beforeAll(function (done) {
        require('../bin/www');
        func2 = require("../lib/func2PromiseIfUsernameExist");
        func1 = require("../lib/func1PromiseIfEmailExist");
        func3 = require('../lib/func3registerUser.js');
        func4 = require('../lib/func4register');
        mongoose = require('mongoose');
        User = mongoose.model('User');
        mongoose.connection.collections['Users'].drop( function(err) {
            var user = new User();
            user.username = username;
            user.email = email;
            user.birthDate = user.formattedDate(birthDate);
            user.setPassword(password);
            user.save(function (err, user) {

                done();
            });
        });
    });
    it('should give message the username exist', function (done) {

        //change email address for check only if username exist
         // reqTest.body.username = "rzfgerztfz";
        reqTest.body.email = "oklm@gmail.com";
        func4.registerFinal(reqTest, resTest, User, done);

    });
    it('should give message email exist', function (done) {
        //change email address for check only if username exist
        reqTest.body.email = "exemple@ynov.com"; // email starting
        reqTest.body.username = "rzfgerztfz";
        func4.registerFinal(reqTest, resTest, User, done);
    });
    it('should give message username exist', function (done) {
        //username and email starting
        reqTest.body.email = "exemple@ynov.com";
        reqTest.body.username = "alex";
        func4.registerFinal(reqTest, resTest, User, done);
    });
});