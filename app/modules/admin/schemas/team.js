var db = require('../../../../config/db');
var Sequelize = require('sequelize');
var team = db.connection.define('teams', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    team_name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
        }
    },
    manager_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
        }
    },
    manager_email: {
        type: Sequelize.STRING,
        unique: true,
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
    ac_balance: {
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
    picture: {
        type: Sequelize.STRING,
        allowNull: true,
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
    //User.belongsTo(UserProfile , {foreignKey : 'member_id'});

module.exports = team;

