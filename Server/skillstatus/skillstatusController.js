var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var sst = require('./skillstatus');


router.post('/', function (req, res) {
  sst.newSkillStatus(req.body, function(err,rows){
      if(err) {
          res.status(400).json(err);
      }
      else
      {
          res.json(rows);
      }
  });
});

router.get('/:user_id', function (req, res) {
  const user_id = req.params.user_id;
  sst.getSkillTableUser(user_id, function(err,rows){
      if(err) {
          res.status(400).json(err);
      }
      else
      {
          res.json(rows);
      }
  });
});

router.get('/countoffen/:user_id', function (req, res) {
  const user_id = req.params.user_id;
  sst.getSkillStatusCountOffen(user_id, function(err,rows){
      if(err) {
          res.status(400).json(err);
      }
      else
      {
          res.json(rows);
      }
  });
});

router.get('/countbearbeitung/:user_id', function (req, res) {
  const user_id = req.params.user_id;
  sst.getSkillStatusCountBearbeitung(user_id, function(err,rows){
      if(err) {
          res.status(400).json(err);
      }
      else
      {
          res.json(rows);
      }
  });
});

router.get('/counterledigt/:user_id', function (req, res) {
  const user_id = req.params.user_id;
  sst.getSkillStatusCountErledigt(user_id, function(err,rows){
      if(err) {
          res.status(400).json(err);
      }
      else
      {
          res.json(rows);
      }
  });
});

router.get('/countgesamt/:user_id', function (req, res) {
  const user_id = req.params.user_id;
  sst.getSkillStatusCountGesamt(user_id, function(err,rows){
      if(err) {
          res.status(400).json(err);
      }
      else
      {
          res.json(rows);
      }
  });
});

router.get('/useroffen/:skill_id', function (req, res) {
  const skill_id = req.params.skill_id;
  sst.getSkillStatusUsersOffen(skill_id, function(err,rows){
      if(err) {
          res.status(400).json(err);
      }
      else
      {
          res.json(rows);
      }
  });
});

router.get('/userbearbeitung/:skill_id', function (req, res) {
  const skill_id = req.params.skill_id;
  sst.getSkillStatusUsersBearbeitung(skill_id, function(err,rows){
      if(err) {
          res.status(400).json(err);
      }
      else
      {
          res.json(rows);
      }
  });
});

router.get('/usergenehmigung/:skill_id', function (req, res) {
  const skill_id = req.params.skill_id;
  sst.getSkillStatusUsersBearbeitungGen(skill_id, function(err,rows){
      if(err) {
          res.status(400).json(err);
      }
      else
      {
          res.json(rows);
      }
  });
});

router.get('/usererledigt/:skill_id', function (req, res) {
  const skill_id = req.params.skill_id;
  sst.getSkillStatusUsersErledigt(skill_id, function(err,rows){
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
  sst.updateSkillStatus(req.body, function(err,rows){
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
  sst.removeSkillStatus(skill_id, function(err,rows){
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
