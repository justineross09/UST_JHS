const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const AdminRoutes = require('./routes/admin');
const RequestFormRoutes = require('./routes/requestForm');
const nodemailer = require('nodemailer');


const app = express();
app.use(express.json({ limit: '50mb' }));

app.use(cors());

app.use('/api/admin', AdminRoutes);
app.use('/api/requestForm', RequestFormRoutes);
app.route('/get').get((req, res) => {
  res.send('das');
});



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

let mailOptions = {
  from: '"UST JHS" <ustjhscapstone@gmail.com>', // sender address
  to: 'hernandezjai17@gmail.com', // list of receivers
  subject: 'Tang ina mo Jai', // Subject line
  text: 'Hello world?', // plain text body
  
};


module.exports.sendMail  = function()
{
 // send mail with defined transport object
 transporter.sendMail(mailOptions, (error, info) => {
    if (error)
    {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);});
}



app.post('/send', (req, res) => {
 
  // create reusable transporter object using the default SMTP transport
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
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      } 
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      
  });
   res.alert('Emails Sent');
  }); 





app.listen(5000, () => {
  mongoose
    .connect(
      'mongodb+srv://ustjhs:ustjhs@cluster0.1kr0tya.mongodb.net/?retryWrites=true&w=majority',
    )
    .then(() => console.log('DB connection established'));
  console.log(`App running on port 5000`);
});

