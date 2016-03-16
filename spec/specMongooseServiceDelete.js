/**
 * Created by alex on 14/03/16.
 */
describe('mongoose service delete', function () {
    var findIndexService = require('../lib/func9FindIndexService');
    var mongoose, app, request, User, firstName = 'alexandre', lastName = 'famille', username = "alex",
        password = "123456", email = "exemple@ynov.com",birthDate = '14/01/1993', idUser, token1, token2, service1,
        idService1;
    var service = {
        titre : "service1",
        category : "ma categorie",
        subCategory : "sous categorie",
        shortDescription : "courte description",
        detailedDescription : "description detaille",
        addressRequest : "adresseville",
        phoneNumber : "0606060606",
        pointNumber : 10
    };
    beforeAll(function (done) {
        app = require('../bin/www');
        app = app.appReturn;
        request = require('super-request');
        mongoose = require('mongoose');
        User = mongoose.model('User');
        /////create 2 users///////////////////////////////////////////////////////////
        mongoose.connection.collections['Users'].drop( function(err) {
            request(app)
            ////register1
                .post('/api/register')
                .form({username : username, password : password, email : email, birthDate : birthDate,
                    firstName : firstName, lastName : lastName})
                .expect(200)
                .end(function (err, res, body) {
                    token1 = JSON.parse(body);
                    request(app)
                    ///////register2
                        .post('/api/register')
                        .form({username : "user23", password : password, email : "user23@gmail.com", birthDate : birthDate})
                        .expect(200)
                        .end(function (err, res, body) {
                            token2 = JSON.parse(body);
                            //create service
                            request(app)
                                .post('/api/services')
                                .headers({"Authorization": 'Bearer ' + token1.token})
                                .form(service)
                                .expect(200)
                                .end(function (err, res, body) {
                                    body = JSON.parse(body);
                                    idService1 = body.serviceIdAdded;
                                    service.titre = "service2";
                                    request(app)
                                        .post('/api/services')
                                        .headers({"Authorization": 'Bearer ' + token2.token})
                                        .form(service)
                                        .expect(200)
                                        .end(function (err, res, body) {
                                            body = JSON.parse(body);

                                            done();
                                        });

                                });
                        });
                });
        });
    });
    describe('when I delete service', function () {
       it('should delete service', function (done) {
           User.findOne({username : username}, 'services', function (err, user) {
               var index = findIndexService(user.services, idService1);
               if(index !== null){
                   var elementDeleted = user.services.splice(index, 1);
                   user.save(function (err, user) {
                       User.findOne({username : username}, function (err, user) {
                           expect(user.services.length).toEqual(0);
                           done();
                       });
                   });
               }
           });
       });
    });
});