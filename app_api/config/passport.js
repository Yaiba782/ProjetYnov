/**
 * Created by alex on 10/03/16.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({}, function (username, password, done) {
    User.findOne({username : username}, function (err, user) {
        if(err){return done(err);}
        if(!user){
            return done(null, false, {
                message : "le nom d'utilisateur ou le mot de passe est incorrect"
            });
        }
        if(!user.validPassword(password)){
            return done(null, false, {
                message : "le nom d'utilisateur ou le mot de passe est incorrect"
            });
        }
        return done(null, user);
    });
}));