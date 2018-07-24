var express = require('express');
var router = express.Router();
var adminCtr = require('./controllers/admin');

router.get('/dashboard', adminCtr.dashboard);
router.get('/teams', adminCtr.teams);
router.get('/players', adminCtr.players);
//router.post('/register',userValidator.register, userController.register);
module.exports = router;