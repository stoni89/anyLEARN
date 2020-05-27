var db = require('../db');

var sk = {
  getSpezificSkillKategorie: function(id, callback)
  {
      return db.query('SELECT group_concat(kategorie_id separator ", ") kategorie_id FROM skillkategorie WHERE skill_id = ' + id, callback);
  },
  newSkillKategorie: function(postdata, callback)
  {
    return db.query('INSERT INTO skillkategorie (skill_id, kategorie_id) ' +
                    'values(?,?)', [postdata.skill_id, postdata.kategorie_id], callback)
  },
  removeSkillKategorie: function(id, callback)
  {
    return db.query('DELETE FROM skillkategorie WHERE skill_id = ' + id, callback)
  },
}

module.exports = sk;
