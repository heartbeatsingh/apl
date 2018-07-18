var express = require('express');
var router = express.Router();
var userController = require('./controllers/userController');

router.post('/register',userValidator.register, userController.register);
module.exports = router;