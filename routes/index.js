var express = require('express');
var router = express.Router();

/* GET home page. */           /* UTILISATION AVEC JADE */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

exports.index = function(req, res){
  res.render('index', { title: 'ejs' });};
router.get('/', exports.index);

exports.index = function(req, res){
  res.render('index', { title: 'ejs' });};

module.exports = router;