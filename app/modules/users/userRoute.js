var express = require('express');
var router = express.Router();
var db = require('../../../config/db');
var userController = require('./controllers/userController');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var userValidator = require('./validations/user_validator');
var expressValidator = require('express-validator');
Users = db.connection.define('member_master');

router.use(expressValidator({
    customValidators: {
        
     isUnique (value,key) {
        console.log(value+""+key);
        var checkObj = {};
        checkObj[key] = value;
        console.log(checkObj);
        return new Promise((resolve, reject) => {
            Users.findOne({where:checkObj,
                attributes: ['member_id']})
            .then(response=>{
                if(response == null) { resolve(); }
                else{reject(); } })
            .catch((err)=>{
                throw err;
         }); });
    } }
}));

router.post('/register',userValidator.register, userController.register);
router.put('/kycregister',userValidator.kyc,passport.authenticate('jwt', {session:false}), userController.kycRegister);
router.post('/login',userValidator.login,userController.login);
//router.get('/userprofile', passport.authenticate('jwt', {session:false}), userController.userdetail);
router.post('/forgotpassword',userValidator.forgotpassword,userController.forgotPassword);
router.post('/resetpassword/:id',userController.resetPassword);
router.post('/kycactivate/:id',userController.kycActivate);
router.post('/kycdeactivate/:id',userController.kycDeactivate);
router.post('/useractivate/:id',userController.userActivate);
router.post('/userdeactivate/:id',userController.userDeactivate);
router.post('/userlisting/:id',userController.userListing);
router.post('/verifycode',userValidator.verifycode, userController.verifyCode);
router.post('/resendverifycode',userValidator.resendverifycode, userController.resendVerifycode);
router.put('/updatemyaccount',passport.authenticate('jwt', {session:false}), userController.updateMyaccount);
router.post('/customersupport',userValidator.customersupport,passport.authenticate('jwt', {session:false}), userController.customerSupport);
router.post('/logout',userController.logout);
module.exports = router;