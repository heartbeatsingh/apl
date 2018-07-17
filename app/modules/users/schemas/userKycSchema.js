var db = require('../../../../config/db');
var Sequelize = require('sequelize');
var User = require('./userSchema');

var UserKyc = db.connection.define('member_kyc', {  
  kyc_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  member_id : {
    type : Sequelize.INTEGER,
    allowNull : false,
    validate : {
    }
  },
  doc_type : {
    type : Sequelize.INTEGER,
    allowNull : true,
    validate : {
    }
  },
  doc_number : {
    type : Sequelize.STRING,
    allowNull : true,
    validate : {
    }
  },
  p_res_type : {
    type : Sequelize.INTEGER,
    allowNull : true,
    validate : {
    }
  },
  p_res_photo : {
    type : Sequelize.INTEGER,
    allowNull : true,
    validate:{
    }
  },
  selfie_photo : {
    type : Sequelize.INTEGER,
    allowNull : true,
    validate:{
    }
  },
  created_at : {
    type : Sequelize.DATE,
    allowNull : true,
    validate : {
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
   console.log("before validate")
    },
    afterValidate: function(user){
      console.log("after validate");
    },
    afterCreate: function(){
      console.log("after create")
    },
    beforeCreate: function(){
      console.log("before validate")
    },
  }
});


module.exports = UserKyc;
