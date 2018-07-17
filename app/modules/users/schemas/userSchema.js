var db = require('../../../../config/db');
var Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
var UserProfile = require('./userProfileSchema');

var User = db.connection.define('member_master', {
    member_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
        }
    },
    user_role: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
        }
    },
    email_status: {
        type: Sequelize.ENUM('inactive', 'active'),
        allowNull: true,
        defaultValue: "inactive",
        validate: {
        }
    },
    kyc_status: {
        type: Sequelize.ENUM('inactive', 'active'),
        allowNull: true,
        defaultValue: "inactive",
        validate: {
        }
    },
    account_status: {
        type: Sequelize.ENUM('inactive', 'active'),
        allowNull: true,
        defaultValue: "inactive",
        validate: {
        }
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
    User.belongsTo(UserProfile , {foreignKey : 'member_id'});

module.exports = User;

