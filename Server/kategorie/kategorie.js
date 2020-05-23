var db = require('../db');

var kategorie = {
    getAllKategorie: function(callback)
    {
        return db.query('SELECT * from kategorie', callback);
    }
}

module.exports = kategorie;
