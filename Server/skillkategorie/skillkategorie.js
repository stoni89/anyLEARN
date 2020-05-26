var db = require('../db');

var sk = {
  getSpezificSkillKategorie: function(id, callback)
  {
      return db.query('SELECT group_concat(kategorie_id separator ", ") kategorie_id FROM skillkategorie WHERE skill_id = ' + id, callback);
  }
}

module.exports = sk;
