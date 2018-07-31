var db = require('../../../../config/db');
var tEAMS = require('../schemas/team');
var _data = [];

var admin = {

    dashboard : async (req,res,next) => {
       res.render("main",{main:{module: "admin",file: "dashboard"}});
        
    },

    teams : async (req,res,next) => {
        
        if(req.method == "POST"){
            console.log(req.body.status);
            if(typeof req.body.status == 'undefined'){
                req.body.status = false;
            }else{
                req.body.status = true;
            }
            tEAMS.create(req.body).then(row => {
                
            })
            
        }else{
            var _data = await tEAMS.findAll();
            //console.log(teamData);
            res.render("main",{main:{module: "admin",file: "teams", content: _data}});
        }
         
     },

     players : async (req,res,next) => {
        res.render("main",{main:{module: "admin",file: "players"}});
         
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