var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var zeitpunkt = require('./zeitpunkt');

// Alle User aus der Datenbank holen
router.get('/', function (req, res) {
    zeitpunkt.getAllZeitpunkt(function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});

router.get('/endzeitpunkt', function (req, res) {
  zeitpunkt.getAllEndZeitpunkt(function(err,rows){
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
