'use strict';
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: { 
        user: "AKIAJGMFHMEJ6BPPKXQA", // generated ethereal user
        pass: "Ah/h1w0Q3+8mmFQfoXnhKgGu3nf2YkPW+LWrXjwE9h2q"  // generated ethereal password
    }
});

transporter.verify(function(error, success) {
    if (error) {
       //  console.log(error);
    } else {
         //console.log('Server is ready to take our messages');
    }
 });


module.exports.transporter = transporter;