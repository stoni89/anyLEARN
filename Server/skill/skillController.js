var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var skill = require('./skill');

// Alle User aus der Datenbank holen
router.get('/', function (req, res) {
    skill.getAllSkills(function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});

router.get('/max', function (req, res) {
  skill.getMaxSkillID(function(err,rows){
      if(err) {
          res.status(400).json(err);
      }
      else
      {
          res.json(rows);
      }
  });
});

// Alle User formatiert holen
router.get('/:skill_id', function (req, res) {
  const skill_id = req.params.skill_id;
  skill.getSpezificSkill(skill_id, function(err,rows){
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
  skill.newSkill(req.body, function(err,rows){
      if(err) {
          res.status(400).json(err);
      }
      else
      {
          res.json(rows);
      }
  });
});

router.put('/', function (req, res) {
  skill.updateSkill(req.body, function(err,rows){
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
  skill.removeSkill(skill_id, function(err,rows){
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
