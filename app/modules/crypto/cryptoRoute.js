var express = require('express');
var router = express.Router();
var adminCtr = require('./controllers/admin');

router.get('/dashboard', adminCtr.dashboard);

router.all('/teams/:id?', adminCtr.teams);

router.all('/players/:id?', adminCtr.players);
//router.post('/register',userValidator.register, userController.register);
module.exports = router;