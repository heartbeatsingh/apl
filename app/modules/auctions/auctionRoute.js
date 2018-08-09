var express = require('express');
var router = express.Router();
var auctionCtr = require('./controllers/auctions');

/*router.use(function (req, res, next) {
    console.log('Time:', Date.now())
    next();
})*/

router.get('/', auctionCtr.auctionList);
router.post('/add', auctionCtr.add);
router.get('/dashboard', auctionCtr.dashboard);


module.exports = router;