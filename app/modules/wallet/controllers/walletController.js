var mongoose = require('mongoose');

var Helper = require("../helpers/wallet");
var BitgoHelper = require("./../helpers/bitgo");
var request_secound = require('request');
var TBL_WALLET = require('../schemas/walletSchema');
var transaction_schemas = require('./../schemas/transactions');
let request = require('async-request');
var TRANSACTIONS = mongoose.model('Transactions');
var walletController = {
    get_address: asyncMiddleware(async function (req, res) {
        var member_id = req.user.member_id;
        var isAddress = await TBL_WALLET.findOne({ where: { member_id: member_id, currency_id: req.coininfo.currency_id } });
        if (isAddress) {
            if (isAddress.address != '') {
                output = { address: isAddress.address };
            } else if (isAddress.wallet_address_id != '') {
                output = { address_id: isAddress.wallet_address_id };
            }
            res.json(output);
        } else {
            if (req.coininfo.isbitgocoin) {
                var address = await BitgoHelper.get_address(req, res);
            } else {
                var address = "";
            }

            if (!address) {
                res.status(500).json({ message: 'Unable to create address at moment.' });
            } else {
                var walletObj = { member_id: member_id, currency_id: req.coininfo.currency_id };
                var output = {};
                console.log(address);
                if (address.address != '') {
                    walletObj.address = address.address;
                    output = { address: address.address };
                } else if (address.id != '') {
                    walletObj.wallet_address_id = address.address_id;
                    output = { address_id: address.address_id };
                }
                var account = await TBL_WALLET.create(walletObj);
                if (account != false) {
                    res.status(200).json(output);
                } else {
                    res.status(500).json({ message: 'Unable to create address at moment.' });
                }
            }
        }

    }),
    /**
     * Bit go etherume specific 
     */
    get_eth_address: asyncMiddleware(async function (req, res) {
        var member_id = req.user.member_id;
        var isAddress = await TBL_WALLET.findOne({ where: { member_id: member_id, currency_id: req.coininfo.currency_id } });
        if (isAddress) {
            if (isAddress.address != '') {
                output = { address: isAddress.address };
                res.status(200).json(output);
            } else if (isAddress.wallet_address_id != '') {
                var options = await Helper.AwaitPublicGet(
                    `${req.coininfo.bitgocoin}/wallet/${req.coininfo.wallet_id}/address/${isAddress.wallet_address_id}`
                );
                var data = await request(options.url, options.data);
                var body = data.body;
                if (typeof data.body === 'string') {
                    var body = JSON.parse(data.body);
                }
                console.log(body);
                if (data.statusCode == 200) {
                    var address = typeof body.address != 'undefined' ? body.address : '';
                    console.log("IN 200", address);
                    if (address != '') {
                        console.log("Updating");
                        TBL_WALLET.update({ address: address }, {
                            returning: true,
                            where: {
                                account_id: isAddress.account_id
                            }
                        });
                    }
                    output = { address: address };
                    res.status(200).json(output);
                } else {
                    res.status(500).json({ message: 'Unable to create address at moment.' });
                }

            }
        }
    }),
    send: asyncMiddleware(async function (req, res) {
        var member_id = req.user.member_id;
        var amount = req.body.amount * 1e8;
        var isAddress = await TBL_WALLET.findOne({ where: { member_id: member_id, currency_id: req.coininfo.currency_id } });
        if (isAddress) {
            if (isAddress.balance <= amount) {
                res.json({ message: 'Insufficient funds in wallet.' });
            } else {
                console.log("Transaction");
                if (req.coininfo.isbitgocoin) {
                    var transaction = await BitgoHelper.transfer(req, res, amount);
                } else {
                    var transaction = {};
                }
                console.log(transaction);
                if (typeof transaction.txid !== 'undefined') {
                    var isUpdated = await isAddress.update({ balance: (isAddress.balance - amount) });
                    var transactionObj = {
                        txid: transaction.txid,
                        amount: amount,
                        address_from: isAddress.address,
                        address_to: req.body.address,
                        user_id: member_id,
                        coin: req.coininfo.currency_id
                    };
                    console.log(transactionObj);
                    var transaction = new TRANSACTIONS(transactionObj);

                    var transaction = await transaction.save();

                    res.status(200).json({ message: 'Transfer successful', data: { txid: transaction.txid } });
                } else {
                    res.status(500).json({ message: 'Unable to complete tranfer at moment.' });
                }
            }
        } else {
            return res.status(404).json({ message: 'Wallet not found for user.' });
        }
    }),
    withdraw_transactions: asyncMiddleware(async function (req, res) {
        var member_id = req.user.member_id;
        var transactions = TRANSACTIONS.find({
            type: 'withdraw',
            user_id: member_id,
            coin: req.coininfo.currency_id
        });
        var transactions = await transactions.exec();
        res.json({ message: "User transactions", transaction: transactions });
    }),
    web_hook: asyncMiddleware(async function (req, res) {
        console.log("Web hook excuted");
        var coin = req.body.coin;
        var wallet = req.body.wallet;
        var transfer = req.body.transfer;
        var txid = req.body.hash;
        var options = await Helper.AwaitPublicGet(`${coin}/wallet/${wallet}/transfer/${transfer}`);
        var data = await request(options.url, options.data);
        if (typeof data.body === 'string') {
            var body = JSON.parse(data.body);
        }
        var transactions = TRANSACTIONS.findOne({ txid: txid });
        var address_to = body.outputs[0].address;
        var address_from = body.inputs[0].address;
        var amount = body.value;
        var transaction = await transactions.exec();
        // console.log(transactions);
        if (transaction.length > 0) {
            console.log({ txid: txid });
            TRANSACTIONS.update({ user_id: "confirmed" }, { txid: txid });
            console.log("updated");
            // console.log(isUpdated.status);
        } else {
            console.log('Transaction does not exists');
            var wallet = await TBL_WALLET.findOne({ where: { address: address_to, currency_id: req.coininfo.currency_id } });
            if (wallet) {
                console.log("Wallet exits");
                var member_id = wallet.member_id;
                var transactionObj = {
                    txid: txid,
                    amount: amount,
                    address_from: address_from,
                    address_to: address_to,
                    user_id: member_id,
                    coin: req.coininfo.currency_id,
                    type: "deposit",
                    status: body.state
                };
                var transaction = new TRANSACTIONS(transactionObj);
                var transaction = await transaction.save();
                var updatedBalance = wallet.balance + amount;
                await wallet.update({balance : updatedBalance});
            }
        }
        res.json({ message: "Got Web hook." });
    })


};
module.exports = walletController;




