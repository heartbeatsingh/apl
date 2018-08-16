var express = require('express');
var router = express.Router();
var adminCtr = require('./controllers/admin');
var teamValidate = require('./validate/validator');

/*router.use(function (req, res, next) {
    if(!req.session.isLoggedIn){
        res.redirect("/");
    }else{
        next();
    }
})*/

router.get('/dashboard', adminCtr.dashboard);

router.all('/teams/:id?', adminCtr.teams);

router.all('/players/:id?', adminCtr.players);
//router.post('/register',userValidator.register, userController.register);
module.exports = router;