var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
const nodemailer = require('nodemailer');


router.post("/", (req, res) => {
  var transporter = nodemailer.createTransport({
      host: "anyware-ag.mail.protection.outlook.com",
      secureConnection: false,
      port: 587,
      tls: {
          chipers: "SSLv3"
      },
      auth: {
          user: "js@anyware.ag",
          pass: "js1234##"
      }
  });

  var mailOptions = {
      from: "xxx@hotmail.com",
      to: "xxx@gmail.com",
      subject: "Nodejs Mail",
      text: "this is the email's body text..."
  };

  transporter.sendMail(mailOptions, function(error, info) {
      if (error) console.log(error);
      else console.log("Message sent successfully: " + info.response);
  });
})



module.exports = router;
