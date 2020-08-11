var db = require('../db');

var mit = {
    getMit: function(id, callback)
    {
        return db.query('SELECT p.user_id, p.skill_id, p.skillstatus_id, p.bemerkung, p.kategorie, p.fromuser_id, p.text, p.date, p.post_id, s.skill, ' +
                        'u.nachname AS von, uu.nachname AS nachname ' +
                        'FROM post p ' +
                        'INNER JOIN skills s ON (s.skill_id = p.skill_id) ' +
                        'INNER JOIN users u ON (u.user_id = p.fromuser_id) ' +
                        'INNER JOIN users uu ON (uu.user_id = p.user_id) ' +
                        'WHERE p.user_id = ' + id + ' ORDER by p.date', callback);
    },
    getMailData: function(id, callback)
    {
        return db.query('SELECT u.mail, u.name, u.vorname, u.nachname, COUNT(p.post_id) AS anzahlPost ' +
                        'FROM users u ' +
                        'INNER JOIN post p ON p.user_id = u.user_id ' +
                        'WHERE u.user_id = ' + id, callback)
    },
    getMitCount: function(id, callback)
    {
        return db.query('SELECT COUNT(*) AS anzahl FROM post WHERE user_id = ' + id, callback);
    },
    removeMit: function(id, callback)
    {
        return db.query('DELETE FROM post WHERE post_id = ' + id, callback);
    },
    newMit: function(postdata, callback)
    {
      return db.query('INSERT INTO post (date, text, user_id, fromuser_id, skill_id, kategorie, bemerkung, skillstatus_id) ' +
                      'values(?, ?, ?, ?, ?, ?, ?, ?)', [postdata.date, postdata.text, postdata.user_id, postdata.fromuser_id, postdata.skill_id, postdata.kategorie, postdata.bemerkung, postdata.skillstatus_id], callback)
    },
}

module.exports = mit;
