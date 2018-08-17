var db = require('../../../../config/db');
var Sequelize = require('sequelize');
var User = require('../../users/schemas/user');
var auction = db.connection.define('auctions', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
        }
    },

    time_limit: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
        }
    },
    status: {
        type: Sequelize.BOOLEAN,
    },
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        validate: {
        }
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        validate: {
        }
    },
    
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
    auction.belongsTo(User);

module.exports = auction;

