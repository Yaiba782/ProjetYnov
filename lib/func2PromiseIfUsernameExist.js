/**
 * Created by alex on 12/03/16.
 */
module.exports.promiseIfUsernameExist = function (modelUser, username) {
  var query = modelUser.findOne({username : username});
   return query.exec();
};