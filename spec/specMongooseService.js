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
        pointNumber : 10,
        username : username
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
    describe('when I get services', function () {
        var originalTimeout;
        beforeAll(function (done) {
            var user = new User();
            user.username = "aledreazreazer";
            user.email = "alexandze@xsxdsq.com";
            user.lastName = lastName;
            user.firstName = firstName;
            user.birthDate = user.formattedDate(birthDate);
            user.setPassword(password);
            user.save(function (err, user) {
                service.titre = "username2";
                service.username = user.username;
                user.services.push(service);
                user.save(function (err, user) {

                });

            });

            User.findById(idUser, 'services', function (err, user) {
                if(user){
                    service.titre = "monTitre1";
                    service.dateService = new Date('2016-02-17T05:24:00');
                    user.services.push(service);
                    user.save(function (err, user) {
                        service.titre = "monTitre2";
                        service.dateService = new Date('2016-03-17T05:24:00');
                        user.services.push(service);
                        user.save(function (err, user) {
                            done();
                        });
                    });
                }
            });
        });
        it('should get all service', function (done) {
            var allService = [];
            var query = User.find({});
            query.select('services');
            query.exec(function (err, user) {
                // console.log(user[0].services[0]);
                for(var i = 0; i< user.length; i++){
                    for (var y = 0; y< user[i].services.length; y++){
                        allService.push(user[i].services[y]);
                    }
                }
                expect(allService.length).toEqual(4);
                done();
            });
        });
    });



});