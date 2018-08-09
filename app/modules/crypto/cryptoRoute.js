var express = require('express');
var router = express.Router();
var cryptoCtr = require('./controllers/crypto');

router.use(function (req, res, next) {
    console.log('Time:', Date.now())
    next();
})


router.post('/generateAddress', cryptoCtr.generateAddress);


module.exports = router;