var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var vermittler = require('./vermittler');


router.put('/', function (req, res) {
  vermittler.updateVermittlerSkillStatus(req.body, function(err,rows){
      if(err) {
          res.status(400).json(err);
      }
      else
      {
          res.json(rows);
      }
  });
});

router.put('/vermittler', function (req, res) {
  vermittler.updateSkillStatusVermittler(req.body, function(err,rows){
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
