var db = require('../../../../config/db');
var Sequelize = require('sequelize');
var team = db.connection.define('auctions_logs', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    auction_id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        validate: {
        }
    },
    bidder_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
        }
    },
    change_log: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
        }
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
    //User.belongsTo(UserProfile);

module.exports = team;

