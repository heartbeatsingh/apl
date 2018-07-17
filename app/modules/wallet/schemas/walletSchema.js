var db = require('../../../../config/db');
var Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
//var TBL_ROLES = require('./userRoleSchema');

var User = db.connection.define('accounts', {
    account_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    member_id: {
        type: Sequelize.BIGINT,
        allowNull: false,

    },
    currency_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        validate: {
        }
    },
    balance: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
        }
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    legacy_address: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    secret: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    wallet_address_id: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    created_at: {
        type: 'TIMESTAMP',
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

module.exports = User;

