var aUCTIONS = require('../schemas/auction');
var uSER = require('../../users/schemas/user');

var results, row = [];

var auction = {

    auctionList : async (req,res,next) => { 
        var results = await aUCTIONS.findAll({include : [{ model: uSER}]});  
        res.render("main",
            {
                main:{module: "auctions",file: "auctionlist"},
                content: {results: results,row:row},
                flashs: {fmSuccess: req.flash('success'),fmError: req.flash('error')}
            }); 
    },
    add : async (req,res,next) => { 
        aUCTIONS.create(req.body).then(row => {
            uSER.update({auction_status:true},{where:{id:req.body.user_id}}).then(row => {
                req.flash('success', 'Player has been added in auctions queue successfully.');
                return res.redirect("/admin/players");
            })           
        });
    },

    dashboard : async (req,res,next) => {        
        var results = await uSER.findAll({where:{role:2,status:true}});    
        res.render("main",{ 
            main:{module: "auctions",file: "dashboard"},
            content: {results: results,row:row},
            flashs: {fmSuccess: req.flash('success'),fmError: req.flash('error')}
        })            
    }
    
};

module.exports = auction;