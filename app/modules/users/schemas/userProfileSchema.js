var db = require('../../../../config/db');
var Sequelize = require('sequelize');
var User = require('./userSchema');

var UserProfile = db.connection.define('member_profile', {
  profile_id: {
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
  first_name : {
    type : Sequelize.STRING,
    allowNull : true,
    validate : {
    }
  },
  middle_name : {
    type : Sequelize.STRING,
    allowNull : true,
    validate : {
    }
  },
  last_name : {
    type : Sequelize.STRING,
    allowNull : true,
    validate : {
    }
  },
  name:{
    type:Sequelize.STRING,
    allowNull : true,
    validate:{
    }
  },
  device_type:{
    type:Sequelize.INTEGER,
    allowNull : true,
    validate:{
    }
  },
  device_token:{
    type:Sequelize.STRING,
    allowNull : true,
    validate:{
    }
  },
  gender : {
    type : Sequelize.INTEGER,
    allowNull : true,
    validate:{
    }
  },
  birth_date : {
    type : Sequelize.INTEGER,
    allowNull : true,
    validate:{
    }
  },
  birth_month : {    
    type : Sequelize.INTEGER,
    allowNull : true,
    validate:{
    }
  },
  birth_year : {   
    type : Sequelize.INTEGER,
    allowNull : true,
    validate:{
    }
  },
  phone : {
    type : Sequelize.STRING,
    allowNull : true,
    validate : {
    }
  },
  city : {
    type : Sequelize.STRING,
    allowNull : true,
    validate : {
    }  
  },
  country : {
    type : Sequelize.STRING,
    allowNull : true,
    validate : {
    }  
  },
  address : {
    type : Sequelize.STRING,
    allowNull : true,
    validate : {
    }  
  },
  zipcode : {
    type : Sequelize.STRING,
    allowNull : true,
    validate : {
    }  
  },
  activation_code: {
    type : Sequelize.STRING,
    allowNull : true,
    validate : {
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
//UserProfile.belongsTo(User , {foreignKey : 'member_id'});

module.exports = UserProfile;
