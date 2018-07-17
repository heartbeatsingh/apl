let request = require('async-request');
let Helper = require('./wallet');
module.exports = {
    get_address: async function (req, res) {
        var options = await Helper.AwaitPublicPost(`${req.coininfo.bitgocoin}/wallet/${req.coininfo.wallet_id}/address`);
        var data = await request(options.url, options.data);
        if (typeof data.body === 'string') {
            var body = JSON.parse(data.body);
        }
        if (data.statusCode == 200) {
            return {
                address: typeof body.address != 'undefined' ? body.address : '',
                address_id: typeof body.id != 'undefined' ? body.id : ''
            };
        } else {
            return false;
        }
    },
    transfer: async function (req, res, amount) {
        var option = await Helper.buildRequestPost('POST',
            { "address": req.body.address, "walletPassphrase": req.coininfo.wallet_passphrase, "amount": amount },
            `${req.coininfo.bitgocoin}/wallet/${req.coininfo.wallet_id}/sendcoins/`
        );
        return await await_post_request(option);
    }
}