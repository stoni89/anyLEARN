var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var user = require('./user');

// Alle User aus der Datenbank holen
router.get('/', function (req, res) {
    user.getAllUser(function(err,rows){
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
router.get('/:user_id', function (req, res) {
  const user_id = req.params.user_id;
  user.getSpezificUser(user_id, function(err,rows){
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
  user.newUser(req.body, function(err,rows){
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
