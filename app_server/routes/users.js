var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {

  res.json({"message" : "ok tout va bien"});

});

module.exports = router;
