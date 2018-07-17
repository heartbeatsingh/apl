var config = require("../config");
const striptags = require('striptags');
const nodemailer = require('nodemailer');


exports.commen = {
    
    sendMail: async (to, subject, body) => {
        // console.log(to, subject, body);
        let transporter = nodemailer.createTransport({
            host: config.smtp.host,
            port: config.smtp.port,
            secure: config.smtp.secure, // true for 465, false for other ports
            auth: {
                user: config.smtp.user, // generated ethereal user
                pass: config.smtp.pass // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: config.smtp.from, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: striptags(body), // plain text body
            html: body // html body
        };

        // send mail with defined transport object
        return await transporter.sendMail(mailOptions);
    }
} 