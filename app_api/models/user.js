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

var userSchema = new mongoose.Schema({
    firstName: {
        type : String
    },

    lastName: {
        type :String
    },
    email: {
        type : String,
        index : true,
        match:  [/.+\@.+\..+/, "Veuillez saisir une adresse email valide"],
        required : "veuillez saisir une adresse email",
        unique : true
    },
    username: {
        type : String,
        trim : true,
        unique : true,
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
        required : "veuillez indiquer un mot de passe"
    },
    salt : {
        type : String,
        required : "veuillez indiquer un mot de passe"
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
        type : String
    },
    registrationDate : {
        type : Date,
        "default" : Date.now
    }
});
userSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};
userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
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

mongoose.model('User', userSchema, 'Users');