var db = require('../db');

var sst = {
  newSkillStatus: function(postdata, callback)
  {
    return db.query('INSERT INTO skillstatus (skill_id, user_id, status_id) ' +
                    'values(?,?,?)', [postdata.skill_id, postdata.user_id, postdata.status_id], callback)
  }
}

module.exports = sst;
