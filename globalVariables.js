// const express = require('express');
// var apps = express();
// apps.locals.moment=require("moment");
// var currentDate=apps.locals.moment().format('YYYY-MM-DD H:m:s');
// module.exports.currentDate = currentDate;

var date = new Date();  
var crntDate = "";  
   crntDate += (date.getFullYear()) + "-";  
   crntDate += ((parseInt(date.getMonth())+1)<10?'0':'')+ (parseInt(date.getMonth())+1)+ "-";  
   crntDate += (date.getDate()<10?'0':'')+ date.getDate()+ " ";
   crntDate +=(date.getHours()<10?'0':'')+ date.getHours()+ ":"; 
   crntDate +=(date.getMinutes()<10?'0':'')+ date.getMinutes()+ ":"; 
   crntDate +=(date.getSeconds()<10?'0':'')+ date.getSeconds(); 
   module.exports.crntDate = crntDate;