var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var mit = require('./mitteilung');

// Alle User aus der Datenbank holen
router.get('/:user_Id', function (req, res) {
  const user_id = req.params.user_Id;
  mit.getMit(user_id, function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});

router.get('/count/:user_Id', function (req, res) {
  const user_id = req.params.user_Id;
  mit.getMitCount(user_id, function(err,rows){
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
