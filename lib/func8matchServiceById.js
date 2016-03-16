/**
 * Created by alex on 13/03/16.
 */
module.exports = function (allServiceTab, serviceId) {

    for (var i = 0; i < allServiceTab.length; i++) {
        if (allServiceTab[i]._id == serviceId) {
            return allServiceTab[i];
        }
    }

    return false;

};