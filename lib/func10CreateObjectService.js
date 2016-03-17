/**
 * Created by alex on 16/03/16.
 */
module.exports = function (body, username, email) {
    var service = {
        titre : body.titre,
        category : body.category,
        subCategory : body.subCategory,
        shortDescription : body.shortDescription,
        detailedDescription : body.detailedDescription,
        addressRequest : [],
        phoneNumber : [],
        pointNumber : body.pointNumber,
        username : username,
        email : email
    };
    var addressSave = {
        address : body.address,
        zipCode : body.zipCode,
        city : body.city
    };
    var phoneNumber = null;

    if(body.fixNumber && !body.mobilNumber){
        phoneNumber =  {
            fixNumber : body.fixNumber
        };
    }
    if(!body.fixNumber && body.mobilNumber){
        phoneNumber =  {
            mobilNumber : body.mobilNumber
        };
    }
    if(body.fixNumber && body.mobilNumber){
        phoneNumber =  {
            mobilNumber : body.mobilNumber,
            fixNumber : body.fixNumber
        };
    }



    service.addressRequest.push(addressSave);
    if(phoneNumber !== null){
        service.phoneNumber.push(phoneNumber);
    }
    return service;
};