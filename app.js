//require('./globalfunctions');// For response functions

const express = require('express');
const bodyparser = require('body-parser');
var session = require('express-session'),
cookieParser = require('cookie-parser'),
flash = require('connect-flash');
var fu = require('express-fileupload');
var db = require('./config/db');
var fs = require('fs');
var app = express();
const PORT = process.env.PORT || 3001;
var path = require('path');
const usrTbl = require('./app/modules/users/schemas/user');
const bcrypt = require('bcrypt');
var adminRoute = require('./app/modules/admin/adminRoute');
var cryptoRoute = require('./app/modules/crypto/cryptoRoute');
var auctionRoute = require('./app/modules/auctions/auctionRoute');
var methodOverride = require('method-override');

//var userRoute = require('./app/modules/users/userRoute');
//var walletRoute = require('./app/modules/wallet/walletRoute');
app.use(fu());
app.use(methodOverride('_method',{methods:['POST','GET']}));
//body parser
app.use(bodyparser.json({limit: "50mb"}));
app.use(bodyparser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

// views load
app.use(express.static('public'));
//flash
app.use(cookieParser());
app.use(session({
  secret: "TheGodIsInsideYouAndYouAreSearchingOutside", 
  cookie: { maxAge: 6000 },
  resave: false,    // forces the session to be saved back to the store
  saveUninitialized: false  // dont save unmodified
}));
app.use(flash());



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views/'));


//routes
app.use('/admin', adminRoute);
app.use('/crypto', cryptoRoute);
//app.use('/auctions', auctionRoute);
//app.use('/api/user',userRoute);
//app.use('/api/v1/wallet',walletRoute);



app.get('/',(req,res) => {
    var hash = bcrypt.hashSync('123456', 10);
    res.send(hash);
});

app.get('/apl',(req,res) => {
    res.render('admin',{errors: {}});
});


app.post('/apl',(req, res) => {

    //var pwd = bcrypt.compareSync(req.body.password, hash);
    usrTbl.findOne({ where: {email: req.body.email,status: 1,role:1} }).then(usr => {
        if(usr){
            //console.log(usr);
            bcrypt.compare(req.body.password, usr.password, function(err, pwd) {
                if(!err && pwd == true) {
                    req.session.isLoggedIn = true;
                    req.session.email = req.body.email;
                    req.session.role = 1;
                    req.session.userId = usr.id;
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

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect("/");
});



app.listen(PORT,()=>{
    console.log('server has been started at port'+ PORT);
});
module.exports.app = express;