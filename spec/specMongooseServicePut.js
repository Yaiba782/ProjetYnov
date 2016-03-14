/**
 * Created by alex on 14/03/16.
 */
describe('mongoose service put', function () {
    var mongoose, User, firstName = 'alexandre', lastName = 'famille', username = "alex", password = "123456",
        email = "exemple@ynov.com", birthDate = '14/01/1993', idUser,
        service = {
            titre : "monTitre1",
            category : "ma categorie",
            subCategory : "sous categorie",
            shortDescription : "courte description",
            detailedDescription : "description detaille",
            addressRequest : ["adresse", "code", "ville"],
            phoneNumber : "0606060606",
            pointNumber : 10,
            username : username
        }, idService1, idService2;
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
            service.titre = "monTitre2";
            user.services.push(service);
            user.save(function (err, user) {
                idService1 = JSON.stringify(user.services[0]._id);
                idService2 = JSON.stringify(user.services[1]._id);
                idUser = user._id;
                done();
            });
        });
    });
    describe('when I update service ', function () {
        it('should update service', function (done) {
            service.titre = "my new service";
            User.findOne({username : username }, function (err, user) {
                 // console.log(idService1);
                  var indexServiceRemove = null;
                  for (var i = 0; i< user.services.length; i++){
                      var tempId = JSON.stringify(user.services[i]._id);
                      if(tempId === idService1){
                          //console.log(user.services[i]);
                          indexServiceRemove = i;
                          break;
                      }
                  }
                  if(indexServiceRemove !== null){
                      var elementRemoved = user.services.splice(indexServiceRemove, 1);
                      //console.log(elementRemoved);
                      user.services.push(service);
                      user.save(function (err, user) {
                         // console.log(JSON.stringify(user, null, 2));
                          expect(user.services[1].titre).toEqual(service.titre);
                          done();
                      });
                  }



            });
        });
    });
});