var db = require('../../../../config/db');
var Sequelize = require('sequelize');
var player = db.connection.define('players',{name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
    }
}});
var auction = db.connection.define('auctions', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    player_id: {
        type: Sequelize.INTEGER,
        unique: true,
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
    

module.exports = auction;

