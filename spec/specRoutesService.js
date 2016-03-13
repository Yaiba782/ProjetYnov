/**
 * Created by alex on 12/03/16.
 */
describe('service route', function () {
    var mongoose;
    var app;
    var request;
    var User;
    var firstName = 'alexandre';
    var lastName = 'famille';
    var username = "alex";
    var password = "123456";
    var email = "exemple@ynov.com";
    var birthDate = '14/01/1993';
    var idUser;
    var token1;
    var token2;
    var service = {
        titre : "monTitre",
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
        mongoose.connection.collections['Users'].drop( function(err) {
            request(app)
                ////register1
                .post('/api/register')
                .form({username : username, password : password, email : email, birthDate : birthDate})
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
                                done();
                        });

                });

        });
    });
    describe('when I send post request for add service', function () {
        it('should response status 200', function (done) {
            service.titre = "service1Bis";
            request(app)
                    .post('/api/services')
                    .headers({"Authorization": 'Bearer ' + token1.token})
                    .form(service)
                    .expect(200)
                    .end(function (err, res, body) {
                       body = JSON.parse(body);
                        expect(body.message).toEqual('le service a était ajouter correcte');
                        done();
                    });
        });
        it('should response status response 401 because I give false password', function (done) {
            //I change token value
            token1.token += "a";
            request(app)
                .post('/api/services')
                .headers({"Authorization": 'Bearer ' + token1.token})
                .form(service)
                .expect(401)
                .end(function (err, res, body) {
                    body = JSON.parse(body);
                    expect(body.message).toEqual('UnauthorizedError: invalid signature');
                    done();
                });
        });

    });
    describe('when I get service', function () {
        beforeAll(function (done) {
            ///service2
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
        it('should get service sorted by date', function (done) {
                request(app)
                    .get('/api/services')
                    .expect(200)
                    .end(function(err, res, body){
                        body = JSON.parse(body);
                        // console.log(JSON.stringify(body, null, 2));
                        expect(body.length).toEqual(2);
                        done();
                    });
            });
    });
});






























