var db = require('../../../../config/db');
//var tEAMS = require('../schemas/team');
//var pLAYERS = require('../schemas/player');

var results, row = [];

var crypto = {

    generateAddress : async (req,res,next) => {
       res.render("main",{main:{module: "admin",file: "dashboard"}});
        
    },

    
};

module.exports = admin;