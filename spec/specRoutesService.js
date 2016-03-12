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
    var service = {
        titre : "monTitre",
        category : "ma categorie",
        subCategory : "sous categorie",
        shortDescription : "courte description",
        detailedDescription : "description detaille",
        addressRequest : "adresseville",
        phoneNumber : "0606060606",
        pointNumber : 10,
        username : username

    };
    beforeAll(function (done) {
        app = require('../bin/www');
        app = app.appReturn;
        request = require('super-request');
        mongoose = require('mongoose');
        User = mongoose.model('User');
        mongoose.connection.collections['Users'].drop( function(err) {
            var user = new User();
            user.username = username;
            user.email = email;
            user.lastName = lastName;
            user.firstName = firstName;
            user.birthDate = user.formattedDate(birthDate);
            user.setPassword(password);
            user.save(function (err, user) {
                idUser = user._id;

                done();
            });

        });
    });
    describe('when I send post request for add service', function () {
        it('should response status', function (done) {


                request(app)
                    .post('/api/services')
                    .form(service)
                    .end(function (err, res, body) {
                       body = JSON.parse(body);
                        expect(body.message).toEqual("le service a était ajouter correcte");
                        done();
                    });
        });
    });
});