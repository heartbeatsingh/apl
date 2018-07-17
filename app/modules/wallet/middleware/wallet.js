var config = require("../config/wallet");
var TBL_CURRENCY = require('../../currency/schemas/currencySchema');
module.exports = {
    wallet_globals: async function (req, res, next) {
        global.bc_mode = process.env.MODE || config.bc_mode;
        var coin_prefix = process.env.COIN_PREFIX || config.coin_prefix;
        global.isbitgo = false;
        try {
            // console.log(TBL_CURRENCY);
            var currency = await TBL_CURRENCY.findOne({
                where: { currency_symbol: req.params.coin }
            });
            if (currency) {
                req.coininfo = {
                    isbitgocoin: currency.is_bitgo_based == 'YES' ? true : false,
                    bitgocoin: currency.is_bitgo_based == 'YES' ? coin_prefix + req.params.coin : '',
                    wallet_id: currency.bitgo_wallet,
                    wallet_passphrase: currency.bitgo_wallet_passphrase,
                    currency_id: currency.currency_id
                };
                // console.log('currency', req.coininfo)
            } else {
                res.status(500).json({ 'message': "Coin does not exits." })
            }
        } catch (error) {
            res.status(500).json(error);
            // console.error(error) // from creation or business logic
        }
        /** 
    for (const coin in config.coins) {
        if (config.coins[coin].name === req.params.coin && config.coins[coin].platform === 'bitgo') {
            global.isbitgo = true;
            var bitgocoin = coin_prefix + req.params.coin;
            console.log(config.coins[coin].wallet);
            req.coininfo = { isbitcoin: true, bitgocoin: bitgocoin, wallet_id : config.coins[coin].wallet };
            break;
        }
    }
    */
        next();
    }
}


