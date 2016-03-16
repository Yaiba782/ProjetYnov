/**
 * Created by alex on 15/03/16.
 */

describe('authentication', function () {
    var username = "alexgfbd", password = "12345666668", email = "alexandze@gmail.com",
        birthDate = '14/01/1993', firstName = "alex", lastName = "family";
    var user = {
        username: username,
        password: password,
        email: email,
        birthDate: birthDate,
        firstName: firstName,
        lastName: lastName
    };
    var authentication, httpBackend;
    beforeEach(function () {
        module('pointService');
        inject(function (_authentication_) {
            authentication = _authentication_;

        });
    });
    describe('when I register', function () {
        it('should return token', function (done) {
            var promiseRegister = authentication.register();
            console.log(promiseRegister);
            promiseRegister.success(function (data) {
                console.log(data);
                done();
            });
            promiseRegister.error(function (e) {
                console.log(e);
                done();
            })

            });


        });

});
    /*describe('when I get token', function () {
       it('should return the token value', function () {
           var token = authentication.getToken();
           console.log(token);
       });
        it('should not return token because token value is empty', function () {
           authentication.saveToken("");
            var token = authentication.getToken();
            console.log(token);
        });
    });*/

