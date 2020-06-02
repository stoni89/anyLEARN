var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var select = require('./selektieren');


router.get('/', function (req, res) {
  select.getSelectUserID(req.body, function(err,rows){
    console.log(res)
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
