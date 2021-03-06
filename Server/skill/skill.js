var db = require('../db');

var skill = {

    getAllSkills: function(callback)
    {
        return db.query('SELECT s.skill_id, s.skill, s.lernziel, s.inhalt, s.zeitaufwand, s.zeitpunkt_id, FORMAT(z.zeitpunkt,1) AS zeitpunkt, s.vermittler_id, s.bereich_id, ' +
                        's.nachweis, u.nachname, b.bereich , group_concat(k.kategorie separator ", ") kategorie, ' +
                        'group_concat(sk.kategorie_id separator ", ") kategorie_id, s.endzeitpunkt_id, FORMAT(ez.endzeitpunkt,1) AS endzeitpunkt, (SELECT Count(*) FROM skilllinks ssi WHERE ssi.skill_id = s.skill_id) AS linkAnzahl ' +
                        'FROM skillkategorie sk ' +
                        'INNER JOIN skills s ON (s.skill_id = sk.skill_id) ' +
                        'INNER JOIN zeitpunkt z ON (z.zeitpunkt_id = s.zeitpunkt_id) ' +
                        'INNER JOIN kategorie k ON (k.kategorie_id = sk.kategorie_id) ' +
                        'INNER JOIN users u ON (u.user_id = s.vermittler_id) ' +
                        'INNER JOIN bereich b ON (b.bereich_ID = s.bereich_id) ' +
                        'INNER JOIN endzeitpunkt ez ON (ez.endzeitpunkt_id = s.endzeitpunkt_id) ' +
                        'GROUP BY s.skill_ID ORDER BY ez.endzeitpunkt, s.skill', callback);
    },
    getSpezificSkill: function(id, callback)
    {
      return db.query('SELECT s.skill_id, s.skill, s.lernziel, s.inhalt, s.zeitaufwand, s.zeitpunkt_id, FORMAT(z.zeitpunkt,1) AS zeitpunkt, s.vermittler_id, s.bereich_id, ' +
                      's.nachweis, u.nachname, b.bereich , group_concat(k.kategorie separator ", ") kategorie, ' +
                      'group_concat(sk.kategorie_id separator ", ") kategorie_id, s.endzeitpunkt_id, FORMAT(ez.endzeitpunkt,1) AS endzeitpunkt ' +
                      'FROM skillkategorie sk ' +
                      'INNER JOIN skills s ON (s.skill_id = sk.skill_id) ' +
                      'INNER JOIN zeitpunkt z ON (z.zeitpunkt_id = s.zeitpunkt_id) ' +
                      'INNER JOIN kategorie k ON (k.kategorie_id = sk.kategorie_id) ' +
                      'INNER JOIN users u ON (u.user_id = s.vermittler_id) ' +
                      'INNER JOIN bereich b ON (b.bereich_ID = s.bereich_id) ' +
                      'INNER JOIN endzeitpunkt ez ON (ez.endzeitpunkt_id = s.endzeitpunkt_id) ' +
                      'WHERE sk.skill_id = ' + id, callback);
    },
    getMaxSkillID: function(callback)
    {
      return db.query('SELECT max(skill_id) AS skill_id FROM skills', callback);
    },
    newSkill: function(postdata, callback)
    {
      return db.query('INSERT INTO skills (skill, lernziel, inhalt, zeitaufwand, zeitpunkt_id, endzeitpunkt_id, vermittler_id, bereich_id, nachweis) ' +
                      'values(?, ?, ?, ?, ?, ?, ?, ?, ?)', [postdata.skill, postdata.lernziel, postdata.inhalt, postdata.zeitaufwand, postdata.zeitpunkt_id,
                                                  postdata.endzeitpunkt_id, postdata.vermittler_id, postdata.bereich_id, postdata.nachweis], callback)
    },
    updateSkill: function(postdata, callback)
    {
      return db.query('UPDATE skills SET skill=?, lernziel=?, inhalt=?, zeitaufwand=?, zeitpunkt_id=?, endzeitpunkt_id=?, vermittler_id=?, bereich_id=?, nachweis=?' +
                      'WHERE skill_id=?', [postdata.skill, postdata.lernziel, postdata.inhalt, postdata.zeitaufwand, postdata.zeitpunkt_id,
                                    postdata.endzeitpunkt_id, postdata.vermittler_id, postdata.bereich_id, postdata.nachweis, postdata.skill_id], callback)
    },
    removeSkill: function(id, callback)
    {
      return db.query('DELETE FROM skills WHERE skill_id = ' + id, callback)
    },
}

module.exports = skill;
