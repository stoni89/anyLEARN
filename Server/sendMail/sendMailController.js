var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var sendMail = require('./sendMail');

router.post('/', function (req, res) {
  sendMail.sendmail(req.body, function(err,rows){
      if(err) {
          res.status(400).json(err);
      }
      else
      {
          res.json(rows);
      }
  });
});



module.exports = router;
