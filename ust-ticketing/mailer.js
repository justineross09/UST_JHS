//import nodemailer from 'nodemailer';
/**const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
  host: "SMTPConnection.gmail.com",
  port: 587,
  secure: false,
  auth:{
    user: "ustjhscapstone@gmail.com",
    pass: "RuntimeTerror1611!",
  },
  tls:{
    rejectUnauthorized:false
  }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"UST JHS" <ustjhscapstone@gmail.com>', // sender address
    to: 'hernandezjai17@gmail.com', // list of receivers
    subject: 'Tang ina mo Jai', // Subject line
    text: 'Hello world?', // plain text body
    html: output, // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    } 
    console.log('Message sent: %s', info.messageId);   
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    
});
alert('Emails Sent');











///const transporter = require('./pages');
/**module.exports = function sendEmail(){
    transporter.sendMail({
      from: `"JHS BUILDING" <ustjhscapstone@gmail.com>`,
      to: "hernandezjai17@gmail.com",
      subject: "tang ina mo",
      html: "<h1> pakyu </h1>"
    }).then(console.info)
    .catch(console.catch);
    alert('Emails Sent');
  };**/

 