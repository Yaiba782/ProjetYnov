/**
 * Created by alex on 09/03/16.
 */
var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users');

router.get('/users', ctrlUsers.getAllUsers);
//router.get('users/:userId', ctrlUsers.getOneUser);
//router.post('/users', ctrlUsers.createUser);
//router.put('/users', ctrlUsers.updateUser);
//router.delete('/users', ctrlUsers.deleteUser);

module.exports = router;