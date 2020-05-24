var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var rollen = require('./rollen');

// Alle User aus der Datenbank holen
router.get('/', function (req, res) {
    rollen.getAllRollen(function(err,rows){
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
