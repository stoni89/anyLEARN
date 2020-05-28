var db = require('../db');

var kategorie = {
    getAllKategorie: function(callback)
    {
        return db.query('SELECT * from kategorie ORDER BY kategorie', callback);
    }
}

module.exports = kategorie;
