var db = require('../../../../config/db');
var Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

var Customersupport = db.connection.define('customer_support', {
    req_id : {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    member_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
        }
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
        
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    subject: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
        }
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
        }
    },
    created_at: {
        type: Sequelize.DATE,
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

module.exports = Customersupport;

