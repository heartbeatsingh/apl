var db = require('../../../../config/db');


var validator = {

    rules : (req,res,next) => {  
        //console.log(req.body);  
        
        /*if(req.method == "POST"){
            var obj = {};
            var ers = [];
            if(req.body.team_name.length <= 0){
                obj["team_name"] = 'Team name is required.';        
            }
            if(req.body.manager_name.length <= 0){
                obj["manager_name"] = 'Manager name is required.';
                req.flash('error', {manager_name: 'Manager name is required.'});
            }

            if(Object.keys(obj).length){ 
                ers.push(obj);
                return res.redirect("/admin/teams");
            }  
        }*/

    return next(); 
    }
}


module.exports = validator;