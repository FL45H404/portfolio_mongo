require('dotenv').config()
// const db = require('../db')
const nodemailer = require('nodemailer')
const ejs = require('ejs');

exports.send = async (req, res) => {
  try {
    var transporter = await nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_ID,//user-email
        pass: process.env.MAIL_PASSWORD,//user-password
      }
    });
    const data = [req.body.name,
    req.body.email,
    req.body.number,
    req.body.message,
    new Date()]
    // await db.query("INSERT INTO contact (name,email,number,message,date) VALUES (?,?,?,?,?)", data, (err, result) => {  
      // if (err) return res.send(err)

      ejs.renderFile("views/mailTemplate.ejs", { name: req.body.name, email: req.body.email, number: req.body.number, message: req.body.message }, function (err, data) {
        if (err) {
          console.log(err)
        }
        else {
          var mailOptions = {
            from: process.env.MAIL_ID,
            to: process.env.MAIL_TO,//reciver email
            subject: 'contact',
            html: data
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        }
      });
      return res.render('contact', { message: 'message sent successfully!' })
    // })
  } catch (err) {
    res.send(err)

  }
}