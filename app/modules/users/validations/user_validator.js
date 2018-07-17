var user = {
    register : function(req,res,next){
        // req.checkBody('name').notEmpty().withMessage('Name is required.')
        //                         .isLength({min:3,max:45}).withMessage('Name should be at least 3 characters but not more than 45.');

        // req.checkBody('username').notEmpty().withMessage('Username is required.')
        //                         .isLength({min:3,max:15}).withMessage('Username should be at least 3 characters but not more than 15.')
        //                         .isUnique('username').withMessage('This username is not available.');

        req.checkBody('email').notEmpty().withMessage('email is required.')
                            .isEmail().withMessage('email format is not valid.')
                            .isUnique('email').withMessage('Email already in use.');

        req.checkBody('password').notEmpty().withMessage('Password is required.')
        .isLength({min:5,max:15}).withMessage('Password should be at least 5 characters but not more than 15.');

        req.getValidationResult().then(function(result){
            var errorArr = [];
            if (result.isEmpty() === false) {
                result.array().forEach((error) => {
                    errorArr.push(error.msg);
                    let send_data = {success:false,status:400,message:error.msg};
                    res.status(400).json(send_data);
                });
                
               //res.status(401).json({ message: errorArr });
            }else{
                next();
            }
        });
        const unhandledRejections = new Map();
        process.on('unhandledRejection', (reason, p) => {
            unhandledRejections.set(p, reason);
        });
        process.on('rejectionHandled', (p) => {
            unhandledRejections.delete(p);
        });
    },
    login : function(req,res,next){
        req.checkBody('email').notEmpty().withMessage('email is required.')
            .isEmail().withMessage('email format is not valid.');
        
        req.checkBody('password').notEmpty().withMessage('Password is required.')
            .isLength({min:5,max:15}).withMessage('Password should be at least 5 characters but not more than 15.');
        req.getValidationResult().then(function(result){
            var errorArr = [];
            if (result.isEmpty() === false) {
                result.array().forEach((error) => {
                    errorArr.push(error.msg);
                    let send_data = {success:false,status:400,message:error.msg};
                    res.status(400).json(send_data);
                });
               // let send_data = {success:false,status:400,message:"Input validation Error",error:errorArr};
                //return res.json(send_data);
                
            }else{
                next();
            }
        });
        const unhandledRejections = new Map();
        process.on('unhandledRejection', (reason, p) => {
            unhandledRejections.set(p, reason);
        });
        process.on('rejectionHandled', (p) => {
            unhandledRejections.delete(p);
        });
    },
    verifycode : function(req,res,next){
       
        req.checkBody('code').notEmpty().withMessage('Code is required.');
            
        req.getValidationResult().then(function(result){
            var errorArr = [];
            if (result.isEmpty() === false) {
                result.array().forEach((error) => {
                    errorArr.push(error.msg);
                    let send_data = {success:false,status:400,message:error.msg};
                    res.status(400).json(send_data);
                });
               // let send_data = {success:false,status:400,message:"Input validation Error",error:errorArr};
                //return res.json(send_data);
                
            }else{
                next();
            }
        });
        const unhandledRejections = new Map();
        process.on('unhandledRejection', (reason, p) => {
            unhandledRejections.set(p, reason);
        });
        process.on('rejectionHandled', (p) => {
            unhandledRejections.delete(p);
        });
    },
    resendverifycode: function(req,res,next){
       
        req.checkBody('phone').notEmpty().withMessage('Phone is required.');
            
        req.getValidationResult().then(function(result){
            var errorArr = [];
            if (result.isEmpty() === false) {
                result.array().forEach((error) => {
                    errorArr.push(error.msg);
                    let send_data = {success:false,status:400,message:error.msg};
                    res.status(400).json(send_data);
                });
                
            }else{
                next();
            }
        });
        const unhandledRejections = new Map();
        process.on('unhandledRejection', (reason, p) => {
            unhandledRejections.set(p, reason);
        });
        process.on('rejectionHandled', (p) => {
            unhandledRejections.delete(p);
        });
    },
    kyc: function(req,res,next){
        req.checkBody('first_name').notEmpty().withMessage('First Name is required.');
        req.checkBody('last_name').notEmpty().withMessage('Last Name is required.');
        req.checkBody('phone').notEmpty().withMessage('Phone is required.')
        .isLength({min:10,max:10}).withMessage('Phone should have 10 characters.');
        req.checkBody('gender').notEmpty().withMessage('Gender is required.');
        req.checkBody('birth_date').notEmpty().withMessage('Birth Date is required.');
        req.checkBody('birth_month').notEmpty().withMessage('Birth Month is required.');
        req.checkBody('birth_year').notEmpty().withMessage('Birth Year is required.');
        req.checkBody('doc_type').notEmpty().withMessage('Doc Type is required.');
        req.checkBody('doc_number').notEmpty().withMessage('Doc Number is required.');
        req.checkBody('p_res_type').notEmpty().withMessage('Permanent residence type is required.');
        req.getValidationResult().then(function(result){
            var errorArr = [];
            if (result.isEmpty() === false) {
                result.array().forEach((error) => {
                    errorArr.push(error.msg);
                });
                let send_data = {success:false,status:400,message:"Input validation Error",error:errorArr};
                res.status(400).json(send_data);
            }else{
                next();
            }
        });
        const unhandledRejections = new Map();
        process.on('unhandledRejection', (reason, p) => {
            unhandledRejections.set(p, reason);
        });
        process.on('rejectionHandled', (p) => {
            unhandledRejections.delete(p);
        });
    },
    forgotpassword: function(req,res,next){
        req.checkBody('email').notEmpty().withMessage('email is required.')
                            .isEmail().withMessage('email format is not valid.');
            
        req.getValidationResult().then(function(result){
            var errorArr = [];
            if (result.isEmpty() === false) {
                result.array().forEach((error) => {
                    errorArr.push(error.msg);
                    let send_data = {success:false,status:400,message:error.msg};
                    res.status(400).json(send_data);
                    
                });
               // let send_data = {success:false,status:400,message:"Input validation Error",error:errorArr};
                //return res.json(send_data);
                
            }else{
                next();
            }
        });
        const unhandledRejections = new Map();
        process.on('unhandledRejection', (reason, p) => {
            unhandledRejections.set(p, reason);
        });
        process.on('rejectionHandled', (p) => {
            unhandledRejections.delete(p);
        });
    },
    customersupport :function(req,res,next){
        
        req.checkBody('name').notEmpty().withMessage('Name is required.');
        req.checkBody('email').notEmpty().withMessage('email is required.')
                            .isEmail().withMessage('email format is not valid.');
        req.checkBody('subject').notEmpty().withMessage('Subject is required.');
        req.checkBody('message').notEmpty().withMessage('Message is required.'); 
        req.getValidationResult().then(function(result){
            var errorArr = [];
            if (result.isEmpty() === false) {
                result.array().forEach((error) => {
                    errorArr.push(error.msg);
                    let send_data = {success:false,status:400,message:error.msg};
                    res.status(400).json(send_data);
                    
                });
               // let send_data = {success:false,status:400,message:"Input validation Error",error:errorArr};
                //return res.json(send_data);
                
            }else{
                next();
            }
        });
        const unhandledRejections = new Map();
        process.on('unhandledRejection', (reason, p) => {
            unhandledRejections.set(p, reason);
        });
        process.on('rejectionHandled', (p) => {
            unhandledRejections.delete(p);
        });
    },
}
module.exports = user; 