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

router.get('/:user_id', function (req, res) {
  const user_id = req.params.user_id;
  sst.getSkillTableUser(user_id, function(err,rows){
      if(err) {
          res.status(400).json(err);
      }
      else
      {
          res.json(rows);
      }
  });
});

router.put('/', function (req, res) {
  sst.updateSkillStatus(req.body, function(err,rows){
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
