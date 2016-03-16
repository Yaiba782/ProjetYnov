/**
 * Created by alex on 13/03/16.
 */
module.exports = function (user, allServicesTab) {
    for(var i = 0; i< user.length; i++){
        for (var y = 0; y < user[i].services.length; y++){
            allServicesTab.push(user[i].services[y]);
        }
    }
};