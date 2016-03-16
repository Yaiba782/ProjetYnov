/**
 * Created by alex on 12/03/16.
 */
module.exports.promiseIfEmailExist = function (modelUser, email) {
    var query = modelUser.findOne({email : email});
    return query.exec();
};
