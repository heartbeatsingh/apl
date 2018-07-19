var db = require('../../../../config/db');



var admin = {

    dashboard : async (req,res,next) => {
       res.render("main",{main:{module: "admin",file: "dashboard"}});
        
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