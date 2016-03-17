/**
 * Created by alex on 08/03/16.
 */
var mongoose = require('mongoose');
var crypto = require('crypto');
var BigNumber = require('bignumber.js');
var jwt = require('jsonwebtoken');


var addressSchema = new mongoose.Schema({
    address : {
        type : String,
        required: "veuillez saisir une adresse"
    },
    zipCode : {
        type : String,
        match : [/^[0-9]{5}$/, "Veuillez saisir un code postal valide"],
        required: "veuillez saisir un code postal"
    },
    city : {
        type : String,
        required : "veuillez saisir une ville"
    }
});
mongoose.model('Address', addressSchema, 'Address');


var phoneNumberSchema = new mongoose.Schema({
    fixNumber : {
        type : String,
        match : [/^0[1-589][0-9]{8}$/, "veuillez saisir un numero de téléphone fixe valide"]
    },
    mobilNumber : {
        type : String,
        match : [/^0[67][0-9]{8}$/, "Veuillez saisir un numero de téléphone mobile valide"]
    }
});
mongoose.model('PhoneNumber', phoneNumberSchema, 'PhoneNumbers');


var serviceSchema = new mongoose.Schema({
    titre : {
        type : String,
        trim : true,
        required : "veuillez saisir un titre pour votre annonce"
    },
    category: {
        type :String,
        trim : true,
        required : "veuillez saisir une catégorie pour votre annonce"
    },
    subCategory : {
        type : String,
        trim : true,
        required : "veuillez saisir une sous catégorie pour votre annonce"
    },
    shortDescription : {
        type: String,
        trim : true,
        required: "veuillez saisir une courte de description"
    },
    detailedDescription : {
        type : String,
        trim : true,
        required : "veuillez saisir une description détaillé"
    },
    addressRequest : [addressSchema],
    phoneNumber : [phoneNumberSchema],

    pointNumber : {
        type : Number,
        required : "veuillez saisir un nombre de point"
    },
    done : {
        type : Boolean,
        "default" : false
    },
    inProgress : {
        type : Boolean,
        "default" : false
    },
    dateInProgress : {
        type : Date
    },
    whoDoService : {
        type : []
    },
    dateService : {
        type : Date,
        "default" : Date.now()
    },
    username : {
        type : String
    },
    email: {
        type : String
    }

});
mongoose.model('Service', serviceSchema, 'Services');


var userSchema = new mongoose.Schema({
    firstName: {
        type : String,
        trim : true
    },

    lastName: {
        type :String,
        trim : true
    },
    email: {
        type : String,
        unique : true,
        match:  [/.+\@.+\..+/, "Veuillez saisir une adresse email valide"],
        required : "veuillez saisir une adresse email",
        trim : true
    },
    username: {
        type : String,
        trim : true,

        required : "Veuillez indiquez un nom d'utilisateur OBLIGATOIRE",
        validate : {
            validator : function (username) {
                return username.length > 3
            },
            message : "le username doit contenir minimum 3 caractère"
        }
    },
    hash : {
        type :String,
        required : "veuillez indiquer un mot de passe valide"
    },
    salt : {
        type : String,
        required : "veuillez indiquer un mot de passe valide"
    },
    pointNumber : {
        type : Number,
        "default" : 0,
        min : 0
    },
    birthDate : {
        type : Number,
        validate : {
            validator : function (birthDate) {
                birthDate = new BigNumber(birthDate);
                var timestampOf18Years = new BigNumber(567990000000);
                var dateNow = new BigNumber(Date.now());
                var dateMajor = dateNow.minus(timestampOf18Years);
                return dateMajor.greaterThan(birthDate);
            },
            message : "vous devez être majeur"
        },
        required : "veuillez indiquer une date de naissance"
    },
    address : [addressSchema],

    coordsGPS : {
        type : [Number],
        index: '2dsphere'
    },
    phoneNumber : [phoneNumberSchema],

    photoStaticLink : {
        type : String
    },
    complete : {
        type : Boolean,
        "default" : false
    },
    personalDescription : {
        type : String,
        trim : true
    },
    registrationDate : {
        type : Date,
        "default" : Date.now
    },
    services : [serviceSchema]

});
userSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};
userSchema.methods.setPassword = function(password){
    if(password.length >=6){
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    }
};
userSchema.methods.generateJwt = function () {
  var expiry = new Date();
    //7 day for the token
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id : this._id,
        email : this.email,
        username : this.username,
        exp : parseInt(expiry.getTime() / 1000)
    }, process.env.JWT_SECRET);
};

userSchema.methods.formattedDate = function (dateString) {
    if(dateString.length == 0){
        return "veuillez saisir une date";
    }
    if(dateString.length !== 10){
        return "veuillez saisir un format de date correct";
    }

    var dateFormattedTab = dateString.split('/');

    if(dateFormattedTab.length == 3) {
        if (parseInt(dateFormattedTab[1]) < 13 && parseInt(dateFormattedTab[1]) > 0 &&
            parseInt(dateFormattedTab[0]) > 0 && dateFormattedTab[0] < 32){
            var day = parseInt(dateFormattedTab[0], 10);
            var month = parseInt(dateFormattedTab[1], 10) - 1;
            var year = parseInt(dateFormattedTab[2], 10);
            var birthDate = new Date(year, month, day);
            return birthDate.getTime();
        }else {
            return "veuillez saisir un format date correct";
        }
    }
    return;
};

mongoose.model('User', userSchema, 'Users');