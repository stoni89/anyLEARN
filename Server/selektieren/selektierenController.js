var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var select = require('./selektieren');


router.get('/:user_id', function (req, res) {
  const user_id = req.params.user_id;
  select.getSelectUserID(user_id, function(err,rows){
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
