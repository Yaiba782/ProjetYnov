/**
 * Created by alex on 13/03/16.
 */

module.exports = function(req ,res, callback, sendJsonResponse, User){


    if(req.payload && req.payload.username){

        User.findOne({username : req.payload.username}, function (err, user) {
            if(err){
                sendJsonResponse(res, 404, err);
                return;
            }
            if(!user){
                sendJsonResponse(res, 404,{
                    "message" : "l'utilisateur n'a pas était trouvé"
                });
                return;
            }
            if(user){
                callback(req, res, user.username, user.email);
                return;
            }
        });
        return;
    }
};