var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
const nodemailer = require('nodemailer');


router.post('/', (req, res) => {
  let user = req.body;
  sendMail(user, info => {
    console.log('The Mail has been send!')
    res.send(info);
  });
});

async function sendMail(user, callback) {
  let transporter = nodemailer.createTransport({
    host: 'anyware-ag.mail.protection.outlook.com',
    port: 465,
    secure: false
  });

  var mailOptions = {
    from: user.email,
    to: user.email,
    subject: 'Test',
    text: 'test'
  };

  let info = await transporter.sendMail(mailOptions);

  callback(info);
}



module.exports = router;
