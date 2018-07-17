require('./globalfunctions');// For response functions

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');// by using this can access from any server 
const path = require('path');
const passport = require('passport');
const expressValidator = require('express-validator');
var db = require('./config/db');
//User = db.connection.define('users');
var fs = require('fs');
var fileUpload = require('express-fileupload');
var url = require('url');
var app = express();
var mongoose = require('mongoose');

//var routes = require('./routes/route');
var userRoute = require('./app/modules/users/userRoute');
var walletRoute = require('./app/modules/wallet/walletRoute');
console.log(process.env.PORT);
const PORT = process.env.PORT || 3000;

// middlewares 
//middleware for cors (cross origin requests)
app.use(cors()); 

//passport jwt integeration
app.use(passport.initialize());
app.use(passport.session());
require('./middlewares/passport')(passport);
app.use(fileUpload())
//body parser

app.use(bodyparser.json({limit: "50mb"}));
app.use(bodyparser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(expressValidator());

mongoose.Promise = global.Promise;
// {user: 'admin', pass: 'admin123'}
mongoose.connect(`mongodb://${db.mongo.host}/${db.mongo.db}`);
global.__basedir = __dirname;

// views load
//app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

//routes
app.use('/api/user',userRoute);

app.use('/api/v1/wallet',walletRoute);



app.get('/',(req,res)=>{
    res.send('new changes');
});

app.get('/public/uploads/:name',(req,res,next) => {
    var filePath = req.params.name;
 
    fs.readFile('./public/uploads/'+filePath,(err,data) => {
     if(err){
       return res.send('file not found');
     }
     return res.sendFile('/public/uploads/'+filePath, {"root": '.'} );
    });  
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

