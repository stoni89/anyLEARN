var db = require('../db');

var sst = {
  getSkillTableUser: function(id, callback)
  {
    return db.query('SELECT sst.skillstatus_id, sst.skill_id, sst.status_id, sst.user_id, s.skill, s.skill, s.lernziel, s.inhalt, s.zeitaufwand, ' +
                    's.zeitpunkt, s.vermittler_id, s.bereich_id, s.nachweis, b.bereich, group_concat(k.kategorie separator ", ") kategorie, sta.status, ' +
                    'group_concat(sk.kategorie_id separator ", ") kategorie_id, u.nachname AS nachname, uu.nachname AS vermittler ' +
                    'FROM skillstatus sst ' +
                    'INNER JOIN skills s ON (s.skill_id = sst.skill_id) ' +
                    'INNER JOIN users u ON (u.user_id = sst.user_id) ' +
                    'INNER JOIN users uu ON (uu.user_id = s.vermittler_id) ' +
                    'INNER JOIN skillkategorie sk ON (sk.skill_id = sst.skill_id) ' +
                    'INNER JOIN bereich b ON (b.bereich_ID = s.bereich_id) ' +
                    'INNER JOIN status sta ON (sta.status_id = sst.status_id) ' +
                    'INNER JOIN kategorie k ON (k.kategorie_id = sk.kategorie_id) ' +
                    'WHERE u.kategorie_id = sk.kategorie_id && u.user_id = ' + id + ' GROUP BY sst.skill_id ORDER BY s.zeitpunkt, s.skill', callback);
  },
  newSkillStatus: function(postdata, callback)
  {
    return db.query('INSERT INTO skillstatus (skill_id, user_id, status_id) ' +
                    'values(?,?,?)', [postdata.skill_id, postdata.user_id, postdata.status_id], callback)
  },
  updateSkillStatus: function(postdata, callback)
  {
    return db.query('UPDATE skillstatus SET status_id=? ' +
                    'WHERE skillstatus_id=?', [postdata.status_id, postdata.skillstatus_id], callback)
  }
}

module.exports = sst;
