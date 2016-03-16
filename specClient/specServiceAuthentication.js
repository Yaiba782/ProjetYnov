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



        });

});

