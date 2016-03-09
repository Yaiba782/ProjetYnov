/**
 * Created by alex on 08/03/16.
 */
var mongoose = require('mongoose');
var crypto = require('crypto');
var BigNumber = require('bignumber.js');

var addressSchema = new mongoose.Schema({
    address : {
        type : String,
        require : "veuillez saisir une adresse"
    },
    zipCode : {
        type : String,
        match : [/^[0-9]{5}$/, "Veuillez saisir un code postal valide"],
        require : "veuillez saisir un code postal"
    },
    city : {
        type : String,
        require : "veuillez saisir une ville"
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
    password:{
        type : String,
        require : true,
        unique : true,
        validate : {
            validator : function(password){
                return password.length >=6
            },
            message : 'Le mot de passe doit contenir minimum 6 caractère'
        }
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
        require : true
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
userSchema.pre('save', function (next) {
    if(this.password >=6){

        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');

        this.password = this.hashPassword(this.password);
    }
    next();
});
userSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

mongoose.model('User', userSchema, 'Users');