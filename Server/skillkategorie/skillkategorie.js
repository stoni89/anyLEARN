var db = require('../db');

var sk = {
  getSpezificSkillKategorie: function(id, callback)
  {
      return db.query('SELECT sk.kategorie_id, k.kategorie FROM skillkategorie sk ' +
                      'INNER JOIN kategorie k ON (k.kategorie_id = sk.kategorie_id) ' +
                      'WHERE sk.skill_id = ' + id, callback);
  }
}

module.exports = sk;
