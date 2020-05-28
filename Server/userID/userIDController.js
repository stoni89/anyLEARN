var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var userID = require('./userID');

// Alle User aus der Datenbank holen
router.get('/:nachname', function (req, res) {
  const nachname = req.params.nachname;
  userID.getuserID(nachname, function(err,rows){
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
