var db = require('../../../../config/db');
var Sequelize = require('sequelize');

var Currency = db.connection.define('currency_master', {
    currency_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    currency_name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    currency_symbol: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
        }
    },
    balance: {
        type: Sequelize.BIGINT,
    },
    spendable_balance: {
        type: Sequelize.BIGINT,
    },
    locked_balance: {
        type: Sequelize.BIGINT,
    },
    is_bitgo_based: {
        type: Sequelize.ENUM('YES', 'NO')
    },
    withdraw_fee: {
        type: Sequelize.DECIMAL
    },
    bitgo_wallet: {
        type: Sequelize.STRING
    },
    bitgo_wallet_passphrase: {
        type: Sequelize.STRING
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        validate: {
        }
    },
    updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        validate: {
        }
    }
}, {
        hooks: {
            beforeValidate: function () {
                console.log("before validate")
            },
            afterValidate: function (user) {
                console.log("after validate");
            },
            afterCreate: function () {
                console.log("after create")
            },
            beforeCreate: function () {
                console.log("before validate")
            },
        }
    });


module.exports = Currency;

