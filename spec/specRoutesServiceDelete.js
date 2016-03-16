/**
 * Created by alex on 14/03/16.
 */
describe('service delete', function () {
    var mongoose, app, request, User, firstName = 'alexandre', lastName = 'famille', username = "alex",
        password = "123456", email = "exemple@ynov.com",birthDate = '14/01/1993', idUser, token1, token2, service1;
    var service = {
        titre : "service1",
        category : "ma categorie",
        subCategory : "sous categorie",
        shortDescription : "courte description",
        detailedDescription : "description detaille",
        addressRequest : "adresseville",
        phoneNumber : "0606060606",
        pointNumber : 10
    }, idService1;
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

                                            done();
                                        });

                                });
                        });
                });
        });
    });
    describe('when I delete service', function () {
        it('should delete service', function (done) {
            request(app)
                .del('/api/services/' + idService1)
                .headers({"Authorization": 'Bearer ' + token1.token})
                .end(function (err, res, body) {
                  //console.log(JSON.stringify(res, null, 4));
                    expect(res.statusCode).toEqual(204);
                    done();
                });

        });
        it('should not delete service', function (done) {
            request(app)
                .del('/api/services/' + idService1)
                .headers({"Authorization": 'Bearer ' + token2.token})
                .end(function (err, res, body) {
                    body = JSON.parse(body);
                    expect(body.message).toEqual("vous ne pouvez pas supprimer pas ce service");
                    done();
                });
        });
    });
});