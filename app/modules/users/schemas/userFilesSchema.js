var db = require('../../../../config/db');
var Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
//var TBL_ROLES = require('./userRoleSchema');

var UserFiles = db.connection.define('member_files',{
    file_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    file_name : {
        type : Sequelize.STRING,
        unique : true,
        allowNull : false,
        validate:{  
        }
    },
    file_path : {
        type : Sequelize.STRING,
        allowNull : false,
        validate:{
        }
    },
    file_size : {
        type : Sequelize.STRING,
        allowNull : true,
        validate:{
        }
    },
    file_type : {
        type : Sequelize.STRING,
        allowNull : true,
        validate:{
        }
    },
    created_at : {
        type: Sequelize.DATE,
        allowNull: false,
        validate:{
        }
    },
    updated_at : {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        validate:{
        }
    }
   },{
        hooks: {
          beforeValidate: function(){
        //  console.log("before validate")
          },
          afterValidate: function(user){
            // console.log("after validate");
          },
          afterCreate: function(file){
            // console.log(file)
          },
          beforeCreate: function(){
            // console.log("before validate")
          },
        }
});


module.exports = UserFiles;

