var db = require('../../../../config/db');
var tEAMS = require('../schemas/team');
var pLAYERS = require('../schemas/player');

var results, row = [];

var admin = {

    dashboard : async (req,res,next) => {
       res.render("main",{main:{module: "admin",file: "dashboard"}});
        
    },

    teams : async (req,res,next) => {       
        if(req.method == "POST"){
            if(typeof req.body.status == 'undefined'){
                req.body.status = false;
            }else{
                req.body.status = true;
            }
            if(req.params.id){
                tEAMS.update(req.body,{where:{id:req.params.id}}).then(row => {
                    req.flash('success', 'Team has been updated successfully.');
                    return res.redirect("/admin/teams");
                })
            }else{
                tEAMS.create(req.body).then(row => {
                    req.flash('success', 'The team has been added successfully.');
                    return res.redirect("/admin/teams");
                });
            }
        }else{
            var results = await tEAMS.findAll();
            if(req.params.id){
                var row = await tEAMS.findById(req.params.id);
            }
            res.render("main",
            {
                main:{module: "admin",file: "teams"},
                content: {results: results,row:row},
                flashs: {fmSuccess: req.flash('success'),fmError: req.flash('error')}
            });        
        }
     },


     players : async (req,res,next) => {
        if(req.method == "POST"){
            if(typeof req.body.status == 'undefined'){
                req.body.status = false;
            }else{
                req.body.status = true;
            }
            if(req.params.id){
                pLAYERS.update(req.body,{where:{id:req.params.id}}).then(row => {
                    req.flash('success', 'Player has been updated successfully.');
                    return res.redirect("/admin/players");
                })
            }else{
                pLAYERS.create(req.body).then(row => {
                    req.flash('success', 'Player has been added successfully.');
                    return res.redirect("/admin/players");
                });
            }
        }else{
            var results = await pLAYERS.findAll();
            if(req.params.id){
                var row = await pLAYERS.findById(req.params.id);
            }
            res.render("main",
            {
                main:{module: "admin",file: "players"},
                content: {results: results,row:row},
                flashs: {fmSuccess: req.flash('success'),fmError: req.flash('error')}
            });        
        }
     },

};

 function  fileUpload(PhotoDetail)
    {  
        let  UploadedPresdPhoto = Date.now() + '-'+ PhotoDetail.name
        PhotoDetail.mv('./public/uploads/'+ UploadedPresdPhoto,async (err,success) => {
            if(err){
            return res.json(err);
            }
            
        var filesObj= await TBL_FILES.create({
                file_name : UploadedPresdPhoto,
                file_path : '/public/uploads/' + UploadedPresdPhoto,
                file_size : 100 +'mb',
                file_type : PhotoDetail.mimetype
            });
            var fileFirst=filesObj.dataValues.file_id;
            return fileFirst;
        }) ;
    }

module.exports = admin;