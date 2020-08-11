var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var options = require('./options');

// Alle User aus der Datenbank holen
router.get('/:user_id', function (req, res) {
  const user_id = req.params.user_id;
  options.getuserOptions(user_id, function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});

router.put('/mailoption', function (req, res) {
  options.setUserMailOptions(req.body, function(err,rows){
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
