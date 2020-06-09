var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
const nodemailer = require('nodemailer');

router.get('/', (req, res) => {

  res.send('api works');

});

router.post('/', (req, res) => {
  console.log(req);
  console.log(res);
  var smtpConfig = {
      host: 'anyware-ag.mail.protection.outlook.com',
      port: 465,
      secure: true,
      auth: {
        user: 'js@anyware.ag',
        pass: 'js1234##'
    }
  }

  var transporter = nodemailer.createTransport(smtpConfig);

  var mailOptions = {
      from: 'email',
      to: 'email',
      subject: 'Test',
      text: 'test'
  };

  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
});

module.exports = router;
