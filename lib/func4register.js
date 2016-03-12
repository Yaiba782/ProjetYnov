/**
 * Created by alex on 12/03/16.
 */

/////////////////////////package func1 func2 func3//////////////////////////////////////////////////////////////////////
module.exports.registerFinal = function (reqTest, resTest, User, doneTest) {
////////////lib ////////////////////////////////////////////////////////////////////////////////////////////////////////

    function promiseIfEmailExist (modelUser, email) {
        var query = modelUser.findOne({email : email});
        return query.exec();
    }

    function promiseIfUsernameExist (modelUser, username)  {
        var query = modelUser.findOne({username : username});
        return query.exec();
    }

    function registerUser (modelUser, req, res, sendJsonResponse, doneTest) {
        var user = new modelUser();
        var dateFormat = user.formattedDate(req.body.birthDate);
        if(typeof dateFormat == 'string'){
            sendJsonResponse(res, 400, {
                "message" : "veuillez saisir une date correct"
            });

            return;
        }
        user.username = req.body.username;
        user.email = req.body.email;
        user.birthDate = user.formattedDate(req.body.birthDate);

        user.setPassword(req.body.password);

        user.save(function (err, user) {
            var token;
            if(err){
                sendJsonResponse(res, 404, err);
                return;
            }
            if(user){
                token = user.generateJwt();
                sendJsonResponse(res, 200, {
                    "token" : token
                });
                if(doneTest){
                    doneTest();
                }
                return;
            }
        });

    }
    function sendJsonResponseTest (resTest, statusNumber, content) {
            resTest.status(statusNumber);
            resTest.json(content);
            if(doneTest){
                resTest.test = content.message;
            }
        }

    /////////////////////////////////////////////////////////////end lib///////////////////////////////////////////////

    var promiseIfEmail = null;
    var promiseIfUsername = promiseIfUsernameExist(User, reqTest.body.username );
    promiseIfUsername.then(function (doc) {
        if(!doc){
            //if the username not exist
            promiseIfEmail = promiseIfEmailExist(User, reqTest.body.email);
            promiseIfEmail.then(function (doc) {
                if(doc){
                    //if email exist
                    sendJsonResponseTest(resTest, 404, {
                        "message" : "l'email existe déjà veuillez saisir un autre nom d'utilisateur"
                    });
                    if(doneTest){
                        expect(resTest.test).toEqual("l'email existe déjà veuillez saisir un autre nom d'utilisateur");
                        doneTest();
                    }

                    return;
                }
                if(!doc){

                    registerUser(User, reqTest, resTest, sendJsonResponseTest, doneTest);
                    return;
                }
            });
        }
        if(doc){
            //if username exist
            sendJsonResponseTest(resTest, 404, {
                "message" : "le username existe déjà veuillez saisir un autre username"
            });
            if(doneTest){

                expect(resTest.test).toEqual("le username existe déjà veuillez saisir un autre username");
                doneTest();
            }
            return;
        }
    });
};