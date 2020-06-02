var db = require('../db');

var select = {
    getSelectUserID: function(postdata, callback)
    {
        return db.query('SELECT s.skill, sst.status_id, sst.skill_id, sta.status, u.nachname, sst.vermittler_id, uu.nachname AS vermittler ' +
                        'FROM skillstatus sst ' +
                        'INNER JOIN users u ON (u.user_id = sst.user_id) ' +
                        'INNER JOIN users uu ON (uu.user_id = sst.vermittler_id) ' +
                        'INNER JOIN status sta ON (sta.status_id = sst.status_id) ' +
                        'INNER JOIN skills s ON (s.skill_id = sst.skill_id) ' +
                        'WHERE u.user_id IN (?)', [postdata.user_id], callback);
    }
}

module.exports = select;
