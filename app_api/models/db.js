/**
 * Created by alex on 08/03/16.
 */

var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/BaseData';

if(process.env.NODE_ENV === 'production'){
    dbURI =  process.env.MONGOLAB_URI;
}
mongoose.connect(dbURI);
//event
mongoose.connection.on('connected', function () {
   console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
   console.log('Mongoose connection error : ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

//Function who close mongoose connection
var shutdownMongoDb = function (msg, callback) {
  mongoose.connection.close(function () {
     console.log('Mongoose is disconnected through ' + msg);
      callback();
  });
};
//process of nodemon
process.once('SIGUSR2', function () {
    shutdownMongoDb('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});
//process of nodejs when close the app local
process.on('SIGINT', function () {
   shutdownMongoDb('app termination', function () {
       process.exit(0);
   }) ;
});
//process of heroku when close the app
process.on('SIGTERM', function () {
    shutdownMongoDb('Heroku shutdown', function () {
       process.kill();
    });
});

require('./user');