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
                        'GROUP BY s.skill_ID', callback);
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
                                                         postdata.vermittler_id, postdata.bereich_id, postdata.nachweis], callback)
    }
}

module.exports = skill;




'SELECT CONCAT("[", GROUP_CONCAT(json_records.json), "]")  AS json ' +
'FROM (SELECT CONCAT( "{" ' +
'	 ,     ""skill_id"" , ":" , " , skills.skill_id , " "," "," ' +
'  ,     ""skill"" , ":" , " , skills.skill , " , "," ' +
'	 ,     ""lernziel"" , ":" , " , skills.lernziel , " , "," ' +
'  ,     ""inhalt"" , ":" , " , skills.inhalt , " , "," ' +
'  ,     ""zeitaufwand"" , ":" , " , skills.zeitaufwand , " , "," ' +
'  ,     ""zeitpunkt"" , ":" , " , skills.zeitpunkt , " , "," ' +
'	 ,     ""vermittler_id"" , ":" , " , skills.vermittler_id , " , "," ' +
'  ,     ""bereich_id"" , ":" , " , skills.bereich_id , " , "," ' +
'  ,     ""nachweis"" , ":" , " , skills.nachweis , " , "," ' +
'  ,     ""nachname"" , ":" , " , users.nachname , " , "," ' +
'	 ,     ""bereich"" , ":" , " , bereich.bereich , " , "," ' +
'  ,     ""kategorie_id"" , ":" , "[", GROUP_CONCAT(", skillkategorie.kategorie_id, "), "]", "}") AS json ' +
'  FROM skills ' +
'  INNER JOIN bereich ON bereich.bereich_id = skills.bereich_id ' +
'  INNER JOIN users ON users.user_id = skills.vermittler_id ' +
'  INNER JOIN skillkategorie ON skillkategorie.skill_id = skills.skill_id ' +
'  WHERE skills.skill_id IN(SELECT skill_id FROM skillkategorie) ' +
' GROUP BY skills.skill_id) AS json_records'
