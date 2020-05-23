var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var kategorie = require('./kategorie');

// Alle User aus der Datenbank holen
router.get('/', function (req, res) {
    kategorie.getAllKategorie(function(err,rows){
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
