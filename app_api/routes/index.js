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


//services
router.post('/services', auth, ctrlService.addService);
router.get('/services', ctrlService.getAllServices);
router.get('/services/:serviceId/getOneServiceById', ctrlService.getOneServiceById);
router.get('/services/:username/getAllServicesByUsername', ctrlService.getAllServicesByUsername);
router.put('/services/:serviceId', auth, ctrlService.updateServiceById);
router.delete('/services/:serviceId', auth, ctrlService.deleteServiceById);
module.exports = router;