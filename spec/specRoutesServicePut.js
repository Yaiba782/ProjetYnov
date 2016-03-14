/**
 * Created by alex on 14/03/16.
 */

describe('service put', function () {
    var mongoose, app, request, User, firstName = 'alexandre', lastName = 'famille', username = "alex",
        password = "123456", email = "exemple@ynov.com",birthDate = '14/01/1993', idUser, token1, token2, service1,
        idService2;
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
                                    service.titre = "service2";
                                    request(app)
                                        .post('/api/services')
                                        .headers({"Authorization": 'Bearer ' + token2.token})
                                        .form(service)
                                        .expect(200)
                                        .end(function (err, res, body) {
                                            body = JSON.parse(body);
                                            idService2 = body.serviceIdAdded;
                                            done();
                                        });

                                });
                        });
                });
        });
    });
    describe("when I update service", function () {
        it('should update', function (done) {
            service.titre = "modifier service de user23";
            request(app)
                .put('/api/services/' + idService2)
                .headers({"Authorization": 'Bearer ' + token2.token})
                .form(service)
                .expect(200)
                .end(function (err, res, body) {
                    body = JSON.parse(body);
                    expect(body.message).toEqual("votre service a été modifié avec succces");
                    done();
                });
        });
        it("should not update because the user not have this service", function (done) {
            service.titre = "modifier service de user23";
            request(app)
                .put('/api/services/' + idService2)
                .headers({"Authorization": 'Bearer ' + token1.token})
                .form(service)
                .expect(404)
                .end(function (err, res, body) {
                    body = JSON.parse(body);
                    expect(body.message).toEqual('erreur de modification de service');
                    done();
                });
        });
    });
});