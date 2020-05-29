var db = require('../db');

var mit = {
    getMit: function(id, callback)
    {
        return db.query('SELECT p.user_id, p.skill_id, p.kategorie, p.fromuser_id, p.text, p.date, p.post_id, s.skill, ' +
                        'u.nachname AS von, uu.nachname AS nachname ' +
                        'FROM post p ' +
                        'INNER JOIN skills s ON (s.skill_id = p.skill_id) ' +
                        'INNER JOIN users u ON (u.user_id = p.fromuser_id) ' +
                        'INNER JOIN users uu ON (uu.user_id = p.user_id) ' +
                        'WHERE p.user_id = ' + id, callback);
    },
    getMitCount: function(id, callback)
    {
        return db.query('SELECT COUNT(*) AS anzahl FROM post WHERE user_id = ' + id, callback);
    },
}

module.exports = mit;
