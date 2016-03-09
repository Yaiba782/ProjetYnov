/**
 * Created by alex on 09/03/16.
 */

 describe('test mongoose', function () {
     var mongoose;
     var User;
     var PhoneNumber;
     var BigNumber;
     beforeAll(function (done) {
         require('../bin/www');
         mongoose = require('mongoose');
         User = mongoose.model('User');
         PhoneNumber = mongoose.model('PhoneNumber');
         mongoose.connection.collections['Users'].drop( function(err) {
             done();
         });
          BigNumber = require('bignumber.js');
     });
     describe('when I save user', function () {

         beforeEach(function () {

         });
         it('should save users correct', function (done) {
             var username = "alex";
             var password = "123456";
             var email = "exemple@ynov.com";

             var user = new User({
                 username : username,
                 password : password,
                 email : email
             });
             user.save(function (err, user) {
                 expect([user.username, user.email]).toEqual([username, email]);

                 done();
             });
         });
         it('should give error because password < 6', function (done) {
             var username = "alex1";
             var password = "123";
             var email = "exemple@ynovv.com";
             var user = new User({
                 username : username,
                 password : password,
                 email : email
             });
             user.save(function (err, user) {
                 expect(err.errors.password.message).toEqual('Le mot de passe doit contenir minimum 6 caractère');
                 expect(user).toBeUndefined();
                 done();
             });
         });
         it('should give error because I forget username', function (done) {
             var username = "";
             var password = "123456";
             var email = "exemple@ynovvv.com";

             var user = new User({
                 username : username,
                 password : password,
                 email : email
             });
             user.save(function (err, user) {
                 expect(err.errors.username.message).toEqual("Veuillez indiquez un nom d'utilisateur OBLIGATOIRE");
                 expect(user).toBeUndefined();
                 done();
             });
         });
         it('should give error because I give invalid ', function (done) {
             var username = "alex";
             var password = "123456";
             var email = "alex";
             var user = new User({
                 username : username,
                 password : password,
                 email : email
             });
             user.save(function (err, user) {
                 expect(err.errors.email.message).toEqual("Veuillez saisir une adresse email valide");
                 expect(user).toBeUndefined();
                 done();
             });
         });
         it('should give error because I give invalid mobil phone number ', function (done) {
             mongoose.connection.collections['Users'].drop();
             var username = "alexxx";
             var password = "123456xx";
             var email = "alex@alexa.com";
             var phoneNumber = new PhoneNumber({
                 fixNumber : "0151618960",
                 mobilNumber : "0451618960"
             });
             var user = new User({
                 username : username,
                 password : password,
                 email : email,
                 phoneNumber : phoneNumber
             });
             user.save(function (err, user) {
                 expect(err.errors["phoneNumber.0.mobilNumber"].properties.message)
                     .toEqual("Veuillez saisir un numero de téléphone mobile valide");
                 done();
             });

         });
         it('should give error because I give invalid fix phone number ', function (done) {
             mongoose.connection.collections['Users'].drop();
             var username = "alexxx";
             var password = "123456xx";
             var email = "alex@alexa.com";
             var phoneNumber = new PhoneNumber({
                 fixNumber : "0751618960",
                 mobilNumber : "0651618960"
             });
             var user = new User({
                 username : username,
                 password : password,
                 email : email,
                 phoneNumber : phoneNumber
             });
             user.save(function (err) {

                 expect(err.errors["phoneNumber.0.fixNumber"].properties.message)
                     .toEqual("veuillez saisir un numero de téléphone fixe valide");

                 done();
             });

         });
         it('should save user with name birthDate ', function (done) {
             mongoose.connection.collections['Users'].drop();
             var username = "alexxx";
             var password = "123456xx2";
             var email = "alex@alexa.com";
             var birthDate = new Date(1993, 0, 14);
             birthDate = birthDate.getTime();
             var user = new User({
                 username : username,
                 password : password,
                 email : email,
                 birthDate : birthDate
             });
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
             mongoose.connection.collections['Users'].drop();
             var username = "alexxx";
             var password = "123456xx";
             var email = "alex@alexa.com";
             var birthDate = new Date(2011, 0, 1);
             birthDate = birthDate.getTime();
             var user = new User({
                 username : username,
                 password : password,
                 email : email,
                 birthDate : birthDate
             });
             user.save(function (err) {
                 expect(err.errors.birthDate.properties.message).toBe("vous devez être majeur");
                 mongoose.connection.collections['Users'].drop();
                 done();
             });
         });
     });
 });
