var db = require('../db');

var vermittler = {
  updateVermittlerSkillStatus: function(postdata, callback)
  {
    return db.query('UPDATE skillstatus SET vermittler_id=? ' +
                    'WHERE status_id = 1 && skill_id = ?', [postdata.vermittler_id, postdata.skill_id], callback)
  }
}

module.exports = vermittler;
