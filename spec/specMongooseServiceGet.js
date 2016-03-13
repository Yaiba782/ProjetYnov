/**
 * Created by alex on 13/03/16.
 */
describe('mongoose service post', function () {
    var mongoose, User, firstName = 'alexandre', lastName = 'famille', username = "alex", password = "123456",
        email = "exemple@ynov.com", birthDate = '14/01/1993', idService1, idService2,
        service = {
            titre : "service1",
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
            user.services.push(service);
            user.save(function (err, user) {
                //console.log(JSON.stringify(user, null, 2));
                var user2 = new User();
                user2.username = "user2name";
                user2.email = "exemple2@ezfzef.com";
                user2.lastName = lastName;
                user2.firstName = firstName;
                user2.birthDate = user.formattedDate(birthDate);
                user2.setPassword(password);
                service.titre = "service2";
                user2.services.push(service);
                user2.save(function (err, user) {
                    //console.log(JSON.stringify(user, null, 2));
                    service.titre = "service1";
                   done();
                });
            });
        });
    });
    describe("when I get service", function () {
        it('should get all services', function (done) {
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
                idService1 = JSON.stringify(allService[0]._id);
                idService2 = JSON.stringify(allService[1]._id);
                //console.log(JSON.stringify(allService, null, 2));
                expect(allService.length).toEqual(2);
                expect(allService[0].titre).toEqual(service.titre);
                expect(allService[1].titre).toEqual("service2");
                done();
            });
        });
        it('should get one service', function (done) {
            var matchService;
            var allService = [];
           var query = User.find({});
            query.select('services');
            query.exec(function (err, user) {
                for(var i = 0; i< user.length; i++){
                    for (var y = 0; y< user[i].services.length; y++){
                        allService.push(user[i].services[y]);
                    }
                }
                //console.log(JSON.stringify(allService[0]._id, null, 2));

                if(allService.length > 0){
                    for (var z = 0; z < allService.length; z++){
                        if(JSON.stringify(allService[z]._id) === idService1){
                            matchService = allService[z];
                        }
                    }
                }
                //console.log(JSON.stringify(allService, null, 2));
                //console.log(JSON.stringify(idService1, null, 2));
               // console.log(JSON.stringify(matchService, null, 2));
                expect(idService1).toEqual(JSON.stringify(matchService._id));
                done();
            });
        });
    });

});