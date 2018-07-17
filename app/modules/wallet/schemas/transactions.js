'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    txid: {
        type: String,
        required: 'Transaction ID can not be blank.',
        unique: true
    },
    amount: {
        type: mongoose.SchemaTypes.Number,
        required: "Amount can't be empty."
    },
    type: {
        type: String,
        enum: ['withdraw', 'deposit'],
        default: 'withdraw'
    },
    address_from: {
        type: String,
        required: "From address can't be empty"
    },
    address_to: {
        type: String,
        required: "To address can't be empty"
    },
    transaction: {
        type: String,
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['signed', 'confirmed'],
        default: 'signed'
    },
    confirmations: {
        type: String
    },
    inputs: {
        type: []
    },
    outputs: { type: [] },
    user_id: {
        type: String
    },
    coin : {
        type : String,
    }


});
module.exports = mongoose.model('Transactions', TransactionSchema);



