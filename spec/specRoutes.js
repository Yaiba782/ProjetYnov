/**
 * Created by alex on 11/03/16.
 */
describe('test routes', function () {
    var mongoose;
    var app;
    var request;
    var User;
    beforeAll(function (done) {
       app = require('../bin/www');
        app = app.appReturn;
       request = require('super-request');
        mongoose = require('mongoose');
        User = mongoose.model('User');
        mongoose.connection.collections['Users'].drop( function(err) {
            done();
        });
    });
    describe('when I create user',function () {
        it('should register a user', function (done) {
            var username = "alexgfbd";
            var password = "12345666668";
            var email = "exemplssdqe@ynov.com";
            var birthDate = '14/01/1993';
           request(app)
                .post('/api/register')
                .form({username : username, password : password, email : email, birthDate : birthDate})
               .expect(200)
               .end(function (err, res, body) {
                   expect(body.message).toBeUndefined();
                    User.findOne({username : username}, 'username', function (err, user) {
                        expect(user.username).toEqual(username);
                        done();
                    });
               });
        });
    });
    describe('when I login user', function () {
       it('should login user', function (done) {
           var username = "alexgfbd";
           var password = "12345666668";
           request(app)
               .post('/api/login')
               .form({username : username, password: password})
               .expect(200)
               .end(function (err, res, body) {
                   body = JSON.parse(body);
                   expect(body.message).toBeUndefined();
                   expect(body.errors).toBeUndefined();
                   done();
               });
       });
        describe('when I login a user unknown', function () {
            it('should login user', function (done) {
                var username = "alexgf"; // unknown
                var password = "12345666668";
                request(app)
                    .post('/api/login')
                    .form({username : username, password: password})
                    .end(function (err, res, body) {
                        body = JSON.parse(body);
                        expect(body.message).toEqual("le nom d'utilisateur ou le mot de passe est incorrect");
                        done();
                    });
            });
        });


    });
    describe('when I create the same user',function () {
        it('should give error', function (done) {
            var username = "alexgfbd";
            var password = "12345666668";
            var email = "exemplssdqe@ynov.com";
            var birthDate = '14/01/1993';
            request(app)
                .post('/api/register')
                .form({username : username, password : password, email : email, birthDate : birthDate})
                .expect(200)
                .end(function (err, res, body) {
                    console.log(body);
                    done();
                });
        });
    });
});