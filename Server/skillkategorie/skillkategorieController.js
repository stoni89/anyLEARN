var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var sk = require('./skillkategorie');

// Alle User aus der Datenbank holen
router.get('/:skill_id', function (req, res) {
  const skill_id = req.params.skill_id;
  sk.getSpezificSkillKategorie(skill_id, function(err,rows){
      if(err) {
          res.status(400).json(err);
      }
      else
      {
          res.json(rows);
      }
  });
});

router.post('/', function (req, res) {
  sk.newSkillKategorie(req.body, function(err,rows){
      if(err) {
          res.status(400).json(err);
      }
      else
      {
          res.json(rows);
      }
  });
});

router.delete('/:skill_id', function (req, res) {
  const skill_id = req.params.skill_id;
  sk.removeSkillKategorie(skill_id, function(err,rows){
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
