var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var sst = require('./skillstatus');


router.post('/', function (req, res) {
  sst.newSkillStatus(req.body, function(err,rows){
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
