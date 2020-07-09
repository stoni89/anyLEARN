var db = require('../db');

var sst = {
  getSkillTableUser: function(id, callback)
  {
    return db.query('SELECT sst.skillstatus_id, sst.skill_id, sst.status_id, sst.ueberschritten, sst.user_id, s.skill, s.skill, s.zeitpunkt_id, s.lernziel, s.inhalt, s.zeitaufwand, sst.vermittler_id AS verID, ' +
                    'FORMAT(z.zeitpunkt,1) AS zeitpunkt, s.vermittler_id, s.bereich_id, s.nachweis, b.bereich, group_concat(k.kategorie separator ", ") kategorie, sta.status, ' +
                    'group_concat(sk.kategorie_id separator ", ") kategorie_id, u.nachname AS nachname, uu.nachname AS vermittler, COUNT(sl.skill_id) AS linkAnzahl, ' +
                    's.endzeitpunkt_id, FORMAT(ez.endzeitpunkt,1) AS endzeitpunkt ' +
                    'FROM skillstatus sst ' +
                    'INNER JOIN skills s ON (s.skill_id = sst.skill_id) ' +
                    'INNER JOIN users u ON (u.user_id = sst.user_id) ' +
                    'INNER JOIN zeitpunkt z ON (z.zeitpunkt_id = s.zeitpunkt_id) ' +
                    'INNER JOIN endzeitpunkt ez ON (ez.endzeitpunkt_id = s.endzeitpunkt_id) ' +
                    'INNER JOIN users uu ON (uu.user_id = sst.vermittler_id) ' +
                    'INNER JOIN skillkategorie sk ON (sk.skill_id = sst.skill_id) ' +
                    'INNER JOIN bereich b ON (b.bereich_ID = s.bereich_id) ' +
                    'INNER JOIN status sta ON (sta.status_id = sst.status_id) ' +
                    'INNER JOIN kategorie k ON (k.kategorie_id = sk.kategorie_id) ' +
                    'LEFT JOIN skilllinks sl ON (sl.skill_id = sst.skill_id) ' +
                    'WHERE (u.kategorie_id = sk.kategorie_id OR sst.status_id = 4) && u.user_id = ' + id + ' GROUP BY sst.skill_id ORDER BY z.zeitpunkt, s.skill', callback);
  },
  getSkillStatusCountGesamt: function(id, callback)
  {
    return db.query('SELECT COUNT(*) AS gesamt, u.kategorie_id FROM skillstatus sst ' +
                    'INNER JOIN users u ON (u.user_id = sst.user_id) ' +
                    'INNER JOIN skillkategorie sk ON (sk.skill_id = sst.skill_id) ' +
                    'WHERE u.kategorie_id = sk.kategorie_id && sst.user_id = ' + id, callback)
  },
  getSkillStatusCountOffen: function(id, callback)
  {
    return db.query('SELECT COUNT(*) AS offen, u.kategorie_id FROM skillstatus sst ' +
                    'INNER JOIN users u ON (u.user_id = sst.user_id) ' +
                    'INNER JOIN skillkategorie sk ON (sk.skill_id = sst.skill_id) ' +
                    'WHERE u.kategorie_id = sk.kategorie_id && sst.user_id = ' + id + ' && sst.status_id = 1', callback)
  },
  getSkillStatusCountBearbeitung: function(id, callback)
  {
    return db.query('SELECT COUNT(*) AS bearbeitung, u.kategorie_id FROM skillstatus sst ' +
                    'INNER JOIN users u ON (u.user_id = sst.user_id) ' +
                    'INNER JOIN skillkategorie sk ON (sk.skill_id = sst.skill_id) ' +
                    'WHERE u.kategorie_id = sk.kategorie_id && sst.user_id = ' + id + ' && (sst.status_id = 2 || sst.status_id = 3)', callback)
  },
  getSkillStatusCountErledigt: function(id, callback)
  {
    return db.query('SELECT COUNT(*) AS erledigt, u.kategorie_id FROM skillstatus sst ' +
                    'INNER JOIN users u ON (u.user_id = sst.user_id) ' +
                    'INNER JOIN skillkategorie sk ON (sk.skill_id = sst.skill_id) ' +
                    'WHERE u.kategorie_id = sk.kategorie_id AND sst.user_id = ' + id + ' && sst.status_id = 4', callback)
  },
  getSkillStatusCountErledigtAll: function(id, callback)
  {
    return db.query('SELECT COUNT(*) AS erledigt FROM skillstatus sst ' +
                    'INNER JOIN users u ON (u.user_id = sst.user_id) ' +
                    'WHERE sst.user_id = ' + id + ' && sst.status_id = 4 ' +
                    'UNION ALL ' +
                    'SELECT COUNT(*) AS erledigt FROM skillstatus sst ' +
                    'INNER JOIN users u ON (u.user_id = sst.user_id) ' +
                    'INNER JOIN skillkategorie sk ON (sk.skill_id = sst.skill_id) ' +
                    'WHERE u.kategorie_id = sk.kategorie_id AND sst.user_id = ' + id + ' && sst.status_id = 4', callback)
  },
  getSkillStatusUsersOffen: function(id, callback)
  {
    return db.query('SELECT u.nachname ' +
                    'FROM skillstatus sst ' +
                    'INNER JOIN users u ON (u.user_id = sst.user_id) ' +
                    'INNER JOIN skillkategorie sk ON (sk.skill_Id = sst.skill_Id) ' +
                    'WHERE u.kategorie_id = sk.kategorie_id AND sst.status_id = 1 AND sst.skill_id = ' + id + ' AND u.rollen_id = 1', callback)
  },
  getSkillStatusUsersBearbeitung: function(id, callback)
  {
    return db.query('SELECT u.nachname ' +
                    'FROM skillstatus sst ' +
                    'INNER JOIN users u ON (u.user_id = sst.user_id) ' +
                    'INNER JOIN skillkategorie sk ON (sk.skill_Id = sst.skill_Id) ' +
                    'WHERE u.kategorie_id = sk.kategorie_id AND sst.status_id = 2 AND sst.skill_id = ' + id + ' AND u.rollen_id = 1', callback)
  },
  getSkillStatusUsersBearbeitungGen: function(id, callback)
  {
    return db.query('SELECT u.nachname ' +
                    'FROM skillstatus sst ' +
                    'INNER JOIN users u ON (u.user_id = sst.user_id) ' +
                    'INNER JOIN skillkategorie sk ON (sk.skill_Id = sst.skill_Id) ' +
                    'WHERE u.kategorie_id = sk.kategorie_id AND sst.status_id = 3 AND sst.skill_id = ' + id + ' AND u.rollen_id = 1', callback)
  },
  getSkillStatusUsersErledigt: function(id, callback)
  {
    return db.query('SELECT u.nachname ' +
                    'FROM skillstatus sst ' +
                    'INNER JOIN users u ON (u.user_id = sst.user_id) ' +
                    'INNER JOIN skillkategorie sk ON (sk.skill_Id = sst.skill_Id) ' +
                    'WHERE u.kategorie_id = sk.kategorie_id AND sst.status_id = 4 AND sst.skill_id = ' + id + ' AND u.rollen_id = 1', callback)
  },
  newSkillStatus: function(postdata, callback)
  {
    return db.query('INSERT INTO skillstatus (skill_id, user_id, status_id, vermittler_id, ueberschritten) ' +
                    'values(?,?,?,?,?)', [postdata.skill_id, postdata.user_id, postdata.status_id, postdata.vermittler_id, postdata.ueberschritten], callback)
  },
  updateSkillStatus: function(postdata, callback)
  {
    return db.query('UPDATE skillstatus SET status_id=? ' +
                    'WHERE skillstatus_id=?', [postdata.status_id, postdata.skillstatus_id], callback)
  },
  removeSkillStatus: function(id, callback)
  {
    return db.query('DELETE FROM skillstatus WHERE skill_id = ' + id, callback)
  },
  getSkillStatusAllUsersOffen: function(id, callback)
  {
    return db.query('SELECT u.nachname ' +
                    'FROM skillstatus sst ' +
                    'INNER JOIN users u ON (u.user_id = sst.user_id) ' +
                    'INNER JOIN skillkategorie sk ON (sk.skill_Id = sst.skill_Id) ' +
                    'WHERE sst.status_id = 1 AND ' +
                    'u.kategorie_id = sk.kategorie_id AND ' +
                    'sst.skill_id = ' + id, callback)
  },
  getSkillStatusAllUsersBearbeitung: function(id, callback)
  {
    return db.query('SELECT u.nachname ' +
                    'FROM skillstatus sst ' +
                    'INNER JOIN users u ON (u.user_id = sst.user_id) ' +
                    'INNER JOIN skillkategorie sk ON (sk.skill_Id = sst.skill_Id) ' +
                    'WHERE sst.status_id = 2 AND ' +
                    'u.kategorie_id = sk.kategorie_id AND ' +
                    'sst.skill_id = ' + id, callback)
  },
  getSkillStatusAllUsersBearbeitungGen: function(id, callback)
  {
    return db.query('SELECT u.nachname ' +
                    'FROM skillstatus sst ' +
                    'INNER JOIN users u ON (u.user_id = sst.user_id) ' +
                    'INNER JOIN skillkategorie sk ON (sk.skill_Id = sst.skill_Id) ' +
                    'WHERE sst.status_id = 3 AND ' +
                    'u.kategorie_id = sk.kategorie_id AND ' +
                    'sst.skill_id = ' + id, callback)
  },
  getSkillStatusAllUsersErledigt: function(id, callback)
  {
    return db.query('SELECT u.nachname ' +
                    'FROM skillstatus sst ' +
                    'INNER JOIN users u ON (u.user_id = sst.user_id) ' +
                    'WHERE sst.status_id = 4 AND ' +
                    'sst.skill_id = ' + id, callback)
  },
}

module.exports = sst;
