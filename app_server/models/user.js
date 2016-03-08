/**
 * Created by alex on 08/03/16.
 */
var mongoose = require('mongoose');
var user = new mongoose.Schema({
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
        required : true
    },
    username: {
        type : String,
        trim : true,
        unique : true,
        required : "Veuillez indiquez un nom d'utilisateur OBLIGATOIRE"
    },
    password:{
        type : String,
        require : true,
        validate : [
            function(password){
                return password.length >=6
            },
            'Le mot de passe doit contenir minimum 6 caractère'
        ]
    },
    point : {
        type : String,
        "default" : 0,
        min : 0
    },
    birthDate : {
        type : Date,
        validate : [
            function (birthDate) {
                var timestampOf8Years = 567993600;
                var timestampIsMajor = timestampOf8Years - Date.now();
                return birthDate < timestampIsMajor;
            }
        ],
        require : true
    },
    address : {
        type : [String]
    },
    coordsGPS : {
        type : [Number],
        index: '2dsphere'
    },
    telephones : {
        type : [Number]
    },
    photoStatic : {
        type : String
    }

});

mongoose.model('User', user, 'Users');