/**
 * Created by alex on 14/03/16.
 */
module.exports = function (allServiceUserTab, serviceId) {
    for (var i = 0; i< allServiceUserTab.length; i++){
        if(JSON.stringify(allServiceUserTab[i]._id) === JSON.stringify(serviceId)){
            return i;
        }
    }
    return null;
};