/**
 * Created by alex on 12/03/16.
 */
describe('service', function () {
    var mongoose;
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
        addressRequest : ["adresse", "code", "ville"],
        phoneNumber : "0606060606",
        pointNumber : 10
    };
    beforeAll(function (done) {
        require('../bin/www');
        require('../bin/www');
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
    describe('when I create service' ,function () {
        it('should save the service in the document', function (done) {
            User.findById(idUser, 'services', function (err, user) {
                if(user){
                    user.services.push(service);
                }
                user.save(function (err, user) {
                   //console.log(JSON.stringify(user, null, 2));
                    User.findById(idUser, function (err, user) {
                        // console.log(JSON.stringify(user, null, 2));
                        expect(user.services[0].titre).toEqual("monTitre");
                        expect(user.services[0].category).toEqual("ma categorie");
                        done();
                    });
                });
            });
        });
        it('should give error because I forget a field', function (done) {
            service.titre = "";
            User.findById(idUser, 'services', function (err, user) {
                if(user){
                    user.services.push(service);
                }
                user.save(function (err, user) {
                   // console.log(JSON.stringify(err, null, 2));
                    expect(err.errors["services.1.titre"].message).toEqual("veuillez saisir un titre pour votre annonce");
                    done();
                });
            });
        });
    });
});