var db = require('../../../../config/db');
var passport = require('passport');
var jwt = require('jsonwebtoken');
//var mailer = require('../../../../config/mailer');
var fs = require('fs');
var Sequelize = require('sequelize');

var bcrypt = require('bcryptjs');
var Hashids = require('hashids');
var asyncMiddleware = require("../../../../middlewares/Async"); 
var TBL_USER = require('../schemas/userSchema');
var TBL_PROFILE = require('../schemas/userProfileSchema');
var TBL_KYC = require('../schemas/userKycSchema');
var TBL_FILES = require('../schemas/userFilesSchema');
//var TBL_CUSTSPRT = require('../schemas/customersupport');
var TBL_CUSTSPRT = require('../schemas/customersupportSchema');
var globalVariables = require('../../../../globalVariables');
var currentDate = globalVariables.crntDate;
Helper = require("../../../helper/commen");


var usersController = {
    //User Registration  
    register : asyncMiddleware(async (req,res,next)=>{
        plainPassword = req.body.password;
        hashPassword = await bcrypt.hash(plainPassword.toString(),8);
        
        var name=(req.body.name)!=""?req.body.name:'';
        var phone=(req.body.phone)!=""?req.body.phone:'';
        var device_token=(req.body.device_token)!=""?req.body.device_token:'';
        var device_type=(req.body.device_type)!=""?req.body.device_type:'';
        var activation_code=Math.floor(Math.random()*90000) + 10000;
        
        var NewUser = {            
            password :hashPassword,
            email : req.body.email,
            email_status : 0,
            account_status : 1,
            kyc_status : 0,
            user_role : req.body.user_role,
            created_at : currentDate
        }
        //var userObj = {};
        var userdata = await TBL_USER.create(NewUser)
        var userObj = userdata
        var profile = await TBL_PROFILE.create({
            member_id : userObj.dataValues.member_id,
            first_name  :   "",
            last_name  :   "",
            phone   :   phone,
            name   :   name,
            device_token : device_token,
            device_type  : device_type,
            activation_code:activation_code,
            created_at : userObj.dataValues.created_at
            })
        var kyc = await TBL_KYC.create({
                member_id : userObj.dataValues.member_id,
                created_at : userObj.dataValues.created_at
                 });        
            const token = await jwt.sign(userObj.dataValues.member_id, db.secret, {
            })
           // console.log(userObj.dataValues.member_id)
           db.connection.query("SELECT member_master.*,member_profile.* FROM `member_master` inner join member_profile on member_profile.member_id=member_master.member_id where member_master.member_id= "+userObj.dataValues.member_id, { type: Sequelize.QueryTypes.SELECT})
        .then(response => {
            //return ReS(res,200,"User registered successfully",response[0],'JWT '+token)
            let send_data = {success:true,status:201,message:"User registered successfully", token: 'JWT '+token,data:response[0]};
            res.status(201).json(send_data);
            // We don't need spread here, since only the results will be returned for select queries
        })
        //    TBL_USER.findAll({
        //         include :[
        //             {model : TBL_PROFILE,where: {member_id: userObj.dataValues.member_id} }
        //         ]
        //     }).then((response) => {
        //         //returnOP.success(res,200,"succesfully get topics", response);
        //         //res.json(response);
        //         console.log(response);
        //         return ReS(res,200,"User registered successfully",response,'JWT '+token)
        //     })
        //Data = { member_id:userObj.dataValues.member_id, email : userObj.dataValues.email,name : profile.dataValues.name   }
       // var html='';
        //var mail = Helper.commen.sendMail(req.body.email, 'Registration Successful!', html);   
        //return ReS(res,200,"User registered successfully",Data,'JWT '+token)
        
    }),
    //Kyc Registration
    kycRegister : asyncMiddleware(async (req,res,next)=>{     
        console.log(req.files);
        if ((!req.files.p_res_photo) || (!req.files.selfie_photo)){
            return res.json('Please upload both of the files.');
         }
         var fileFstId=fileUpload(req.files.p_res_photo);
         var fileSecondId=fileUpload(req.files.selfie_photo);
        var fileFirst="";
        var fileSecond="";
        var member_id=req.user.member_id;
        var userProfile = {            
            first_name :req.body.first_name,
            middle_name : req.body.middle_name,
            last_name : req.body.last_name,
            city : req.body.city,
            country : req.body.country,
            phone : req.body.phone,
            address : req.body.address,
            zipcode : req.body.zipcode,
            birth_year : req.body.birth_year,
            birth_month : req.body.birth_month,
            birth_date : req.body.birth_date
        };
        var data= await TBL_PROFILE.update(userProfile,{where:{member_id:member_id}});       
        var userKyc = {
            member_id: member_id,           
            doc_type :req.body.doc_type,
            p_res_type : req.body.p_res_type,
            doc_number : req.body.doc_number,
            p_res_photo : fileFstId,
            selfie_photo: fileSecondId
        };
        var data= await TBL_KYC.update(userKyc,{where:{member_id:member_id}}); 
        //return res.json("Success");
        res.status(200).json({ member_id:member_id });
    }),
    //login User  
    login : asyncMiddleware( async (req,res,next)=>{
        var NewUser = {
            email : req.body.email,
            password : req.body.password.toString()
        }
        var userProfile={device_token:req.body.device_token,device_type:req.body.device_type};
        var UserObj = {};
        var isEmailExsists= await TBL_USER.findOne({where: {email: NewUser.email},
            attributes: ['member_id','password','email','user_role']});

            var ress= isObjEmpty(isEmailExsists);
           if(ress==true)
           {
            let send_data = {success:false,status:400,message:"Username or Password is not valid."};
                 res.status(400).json(send_data);
                //res.status(401).json({ message: "Not valid" });
           }
           else
           {
            
            //console.log("user");
            this.UserObj = isEmailExsists;
            var hashPassword = isEmailExsists.dataValues.password.toString();
            var comaprePass=await  bcrypt.compare(NewUser.password,hashPassword,(err,isMatch)=>{
               console.log("hello "+NewUser.password+" new "+hashPassword);
              if(err)
              {
                let send_data = {success:false,status:400,message:"Something Went Wrong", error:err};
                        res.status(400).json(send_data);
                //return ReE(res,400,"Something Went Wrong",err)
              }
              if(isMatch){ console.log(isMatch);
              var mem_id=isEmailExsists.member_id;
              var data=  TBL_PROFILE.update(userProfile,{where:{member_id:mem_id}});
                  const token =jwt.sign(isEmailExsists.member_id, db.secret, {
                   });
                   db.connection.query("SELECT member_master.*,member_profile.* FROM `member_master` inner join member_profile on member_profile.member_id=member_master.member_id where member_master.member_id= "+isEmailExsists.member_id, { type: Sequelize.QueryTypes.SELECT})
                   .then(response => {
                       //return ReS(res,200,"User login successfully",response[0],'JWT '+token)
                       let send_data = {success:true,status:200,message:"User login successfully", token: 'JWT '+token,data:response[0]};
                        res.status(200).json(send_data);
                       // We don't need spread here, since only the results will be returned for select queries
                   })
                //    Data = {member_id:this.UserObj.member_id, email : this.UserObj.email,user_role: this.UserObj.user_role}
                //    return ReS(res,200,"User login successfully",Data,'JWT '+token);
                  //res.json("login success");
              }
              else
              {
                //ReE(res,400,"Password not match");
                let send_data = {success:false,status:400,message:"Password is not matched"};
                res.status(400).json(send_data);

              }
          });}
          
    }),
    verifyCode:asyncMiddleware( async (req,res,next)=>{
        
           var member_id= req.body.member_id;
           var code = req.body.code;
           var isActivationCodeEmpty= await TBL_PROFILE.findOne({where: {member_id: member_id,activation_code:code},
            attributes: ['member_id']});
           var ress= isObjEmpty(isActivationCodeEmpty);
           if(ress==true)
           {
            let send_data = {success:false,status:400,message:"Activation Code is not valid"};
                 res.status(400).json(send_data);
                //res.status(401).json({ message: "Not valid" });
           }
           else
           {
            let send_data = {success:true,status:200,message:"Verification code has been verified successfully."};
                 res.status(200).json(send_data);
           }
           //console.log(ress);
        
    }),
    // Resend verification code
    resendVerifycode:asyncMiddleware( async (req,res,next)=>{
        var phone= req.body.phone;
        var isActivationCodeEmpty= await TBL_PROFILE.findOne({where: {phone: phone},
         attributes: ['member_id','activation_code']});
        var ress= isObjEmpty(isActivationCodeEmpty);
        if(ress==true)
        {
         let send_data = {success:false,status:400,message:"Phone number does not exsists."};
            // return res.json(send_data);
             res.status(400).json(send_data);
        }
        else
        {
         let send_data = {success:true,status:200,message:"Verification code has been successfully sent to ("+phone+").",activation_code:isActivationCodeEmpty.activation_code};
            // return res.json(send_data);
             res.status(200).json(send_data);
        }
    }),
    //forget password
    forgotPassword : asyncMiddleware( async(req,res,next)=>{
        let Email = req.body.email;
        var link = "https://google.com";
        var isEmailExsists= await TBL_USER.findOne({where: {email: Email},
            attributes: ['member_id','password','email','user_role']});
            var ress= isObjEmpty(isEmailExsists);
        if(ress==true)
        {
            let send_data = {success:false,status:400,message:"Email does not exsists."};
            res.status(400).json(send_data);
        }
        else
        {
            var randomPass=Math.floor(Math.random() * 100000000); 
            var hashPassword = await bcrypt.hash(randomPass.toString(),8);
            this.UserObj = isEmailExsists;     
            var memberId=this.UserObj.member_id;   
            var userMaster={password:hashPassword};
            var data= await TBL_USER.update(userMaster,{where:{member_id:memberId}});  
            var hashids = new Hashids("mySalt",16);
            var id = hashids.encode(this.UserObj.member_id);
            
            
        //     await res.render('forgotpass', {
        //         name: req.body.first_name,
        //         email: Email,
        //         randomPass:randomPass
        //       }, async (err, html) => {
        //         if (err) {
        //           return res.status(500).json({ error: err });
        //         }
        //         console.log(html);
        //         //var mail = Helper.commen.sendMail(Email, "You can login with password ("+randomPass+").", html);
        //         let send_data = {success:true,status:200,message:"Recovery email has been sent to ("+Email+")."};
        //         res.status(200).json(send_data);
        // });
        let send_data = {success:true,status:200,message:"Recovery email has been sent to ("+Email+")."};
                res.status(200).json(send_data);
    }
            
       
    }),
    //Update my account
    //forget password
    updateMyaccount : asyncMiddleware( async(req,res,next)=>{
        var memberId=req.user.member_id;
        let phone = req.body.phone;
        var newPass=req.body.new_password; 
        var oldPass=req.body.old_password; 
        var hashPasswordOld = await bcrypt.hash(oldPass.toString(),8);
        var hashPassword = await bcrypt.hash(newPass.toString(),8);
        var userMaster={password:hashPassword};
        var userProf={phone:phone}
        var isEmailExsists= await TBL_USER.findOne({where: {member_id: memberId},
            attributes: ['member_id','password','email','user_role']});
        var PassfromDb=isEmailExsists.password;
        var comaprePass=await  bcrypt.compare(oldPass,PassfromDb,async(err,isMatch)=>{
           if(err)
           {
             let send_data = {success:false,status:400,message:"Something Went Wrong", error:err};
                     res.status(400).json(send_data);
             //return ReE(res,400,"Something Went Wrong",err)
           }
           if(isMatch){ 
            var data= await TBL_USER.update(userMaster,{where:{member_id:memberId}});
            var memberProfile= await TBL_PROFILE.update(userProf,{where:{member_id:memberId}});
            let send_data = {success:true,status:200,message:"Your account details has been updated successfully."};
            res.status(200).json(send_data);
           }
           else
           {
             //ReE(res,400,"Password not match");
             let send_data = {success:false,status:400,message:"Password is not matched"};
             res.status(400).json(send_data);

           }
       });



       
            
       
    }),
    //customer support
    customerSupport : asyncMiddleware( async(req,res,next)=>{
        var memberId=req.user.member_id;
        let name = req.body.name;
        var email=req.body.email; 
        var subject=req.body.subject;
        var message=req.body.message;  
        var custSupprt={
            member_id : memberId,
            email : email,
            name : name,
            subject : subject,
            message : message
             };
        var cust_supp = await TBL_CUSTSPRT.create(custSupprt);
        var send_data={success:true,status:201,message:"Your request has been submitted to our customer support."};  
        res.status(201).json(send_data);
    }),
    logout : asyncMiddleware( async(req,res,next)=>{
        var memberId=req.body.member_id;
        var userLog={
            device_token : "",
            device_type : ""
             };
        var logout= await TBL_PROFILE.update(userLog,{where:{member_id:member_id}});
        var send_data={success:true,status:200,message:"You logged out successfully."};  
        res.status(201).json(send_data);
    }),
    //Reset password
    resetPassword : function(req,res,next){
        member_id = req.params.id;
        newPassword = req.body.password;

       var hashids = new Hashids("mySalt",16);
       var decodeParam =  hashids.decode(member_id);

        if(Object.keys(decodeParam).length===0){
           return ReE(res,400,"this link is invalid");
        }else{
            TBL_USER.findOne({where: {member_id: decodeParam}})
            .then((user) => {
               oldPassword = user.password;
               hashNewPassword =  bcrypt.hash(newPassword,8);
                
               user.update({password:hashNewPassword})
               .then((response)=>{
              return Res(res,200,"Password updated successfully");
               })
               .catch((err) => {
               return ReE(res,400,"something went wrong , Please try again");
               });
            })
            .catch((error) => {
              return ReE(res,400,"User not found");
            });
        }
    },
    //User status Activate
    userActivate : asyncMiddleware( async(req,res,next)=>{
        let member_id = req.params.id;
        var UserData = {            
            account_status :1
        };
        var getUserData= await TBL_USER.findOne({where: {member_id: member_id},
            attributes: ['email','user_role']});
            this.UserObj = getUserData;
            var Email=this.UserObj.email;
            var data= await TBL_USER.update(UserData,{where:{member_id:member_id}});
         
            let mailOptions = {
                from: 'no-reply@staging-host.com', // sender address
                to: 'ranasp10@gmail.com,' +Email, // list of receivers
                subject: 'Your User Account is activated successfully!', // Subject line
                text: " ", // plain text body
                html: 'Your User Account is activated successfully!', // html body
            };
            // mailer.transporter.sendMail(mailOptions, (error, info) => {
            //     if (error) {console.log(error); }
            //    return ReS(res,200,"Mail sent on requested email");
            // });
            //return ReS(res,200,"Success!,Mail sent on requested email");            
            var send_data={success:true,status:200,message:"Success!,User account activated successfully"};
            res.status(200).json(send_data);
       
    }),
    //User status DeActivate
    userDeactivate : asyncMiddleware( async(req,res,next)=>{
        let member_id = req.params.id;
        var UserData = {            
            account_status :0
        };
        var getUserData= await TBL_USER.findOne({where: {member_id: member_id},
            attributes: ['email','user_role']});
            this.UserObj = getUserData;
            var Email=this.UserObj.email;
            var data= await TBL_USER.update(UserData,{where:{member_id:member_id}});
         
            let mailOptions = {
                from: 'no-reply@staging-host.com', // sender address
                to: 'ranasp10@gmail.com,' +Email, // list of receivers
                subject: 'Your User Account is Deactivated successfully!', // Subject line
                text: " ", // plain text body
                html: 'Your User Account is Deactivated successfully!', // html body
            };
            // mailer.transporter.sendMail(mailOptions, (error, info) => {
            //     if (error) {console.log(error); }
            //    return ReS(res,200,"Mail sent on requested email");
            // });
            var send_data={success:true,status:200,message:"Success!,User account deactivated successfully"};
            res.status(200).json(send_data);
       
    }),
    //kyc status Activate
    kycActivate : asyncMiddleware( async(req,res,next)=>{
        let member_id = req.params.id;
        var KycUpdateData = {            
            kyc_status :1
        };
        var getUserData= await TBL_USER.findOne({where: {member_id: member_id},
            attributes: ['email','user_role']});
            this.UserObj = getUserData;
            var Email=this.UserObj.email;
            var data= await TBL_USER.update(KycUpdateData,{where:{member_id:member_id}});
         
            let mailOptions = {
                from: 'no-reply@staging-host.com', // sender address
                to: 'ranasp10@gmail.com,' +Email, // list of receivers
                subject: 'Your KYC Account is activated successfully!', // Subject line
                text: " ", // plain text body
                html: 'Your KYC Account is activated successfully!', // html body
            };
            // mailer.transporter.sendMail(mailOptions, (error, info) => {
            //     if (error) {console.log(error); }
            //    return ReS(res,200,"Mail sent on requested email");
            // });
           // return ReS(res,200,"Success!,Mail sent on requested email");
            var send_data={success:true,status:200,message:"Success!,User Kyc account activated successfully"};
            res.status(200).json(send_data);
       
    }),
    //kyc status DeActivate
    kycDeactivate : asyncMiddleware( async(req,res,next)=>{
        let member_id = req.params.id;
        var KycUpdateData = {            
            kyc_status :0
        };
        var getUserData= await TBL_USER.findOne({where: {member_id: member_id},
            attributes: ['email','user_role']});
            this.UserObj = getUserData;
            var Email=this.UserObj.email;
            var data= await TBL_USER.update(KycUpdateData,{where:{member_id:member_id}});
         
            let mailOptions = {
                from: 'no-reply@staging-host.com', // sender address
                to: 'ranasp10@gmail.com,' +Email, // list of receivers
                subject: 'Your KYC Account is Deactivated successfully!', // Subject line
                text: " ", // plain text body
                html: 'Your KYC Account is Deactivated successfully!', // html body
            };
            // mailer.transporter.sendMail(mailOptions, (error, info) => {
            //     if (error) {console.log(error); }
            //    return ReS(res,200,"Mail sent on requested email");
            // });
            //return ReS(res,200,"Success!Mail sent on requested email");
            var send_data={success:true,status:200,message:"Success!,User Kyc account deactivated successfully"};
            res.status(200).json(send_data);
       
    }),
    //kyc status DeActivate
    userListing : asyncMiddleware( async(req,res,next)=>{
        let offset = (req.params.id-1) *10
        TBL_USER.findAll({
            offset : offset,
            limit : 10
        })
        .then((response) => {
            //returnOP.success(res,200,"succesfully get Users", response);
            var send_data={success:true,status:200,message:"succesfully get Users",data:response};
            res.status(200).json(send_data);
        })
        .catch((err) => {
            //returnOP.fail(res,500,"Something went wrong, please try again",err);
            var send_data={success:false,status:500,message:"Something went wrong, please try again",error:err};
            res.status(500).json(send_data);
        })
       
    }),
    

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

module.exports = usersController;