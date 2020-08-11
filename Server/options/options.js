var db = require('../db');

var options = {
    getuserOptions: function(id, callback)
    {
        return db.query('SELECT * FROM options WHERE user_id = ' + id, callback);
    },
    setUserMailOptions: function(postdata, callback)
    {
      return db.query('UPDATE options SET mail_setting=? WHERE user_id=?', [postdata.mail_setting, postdata.user_id], callback)
    },
}

module.exports = options;
