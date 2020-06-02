var db = require('../db');

var log = {
    getLogs: function(callback)
    {
        return db.query('SELECT  l.log_id, l.eintrag, l.date, l.user_Id, l.art, l.cat_id, lc.cat, u.nachname ' +
                        'FROM logs l ' +
                        'INNER JOIN logcat lc ON (lc.logcat_id = l.cat_id) ' +
                        'INNER JOIN users u ON (u.user_id = l.user_id) ' +
                        'ORDER BY l.date DESC', callback);
    },
    newLog: function(postdata, callback)
    {
      return db.query('INSERT INTO logs (eintrag, date, user_id, art, cat_id) ' +
                      'values(?, ?, ?, ?, ?)', [postdata.eintrag, postdata.date, postdata.user_id, postdata.art, postdata.cat_id], callback)
    },
}

module.exports = log;
