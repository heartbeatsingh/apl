var express = require('express');
var router = express.Router();
var cryptoCtr = require('./controllers/crypto');

router.post('/generateAddress', cryptoCtr.generateAddress);


module.exports = router;