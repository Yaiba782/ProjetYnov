/**
 * Created by alex on 09/03/16.
 */
var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret : process.env.JWT_SECRET,
    userProperty : 'payload'
});
var ctrlAuthentication = require('../controllers/authentication');
var ctrlUsers = require('../controllers/users');
var ctrlService = require('../controllers/services');

router.post('/register',  ctrlAuthentication.register);
router.post('/login', ctrlAuthentication.login);
//

router.get('/users', ctrlUsers.getAllUsers);
router.get('/users/:userid/userid', ctrlUsers.getOneUserById);
router.post('/users', ctrlUsers.updateUser);
router.post('/test1', ctrlUsers.test);
//router.delete('/users', ctrlUsers.deleteUser);

router.post('/services', ctrlService.addService);

module.exports = router;