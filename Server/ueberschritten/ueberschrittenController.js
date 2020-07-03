var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var ueberschritten = require('./ueberschritten');

router.put('/start', function (req, res) {
  ueberschritten.setUeberschrittenStart(function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});

router.put('/end', function (req, res) {
  ueberschritten.setUeberschrittenEnd(function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});

router.put('/start/false', function (req, res) {
  ueberschritten.setUeberschrittenStartFalse(function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});

router.put('/end/false', function (req, res) {
  ueberschritten.setUeberschrittenEndFalse(function(err,rows){
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
