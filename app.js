//require('./globalfunctions');// For response functions

const express = require('express');
const bodyparser = require('body-parser');

var db = require('./config/db');
var fs = require('fs');
var app = express();
const PORT = process.env.PORT || 3000;
var path = require('path');
var outsider = require('./app/modules/outsider/main');

//var userRoute = require('./app/modules/users/userRoute');
//var walletRoute = require('./app/modules/wallet/walletRoute');

//body parser
app.use(bodyparser.json({limit: "50mb"}));
app.use(bodyparser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

// views load
app.use(express.static('public'))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));


//routes
//app.use('/admin',outsider);
//app.use('/api/user',userRoute);
//app.use('/api/v1/wallet',walletRoute);



app.get('/',(req,res) => {
    res.send('new changes');
});

app.get('/admin',(req,res) => {
    res.render('admin');
});
app.post('/admin',(req,res) => {
    res.send('o hooo');
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

