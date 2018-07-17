var express = require('express');
var router = express.Router();
var db = require('../../../config/db');
var walletController = require('./controllers/walletController');
var walletMiddleware = require('./middleware/wallet');
var aysncMiddleware = require('../../../middlewares/Async');
var passport = require('passport');

router.get('/:coin/get_address/', [walletMiddleware.wallet_globals], passport.authenticate('jwt', { session: false }), walletController.get_address);
router.get('/:coin/addressid_to_address/', [walletMiddleware.wallet_globals], passport.authenticate('jwt', { session: false }), walletController.get_eth_address);
router.post('/:coin/send/', [walletMiddleware.wallet_globals], passport.authenticate('jwt', { session: false }), walletController.send);

//withdraw_transactions
router.get('/:coin/withdraw_transactions/', [walletMiddleware.wallet_globals,], passport.authenticate('jwt', { session: false }), walletController.withdraw_transactions);
/**
 * JWT Disabled on transfer webhook
 */
router.post('/:coin/webhook/', [walletMiddleware.wallet_globals], walletController.web_hook);


module.exports = router;