var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var skillID = require('./skillID');

// Alle User aus der Datenbank holen
router.get('/:skill', function (req, res) {
  const skill = req.params.skill;
  skillID.getskillID(skill, function(err,rows){
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
