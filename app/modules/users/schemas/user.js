var db = require('../../../../config/db');
var Sequelize = require('sequelize');
var User = db.connection.define('users', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
        }
    },
    team_name: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
        }
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
    ac_no: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
        }
    },
    ac_pk: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
        }
    },
    basic_value: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
        }
    },
    total_tokens: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
        }
    },
    balance_tokens: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
        }
    },
    picture: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
        }
    },
    brief_desc: {
        type: Sequelize.TEXT,
        allowNull: true,
        validate: {
        }
    },
    role: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
        }
    },
    status: {
        type: Sequelize.BOOLEAN,
    },
    auction_status: {
        type: Sequelize.BOOLEAN,
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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
    //User.belongsTo(UserProfile , {foreignKey : 'member_id'});

module.exports = User;

