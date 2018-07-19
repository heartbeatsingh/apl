//require('./globalfunctions');// For response functions

const express = require('express');
const bodyparser = require('body-parser');

var db = require('./config/db');
var fs = require('fs');
var app = express();
const PORT = process.env.PORT || 3001;
var path = require('path');
const usrTbl = require('./app/modules/users/schemas/userSchema');
const bcrypt = require('bcrypt');
var adminRoute = require('./app/modules/admin/adminRoute');
//var userRoute = require('./app/modules/users/userRoute');
//var walletRoute = require('./app/modules/wallet/walletRoute');

//body parser
app.use(bodyparser.json({limit: "50mb"}));
app.use(bodyparser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

// views load
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views/'));


//routes
app.use('/admin', adminRoute);
//app.use('/api/user',userRoute);
//app.use('/api/v1/wallet',walletRoute);



app.get('/',(req,res) => {
    var hash = bcrypt.hashSync('123456', 10);
    res.send(hash);
});

app.get('/admin',(req,res) => {
    res.render('admin',{errors: {}});
});

app.post('/admin',(req, res) => {

    //var pwd = bcrypt.compareSync(req.body.password, hash);
    usrTbl.findOne({ where: {email: req.body.email,status: 1,role:1} }).then(usr => {
        if(usr){
            console.log(usr);
            bcrypt.compare(req.body.password, usr.password, function(err, pwd) {
                if(!err && pwd == true) {
                    res.redirect('/admin/dashboard');
                } else {
                    res.render('admin',{errors:{password:'Invalid password'}});
                } 
            });
        }else{
            res.render('admin',{errors:{email:'Invalid email'}});
        }        
      })
   // res.send(pwd);
});


app.use(function (err, req, res, next) {
    console.log("In error section");
    var status = 500;
    if (err.name == 'ValidationError') {
        status = 400;
    } else if (err.name == 'CastError') {
        status = 404;
    }
    console.log(err);
    console.log("error");
    res.status(status).json({ error: err })
})

app.listen(PORT,()=>{
    console.log('server has been started at port'+ PORT);
});
module.exports.app = express;

