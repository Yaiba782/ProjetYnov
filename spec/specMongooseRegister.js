/**
 * Created by alex on 09/03/16.
 */

 describe('test mongoose', function () {
     var mongoose;
     var User;

     var BigNumber;
     var Address;



     beforeAll(function (done) {
       require('../bin/www');
         mongoose = require('mongoose');
         User = mongoose.model('User');


         mongoose.connection.collections['Users'].drop( function(err) {
             done();
         });
          BigNumber = require('bignumber.js');
     });
    afterAll(function (done) {
         mongoose.connection.collections['Users'].drop(function (err) {
             done();
         });
     });
     describe('when I save user', function () {

         beforeEach(function (done) {
             mongoose.connection.collections['Users'].drop(function (err) {
                 done();
             });
         });
         it('should save users correct', function (done) {
             var username = "alex";
             var password = "123456";
             var email = "exemple@ynov.com";
             var birthDate = '14/01/1993';


             var user = new User();

             user.username = username;
             user.email = email;
             user.birthDate = user.formattedDate(birthDate);
             user.setPassword(password);
             user.save(function (err, user) {
                 expect([user.username, user.email]).toEqual([username, email]);

                 done();
             });
         });
         it('should give error because password < 6', function (done) {


             var username = "alex";
             var password = "1234";
             var email = "exemple@ynov.com";
             var birthDate = '14/01/1993';
             var user = new User();

             user.username = username;
             user.email = email;
             user.birthDate = user.formattedDate(birthDate);
             user.setPassword(password);
             user.save(function (err, user) {

                 expect(err.errors.salt.message).toEqual("veuillez indiquer un mot de passe valide");
                 expect(err.errors.hash.message).toEqual("veuillez indiquer un mot de passe valide");
                 expect(user).toBeUndefined();
                 done();
             });
         });
         it('should give error because I forget username', function (done) {

             var username = "";
             var password = "123456178";
             var email = "exemple@ynov.com";
             var birthDate = '14/01/1993';
             var user = new User();

             user.username = username;
             user.email = email;
             user.birthDate = user.formattedDate(birthDate);
             user.setPassword(password);
             user.save(function (err, user) {
                 expect(err.errors.username.message).toEqual("Veuillez indiquez un nom d'utilisateur OBLIGATOIRE");
                 expect(user).toBeUndefined();
                 done();
             });
         });
         it('should give error because I give invalid email', function (done) {

             var username = "alex";
             var password = "12345647";
             var email = "exemplecom";
             var birthDate = '14/01/1993';
             var user = new User();

             user.username = username;
             user.email = email;
             user.birthDate = user.formattedDate(birthDate);
             user.setPassword(password);
             user.save(function (err, user) {
                 expect(err.errors.email.message).toEqual("Veuillez saisir une adresse email valide");
                 expect(user).toBeUndefined();
                 done();
             });
         });
         it('should give error because I give invalid mobil phone number ', function (done) {

             var phoneNumber = {
                 fixNumber : "0151618960",
                 mobilNumber : "0451618960"
             };
             var username = "alex";
             var password = "12345647";
             var email = "exemple@ynov.com";
             var birthDate = '14/01/1993';
             var user = new User();

             user.username = username;
             user.email = email;
             user.birthDate = user.formattedDate(birthDate);
             user.phoneNumber = phoneNumber;
             user.setPassword(password);
             user.save(function (err, user) {
                 expect(err.errors["phoneNumber.0.mobilNumber"].properties.message)
                     .toEqual("Veuillez saisir un numero de téléphone mobile valide");
                 done();
             });
         });
         it('should give error because I give invalid fix phone number ', function (done) {

             var phoneNumber = {
                 fixNumber : "0751618960",
                 mobilNumber : "0651618960"
             };
             var username = "alex";
             var password = "1234567";
             var email = "exemple@ynov.com";
             var birthDate = '14/01/1993';
             var user = new User();

             user.username = username;
             user.email = email;
             user.birthDate = user.formattedDate(birthDate);
             user.phoneNumber = phoneNumber;
             user.setPassword(password);
             user.save(function (err) {
                 expect(err.errors["phoneNumber.0.fixNumber"].properties.message)
                     .toEqual("veuillez saisir un numero de téléphone fixe valide");
                 done();
             });
         });
         it('should save user with name birthDate ', function (done) {

             var username = "alex";
             var password = "1234567";
             var email = "exemple@ynov.com";
             var birthDate = '14/01/1993';
             var user = new User();

             user.username = username;
             user.email = email;
             user.birthDate = user.formattedDate(birthDate);
             user.setPassword(password);
             user.save(function (err, user) {

                 var birthDate = new BigNumber(user.birthDate);
                 var timestampOf18Years = new BigNumber(567990000000);
                 var dateNow = new BigNumber(Date.now());
                 var dateMajor = dateNow.minus(timestampOf18Years);
                 expect(dateMajor.greaterThan(birthDate)).toBeTruthy();
                 done();
             });

         });
         it('should give error because I give a minor birthDate ', function (done) {

             var username = "alex";
             var password = "1234";
             var email = "exemple@ynov.com";
             var birthDate = '14/01/2012';
             var user = new User();

             user.username = username;
             user.email = email;
             user.birthDate = user.formattedDate(birthDate);
             user.setPassword(password);
             user.save(function (err) {
                 expect(err.errors.birthDate.properties.message).toBe("vous devez être majeur");
                 done();
             });
         });
         it('should user with personal information, address and number', function (done) {
             var username = "alex";
             var password = "1234567";
             var email = "exemple@ynov.com";
             var birthDate = '14/01/1993';
             var address = '78 avenue crozatier';
             var zipCode = '75016';
             var city = 'paris';
             var phoneNumber = {
                 fixNumber : "0151618960",
                 mobilNumber : "0651618960"
             };
             var addressSave = {
                 address : address,
                 zipCode : zipCode,
                 city : city
             };

             var user = new User();

             user.username = username;
             user.email = email;
             user.birthDate = user.formattedDate(birthDate);
             user.phoneNumber.push(phoneNumber);
             user.address.push(addressSave);
             user.setPassword(password);
             user.save(function (err, user) {
                 expect(user).toBeTruthy();
                 //console.log(user);
                 done();
             });
         });
     });
 });


