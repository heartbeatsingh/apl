var db = require('../../../../config/db');
var tEAMS = require('../../admin/schemas/team');
var pLAYERS = require('../../admin/schemas/player');
var aUCTIONS = require('../schemas/auction');

var results, row = [];

var auction = {

    auctionList : async (req,res,next) => { 
        var results = await aUCTIONS.findAll({include    : [{ model: pLAYERS}]});   
        res.render("main",
            {
                main:{module: "auctions",file: "auctionlist"},
                content: {results: results,row:row},
                flashs: {fmSuccess: req.flash('success'),fmError: req.flash('error')}
            }); 
    },
    add : async (req,res,next) => { 
        aUCTIONS.create(req.body).then(row => {
            pLAYERS.update({auction_status:true},{where:{id:req.body.player_id}}).then(row => {
                req.flash('success', 'Player has been added in auctions queue successfully.');
                return res.redirect("/admin/players");
            })           
        });
    },

    dashboard : async (req,res,next) => {    
        
        var results = await tEAMS.findAll();    
        res.render("main",{ 
        main:{module: "auctions",file: "dashboard"},
        content: {results: results,row:row},
        flashs: {fmSuccess: req.flash('success'),fmError: req.flash('error')}
        })            

    }
    
};

module.exports = auction;