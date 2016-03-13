/**
 * Created by alex on 13/03/16.
 */
describe('service get', function () {
    var _ = require('lodash');
    var mongoose, app, request, User, firstName = 'alexandre', lastName = 'famille', username = "alex",
        password = "123456", email = "exemple@ynov.com",birthDate = '14/01/1993', idUser, token1, token2, idService1,
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

                                            done();
                                        });

                                });
                        });
                });
        });
    });
    describe('when I get service', function () {
        it('should get all services', function (done) {
            request(app)
                .get('/api/services')
                .expect(200)
                .end(function(err, res, body){
                    body = JSON.parse(body);
                    idService1 = body[0]._id;
                    idService2 = body[1]._id;
                    // console.log(JSON.stringify(body, null, 2));
                    expect(body.length).toEqual(2);
                    expect(body[0].titre).toEqual("service1");
                    expect(body[1].titre).toEqual("service2");
                    done();
                });
        });
        it('should get one service', function (done) {
            request(app)
               .get('/api/services/' + idService1)
               .end(function(err, res, body){
                   body = JSON.parse(body);
                   expect(body._id).toEqual(idService1);
                   done();
               });
        });
    });
});