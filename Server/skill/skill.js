var db = require('../db');

var skill = {

    getAllSkills: function(callback)
    {
        return db.query('SELECT s.skill_id, s.skill, s.lernziel, s.inhalt, s.zeitaufwand, s.zeitpunkt, s.vermittler_id, s.bereich_id, ' +
                        's.nachweis, u.nachname, b.bereich , group_concat(k.kategorie separator ", ") kategorie, ' +
                        'group_concat(sk.kategorie_id separator ", ") kategorie_id ' +
                        'FROM skillkategorie sk ' +
                        'INNER JOIN skills s ON (s.skill_id = sk.skill_id) ' +
                        'INNER JOIN kategorie k ON (k.kategorie_id = sk.kategorie_id) ' +
                        'INNER JOIN users u ON (u.user_id = s.vermittler_id) ' +
                        'INNER JOIN bereich b ON (b.bereich_ID = s.bereich_id) ' +
                        'GROUP BY s.skill_ID ORDER BY s.zeitpunkt, s.skill', callback);
    },
    getSpezificSkill: function(id, callback)
    {
      return db.query('SELECT s.skill_id, s.skill, s.lernziel, s.inhalt, s.zeitaufwand, s.zeitpunkt, s.vermittler_id, s.bereich_id, ' +
                      's.nachweis, u.nachname, b.bereich , group_concat(k.kategorie separator ", ") kategorie, ' +
                      'group_concat(sk.kategorie_id separator ", ") kategorie_id ' +
                      'FROM skillkategorie sk ' +
                      'INNER JOIN skills s ON (s.skill_id = sk.skill_id) ' +
                      'INNER JOIN kategorie k ON (k.kategorie_id = sk.kategorie_id) ' +
                      'INNER JOIN users u ON (u.user_id = s.vermittler_id) ' +
                      'INNER JOIN bereich b ON (b.bereich_ID = s.bereich_id) ' +
                      'WHERE sk.skill_id = ' + id, callback);
    },
    newSkill: function(postdata, callback)
    {
      return db.query('INSERT INTO skills (skill, lernziel, inhalt, zeitaufwand, zeitpunkt, vermittler_id, bereich_id, nachweis) ' +
                      'values(?, ?, ?, ?, ?, ?, ?, ?)', [postdata.skill, postdata.lernziel, postdata.inhalt, postdata.zeitaufwand, postdata.zeitpunkt,
                                                         postdata.vermittler_id, postdata.bereich_id, postdata.nachweis], callback)
    },
    updateSkill: function(postdata, callback)
    {
      return db.query('UPDATE skills SET skill=?, lernziel=?, inhalt=?, zeitaufwand=?, zeitpunkt=?, vermittler_id=?, bereich_id=?, nachweis=? ' +
                      'WHERE skill_id=?', [postdata.skill, postdata.lernziel, postdata.inhalt, postdata.zeitaufwand, postdata.zeitpunkt,
                                                         postdata.vermittler_id, postdata.bereich_id, postdata.nachweis, postdata.skill_id], callback)
    }
}

module.exports = skill;
