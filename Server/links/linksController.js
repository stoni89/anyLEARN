var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var links = require('./links');

// Alle User aus der Datenbank holen
router.get('/', function (req, res) {
    links.getAllLinks(function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});

router.get('/:skill_id', function (req, res) {
  const skill_id = req.params.skill_id;
  links.getSpezificLinks(skill_id, function(err,rows){
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
  links.newLink(req.body, function(err,rows){
      if(err) {
          res.status(400).json(err);
      }
      else
      {
          res.json(rows);
      }
  });
});

router.delete('/:skilllink_id', function (req, res) {
  const skilllink_id = req.params.skilllink_id;
  links.removeLink(skilllink_id, function(err,rows){
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
